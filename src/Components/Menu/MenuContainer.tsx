import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE } from "src/sharedQueries";
import { toogleDriving, userProfile } from "src/types/api";

import MenuPresenter from "./MenuPresenter";
import { TOOGLE_DRIVING } from "./MenuQueries";

class ProfileQuery extends Query<userProfile> {}

class ToogleDrivingMutation extends Mutation<toogleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ToogleDrivingMutation
        mutation={TOOGLE_DRIVING}
        refetchQueries={[{ query: USER_PROFILE }]}
      >
        {toogleDrivingFn => (
          <ProfileQuery query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                loading={loading}
                toogleDrivingFn={toogleDrivingFn}
              />
            )}
          </ProfileQuery>
        )}
      </ToogleDrivingMutation>
    );
  }
}

export default MenuContainer;
