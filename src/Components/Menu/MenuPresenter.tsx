import React from "react";
import { Link } from "react-router-dom";
import styled from "src/Styles/styled-components";

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

const MenuPresenter: React.SFC = () => (
  <Container>
    <Header>
      <Grid>
        <Link to={"/edit-account"}>
          <Image
            src={
              "https://pbs.twimg.com/profile_images/1111556029685207041/RPPY0j_N.png"
            }
          />
        </Link>
        <Text>
          <Name>Seungsu Kim</Name>
          <Rating>4.5</Rating>
        </Text>
      </Grid>
    </Header>
    <SLink to={"/trips"}>Your Trips</SLink>
    <SLink to={"/settings"}>Settings</SLink>
    <ToogleDriving isDriving={false}>
      {false ? "Stop Driving" : "Start Driving"}
    </ToogleDriving>
  </Container>
);

export default MenuPresenter;
