import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "src/sharedQueries";
import { updateProfile, updateProfileVariables, userProfile } from "src/types/api";

import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

class ProfileQuery extends Query<userProfile> {}

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
      <ProfileQuery
        query={USER_PROFILE}
        onCompleted={data => this.updateFields(data)}
      >
        {() => (
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
        )}
      </ProfileQuery>
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

  public updateFields = (
    data: userProfile | { GetMyProfile: { user: null } }
  ) => {
    const {
      GetMyProfile: { user }
    } = data;
    if (user) {
      const { firstName, lastName, email } = user;
      if (email) {
        this.setState({ firstName, lastName, email });
      } else {
        this.setState({ firstName, lastName });
      }
    }
  };
}

export default EditAccountContainer;
