import React from "react";
import { Mutation, Query } from "react-apollo";
import { GET_PLACES, USER_PROFILE } from "src/sharedQueries";
import { SIGN_USER_OUT } from "src/sharedQueries.local";
import { getPlaces, userProfile } from "src/types/api";

import SettingsPresenter from "./SettingPresenter";

class MiniProfileQuery extends Query<userProfile> {}

class PlacesQuery extends Query<getPlaces> {}

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={SIGN_USER_OUT}>
        {signUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <PlacesQuery query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    signUserOut={signUserOut}
                    userData={userData}
                    userDataLoading={userDataLoading}
                    placesData={placesData}
                    placesLoading={placesLoading}
                  />
                )}
              </PlacesQuery>
            )}
          </MiniProfileQuery>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
