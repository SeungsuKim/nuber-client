import React from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_PROFILE } from "src/sharedQueries";
import { userProfile } from "src/types/api";

import HomePresenter from "./HomePresenter";

class ProfileQuery extends Query<userProfile> {}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;

  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.watchPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            isMenuOpen={isMenuOpen}
            toogleMenu={this.toogleMenu}
            loading={loading}
            mapRef={this.mapRef}
          />
        )}
      </ProfileQuery>
    );
  }

  public toogleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      maxZoom: 17,
      minZoom: 10,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(
      this.handleGeoWatchSucess,
      this.handleGeoWatchError,
      watchOptions
    );
  };

  public handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    this.setState({
      lat,
      lng
    });
    this.loadMap(lat, lng);
  };

  public handleGeoError: PositionErrorCallback = () => {
    return;
  };

  public handleGeoWatchSucess = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
  };

  public handleGeoWatchError = () => {
    toast.error("Error while watching you");
  };
}

export default HomeContainer;
