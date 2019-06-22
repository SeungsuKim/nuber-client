import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
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
  public render() {
    return (
      <SignInMutation mutation={FACEBOOK_CONNECT}>
        <SocialSignInPresenter />
      </SignInMutation>
    );
  }
}

export default SocialSignInContainer;
