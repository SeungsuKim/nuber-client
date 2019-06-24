import React from "react";
import { MutationFn } from "react-apollo";
import { Link } from "react-router-dom";
import styled from "src/Styles/styled-components";
import { toogleDriving, userProfile } from "src/types/api";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

interface IToogleProps {
  isDriving: boolean;
}

const ToogleDriving = styled.button<IToogleProps>`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
  toogleDrivingFn: MutationFn<toogleDriving>;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = { user: null } } = {
    GetMyProfile: { user: null }
  },
  loading,
  toogleDrivingFn
}) => {
  return (
    <Container>
      {!loading && user && user.fullName && (
        <>
          <Header>
            <Grid>
              <Link to={"/edit-account"}>
                <Image
                  src={
                    user.profilePhoto ||
                    "https://ww.namu.la/s/34f4f86a25e4f020f4f2df539231f36df7e209a1c08137102b7bf3eb9a884b270273333c6a3e576d2a0ddf7ac4e0f782de5319f1eef41d42f4a0b170156150f0ad3d3c1f1006cc38bb3fc042fa84f74d8a404494f581ff6d5f8724fca50349da"
                  }
                />
              </Link>
              <Text>
                <Name>{user.fullName}</Name>
                <Rating>4.5</Rating>
              </Text>
            </Grid>
          </Header>
          <SLink to={"/trips"}>Your Trips</SLink>
          <SLink to={"/settings"}>Settings</SLink>
          <ToogleDriving
            isDriving={user.isDriving}
            onClick={() => toogleDrivingFn()}
          >
            {user.isDriving ? "Stop Driving" : "Start Driving"}
          </ToogleDriving>
        </>
      )}
    </Container>
  );
};

export default MenuPresenter;
