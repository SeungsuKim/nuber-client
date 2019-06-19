import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { VerifyPhone, VerifyPhoneVariables } from "src/types/api";

import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

class VerifyMutation extends Mutation<VerifyPhone, VerifyPhoneVariables> {}

interface IProps extends RouteComponentProps<any> {}

interface IState {
  key: string;
  phoneNumber: string;
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    if (!props.location.state.phoneNumber) {
      props.history.push("/");
    }
    this.state = {
      key: "",
      phoneNumber: props.location.state.phoneNumber
    };
  }

  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMutation mutation={VERIFY_PHONE} variables={{ key, phoneNumber }}>
        {(mutation, { loading }) => <VerifyPhonePresenter />}
      </VerifyMutation>
    );
  }
}

export default VerifyPhoneContainer;
