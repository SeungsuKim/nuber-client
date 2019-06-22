import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "src/sharedQueries";
import { userProfile } from "src/types/api";

import HomePresenter from "./HomePresenter";

class ProfileQuery extends Query<userProfile> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  isMenuOpen: boolean;
}

class HomeContainer extends React.Component<IProps, IState> {
  public state = {
    isMenuOpen: false
  };

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            isMenuOpen={isMenuOpen}
            toogleMenu={this.toogleMenu}
            loading={loading}
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
}

export default HomeContainer;
