import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGN_USER_IN } from "src/sharedQueries.local";
import { FacebookConnect, FacebookConnectVariables } from "src/types/api";

import SocialSignInPresenter from "./SocialSignInPresenter";
import { FACEBOOK_CONNECT } from "./SocialSignInQueries";

class SignInMutation extends Mutation<
  FacebookConnect,
  FacebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  facebookId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialSignInContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    facebookId: "",
    firstName: "",
    lastName: ""
  };

  public facebookMutation: MutationFn;

  public render() {
    return (
      <Mutation mutation={SIGN_USER_IN}>
        {signUserIn => (
          <SignInMutation
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect: response } = data;
              if (response.ok) {
                signUserIn({ variables: { token: response.token } });
              } else {
                toast.error(response.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return <SocialSignInPresenter signInCallback={this.callback} />;
            }}
          </SignInMutation>
        )}
      </Mutation>
    );
  }

  public callback = facebookData => {
    const {
      name,
      first_name,
      last_name,
      email,
      id,
      accessToken
    } = facebookData;
    if (accessToken) {
      this.facebookMutation({
        variables: {
          email,
          facebookId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
      toast.success(`Welcome ${name}`);
    } else {
      toast.error("Could not sign you in");
    }
  };
}

export default SocialSignInContainer;
