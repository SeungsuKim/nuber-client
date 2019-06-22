import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { SIGN_USER_IN } from "src/sharedQueries.local";

import { VerifyPhone, VerifyPhoneVariables } from "../../types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<VerifyPhone, VerifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      phoneNumber: props.history.location.state.phoneNumber,
      verificationKey: ""
    };
  }
  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <Mutation mutation={SIGN_USER_IN}>
        {signUserIn => (
          <VerifyMutation
            mutation={VERIFY_PHONE}
            variables={{
              key: verificationKey,
              phoneNumber
            }}
            onCompleted={data => {
              const { CompletePhoneVerification } = data;
              if (
                CompletePhoneVerification.ok &&
                CompletePhoneVerification.token
              ) {
                toast.success("You're verified, loggin in now");
                signUserIn({
                  variables: { token: CompletePhoneVerification.token }
                });
              } else {
                toast.error(CompletePhoneVerification.error);
              }
            }}
          >
            {(mutation, { loading }) => (
              <VerifyPhonePresenter
                onSubmit={mutation}
                onChange={this.onInputChange}
                verificationKey={verificationKey}
                loading={loading}
              />
            )}
          </VerifyMutation>
        )}
      </Mutation>
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

export default VerifyPhoneContainer;
