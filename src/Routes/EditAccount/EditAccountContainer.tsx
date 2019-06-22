import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { updateProfile, updateProfileVariables } from "src/types/api";

import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  loading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    loading: false
  };

  public render() {
    const { email, firstName, lastName } = this.state;
    return (
      <UpdateProfileMutation
        mutation={UPDATE_PROFILE}
        variables={{ firstName, lastName, email }}
      >
        {(updateProfileFn, { loading }) => (
          <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            onSubmit={updateProfileFn}
            onInputChange={this.onInputChange}
            loading={loading}
          />
        )}
      </UpdateProfileMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };
}

export default EditAccountContainer;
