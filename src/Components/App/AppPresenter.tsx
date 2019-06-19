import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddPlace from "src/Routes/AddPlace";
import Auth from "src/Routes/Auth";
import EditAccount from "src/Routes/EditAccount";
import FindAddress from "src/Routes/FindAddress";
import Home from "src/Routes/Home";
import PhoneSignIn from "src/Routes/PhoneSignIn";
import Places from "src/Routes/Places";
import Ride from "src/Routes/Ride";
import Settings from "src/Routes/Settings";
import SocialSignIn from "src/Routes/SocialSignIn";
import VerifyPhone from "src/Routes/VerifyPhone";

interface IProps {
  isSignedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isSignedIn }) => (
  <BrowserRouter>
    {isSignedIn ? <SignedInRoutes /> : <SignedOutRoutes />}
  </BrowserRouter>
);

const SignedInRoutes: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/ride"} component={Ride} />
    <Route path={"/edit-account"} component={EditAccount} />
    <Route path={"/settings"} component={Settings} />
    <Route path={"/places"} component={Places} />
    <Route path={"/add-place"} component={AddPlace} />
    <Route path={"/find-address"} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const SignedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Auth} />
    <Route path={"/phone-signin"} component={PhoneSignIn} />
    <Route path={"/verify-phone"} component={VerifyPhone} />
    <Route path={"/social-signin"} component={SocialSignIn} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

AppPresenter.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
