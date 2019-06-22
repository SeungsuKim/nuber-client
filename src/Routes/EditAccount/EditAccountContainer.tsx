import axios from "axios";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { USER_PROFILE } from "src/sharedQueries";
import { updateProfile, updateProfileVariables, userProfile } from "src/types/api";

import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

class ProfileQuery extends Query<userProfile> {}

class UpdateProfileMutation extends Mutation<
  updateProfile,
  updateProfileVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: string;
  loading: boolean;
  uploading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    loading: false,
    profilePhoto: "",
    uploading: false
  };

  public render() {
    const { email, firstName, lastName, profilePhoto, uploading } = this.state;
    return (
      <ProfileQuery
        query={USER_PROFILE}
        onCompleted={this.updateFields}
        fetchPolicy={"cache-and-network"}
      >
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            variables={{ firstName, lastName, email, profilePhoto }}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("Profile updated!");
              } else {
                toast.error(UpdateMyProfile.error);
              }
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                email={email}
                firstName={firstName}
                lastName={lastName}
                profilePhoto={profilePhoto}
                onSubmit={updateProfileFn}
                onInputChange={this.onInputChange}
                loading={loading}
                uploading={uploading}
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value, files }
    } = event;

    if (files) {
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "485991553945425");
      formData.append("upload_preset", "nuber-preset");
      formData.append("timestamp", String(Date.now() / 1000));
      const request = await axios.post(
        "https://api.cloudinary.com/v1_1/nuber/image/upload",
        formData
      );
    }

    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = (data: {} | userProfile) => {
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          email,
          firstName,
          lastName,
          profilePhoto
        } as any);
      }
    }
  };
}

export default EditAccountContainer;
