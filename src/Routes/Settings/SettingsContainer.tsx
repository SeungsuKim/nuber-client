import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import { SIGN_USER_OUT } from "src/sharedQueries.local";
import { userProfile } from "src/types/api";

import SettingsPresenter from "./SettingPresenter";

class MiniProfileQuery extends Query<userProfile> {}

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={SIGN_USER_OUT}>
        {signUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <SettingsPresenter
                signUserOut={signUserOut}
                userData={userData}
                userDataLoading={userDataLoading}
              />
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
