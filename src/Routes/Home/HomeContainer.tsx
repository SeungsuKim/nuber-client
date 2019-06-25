import React from "react";
import { graphql, MutationFn, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { geoCode } from "src/mapHelpers";
import { USER_PROFILE } from "src/sharedQueries";
import { getDrivers, reportMovement, reportMovementVariables, userProfile } from "src/types/api";

import HomePresenter from "./HomePresenter";
import { GET_NEARBY_DRIVERS, REPORT_LOCATION } from "./HomeQueries";

class ProfileQuery extends Query<userProfile> {}

class DriversQuery extends Query<getDrivers> {}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFn;
}

interface IState {
  distance?: string;
  duration?: string;
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
  price?: number;
}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public drivers: google.maps.Marker[];

  public state = {
    distance: "",
    duration: "",
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    price: undefined,
    toAddress: "",
    toLat: 0,
    toLng: 0
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.drivers = [];
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { isMenuOpen, toAddress, price } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => {
          return (
            <DriversQuery
              query={GET_NEARBY_DRIVERS}
              pollInterval={1000}
              skip={
                (data &&
                  data.GetMyProfile &&
                  data.GetMyProfile.user &&
                  data.GetMyProfile.user.isDriving) ||
                false
              }
              onCompleted={this.handleNearbyDrivers}
            >
              {() => (
                <HomePresenter
                  isMenuOpen={isMenuOpen}
                  toogleMenu={this.toogleMenu}
                  data={data}
                  loading={loading}
                  mapRef={this.mapRef}
                  toAddress={toAddress}
                  onInputChange={this.onInputChange}
                  onAddressSubmit={this.onAddressSubmit}
                  price={price}
                />
              )}
            </DriversQuery>
          );
        }}
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
    const latLng = new google.maps.LatLng(lat, lng);
    const mapConfig: google.maps.MapOptions = {
      center: latLng,
      disableDefaultUI: true,
      maxZoom: 17,
      zoom: 13
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
    const { reportLocation } = this.props;
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    this.setState({
      lat,
      lng
    });
    this.loadMap(lat, lng);
    reportLocation({ variables: { lat, lng } });
  };

  public handleGeoError: PositionErrorCallback = () => {
    toast.error("Cannot get current position");
  };

  public handleGeoWatchSucess = (position: Position) => {
    const { reportLocation } = this.props;
    const {
      coords: { latitude, longitude }
    } = position;
    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });
    reportLocation({ variables: { lat: latitude, lng: longitude } });
  };

  public handleGeoWatchError = () => {
    toast.error("Error while watching you");
  };

  public handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      this.setState({ distance, duration }, this.setPrice);
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
    } else {
      toast.error("There is no route there.");
    }
  };

  public handleNearbyDrivers = (data: getDrivers) => {
    if (data.GetNearbyDrivers) {
      const {
        GetNearbyDrivers: { ok, drivers }
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          if (driver) {
            const existingDriver:
              | google.maps.Marker
              | undefined = this.drivers.find(
              (driverMarker: google.maps.Marker) => {
                const markerId = driverMarker.get("ID");
                return markerId === driver.id;
              }
            );
            if (existingDriver) {
              existingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng
              });
              existingDriver.setMap(this.map);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                icon: {
                  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  scale: 5
                },
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng
                }
              };
              const newMarker: google.maps.Marker = new google.maps.Marker(
                markerOptions
              );
              newMarker.setMap(this.map);
              newMarker.set("ID", driver.id);
              this.drivers.push(newMarker);
            }
          }
        }
      }
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng({ lat: toLat, lng: toLng });
    const from = new google.maps.LatLng({ lat, lng });
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.TRANSIT
    };
    directionsService.route(directionsOptions, this.handleRouteRequest);
  };

  public setPrice = () => {
    const { distance } = this.state;
    if (distance) {
      this.setState({
        price: parseFloat(distance.replace(",", "")) * 3
      });
    }
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: { lat, lng }
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      bounds.extend({ lat, lng });
      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formatedAddress,
          toLat: lat,
          toLng: lng
        },
        this.createPath
      );
    }
  };
}

export default graphql<any, reportMovement, reportMovementVariables>(
  REPORT_LOCATION,
  { name: "reportLocation" }
)(HomeContainer);
