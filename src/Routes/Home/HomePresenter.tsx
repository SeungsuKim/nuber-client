import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import Menu from "src/Components/Menu";
import styled from "src/Styles/styled-components";
import { userProfile } from "src/types/api";

const Container = styled.div``;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  transform: rotate(90deg);
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 110px;
`;

interface IProps {
  isMenuOpen: boolean;
  toogleMenu: () => void;
  data?: userProfile;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSubmit: () => void;
  price?: number;
  requestRideFn: MutationFn;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toogleMenu,
  data: { GetMyProfile: { user = null } = { user: null } } = {
    GetMyProfile: { user: null }
  },
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  requestRideFn
}) => (
  <Container>
    <Helmet>
      <title>Home | Nuber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toogleMenu}
      styles={{
        sidebar: { width: "80%", backgroundColor: "white", zIndex: "11" }
      }}
    >
      {!loading && <MenuButton onClick={() => toogleMenu()}>|||</MenuButton>}
      {user && !user.isDriving && (
        <>
          <AddressBar
            name={"toAddress"}
            value={toAddress}
            onChange={onInputChange}
          />
          <ExtendedButton
            value={price ? "Chage Address" : "Pick Address"}
            onClick={onAddressSubmit}
          />
        </>
      )}
      {price && (
        <RequestButton
          value={`Request Ride ($${price})`}
          onClick={requestRideFn}
        />
      )}
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
