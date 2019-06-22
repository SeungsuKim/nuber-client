import React from "react";
import { RouteComponentProps } from "react-router-dom";

import HomePresenter from "./HomePresenter";

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
      <HomePresenter isMenuOpen={isMenuOpen} toogleMenu={this.toogleMenu} />
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
