import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { GET_PLACES } from "src/sharedQueries";
import { addPlace, addPlaceVariables } from "src/types/api";

import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQueries";

class AddPlaceMutation extends Mutation<addPlace, addPlaceVariables> {}

interface IState {
  address: string;
  name: string;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlaceContainer extends React.Component<IProps, IState> {
  public state = {
    address: "",
    lat: 0,
    lng: 0,
    name: ""
  };

  public render() {
    const { history } = this.props;
    const { address, name, lat, lng } = this.state;
    return (
      <AddPlaceMutation
        mutation={ADD_PLACE}
        refetchQueries={[{ query: GET_PLACES }]}
        onCompleted={data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success("Place added");
            setTimeout(() => {
              history.push("/places");
            }, 1000);
          } else {
            toast.error(AddPlace.error);
          }
        }}
        variables={{
          address,
          isFav: false,
          lat,
          lng,
          name
        }}
      >
        {(addPlaceFn, { loading }) => (
          <AddPlacePresenter
            address={address}
            name={name}
            onInputChange={this.onInputChange}
            loading={loading}
            onSubmit={addPlaceFn}
            pickedAddress={lat !== 0 && lng !== 0}
          />
        )}
      </AddPlaceMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value } as any);
  };
}

export default AddPlaceContainer;
