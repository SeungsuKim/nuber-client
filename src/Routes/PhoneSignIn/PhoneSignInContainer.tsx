import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { StartPhoneVerification, StartPhoneVerificationVariables } from "src/types/api";

import PhoneSignInPresenter from "./PhoneSignInPresenter";
import { PHONE_SIGN_IN } from "./PhoneSignInQuereis";

class PhoneSignInMutation extends Mutation<
  StartPhoneVerification,
  StartPhoneVerificationVariables
> {}

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
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`
        }}
        onCompleted={data => {
          const { StartPhoneVerification: response } = data;
          const phone = `${countryCode}${phoneNumber}`;
          if (response.ok) {
            toast.success("SMS Sent! Redirecting you...");
            setTimeout(() => {
              history.push({
                pathname: "/verify-phone",
                state: {
                  phoneNumber: phone
                }
              });
            }, 1000);
          } else {
            toast.error(response.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();
            const phone = `${countryCode}${phoneNumber}`;
            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
            if (!isValid) {
              toast.error("Phone number is not valid");
            } else {
              mutation();
            }
          };
          return (
            <PhoneSignInPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default PhoneSignInContainer;
