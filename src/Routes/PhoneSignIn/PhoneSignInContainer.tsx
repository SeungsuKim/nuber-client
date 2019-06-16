import React from "react";
import { RouteComponentProps } from "react-router-dom";

import PhoneSignInPresenter from "./PhoneSignInPresenter";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneSignInContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state = {
    countryCode: "+82",
    phoneNumber: ""
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
      />
    );
  }
}

export default PhoneSignInContainer;
