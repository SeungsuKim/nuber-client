import PropTypes from "prop-types";
import React from "react";

interface IProps {
  isSignedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isSignedIn }) =>
  isSignedIn ? <span>In</span> : <span>Out</span>;

AppPresenter.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
