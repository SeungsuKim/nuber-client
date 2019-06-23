import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "src/Components/Header";
import Place from "src/Components/Place";
import styled from "src/Styles/styled-components";
import { userProfile } from "src/types/api";

const Container = styled.div`
  padding: 0 40px;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

interface IProps {
  signUserOut: MutationFn;
  userData?: userProfile;
  userDataLoading: boolean;
}

const SettingsPresenter: React.SFC<IProps> = ({
  signUserOut,
  userData: { GetMyProfile: { user = null } = { user: null } } = {
    GetMyProfile: { user: null }
  },
  userDataLoading
}) => (
  <>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.email &&
          user.fullName && (
            <>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </>
          )}
      </GridLink>
      <Place fav={false} name={"Home"} address={"12345"} />
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={signUserOut as any}>Sign Out</FakeLink>
    </Container>
  </>
);

export default SettingsPresenter;
