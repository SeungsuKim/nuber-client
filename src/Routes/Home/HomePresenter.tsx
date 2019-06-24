import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import Menu from "src/Components/Menu";
import styled from "src/Styles/styled-components";

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

interface IProps {
  isMenuOpen: boolean;
  toogleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSubmit: () => void;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toogleMenu,
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit
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
        sidebar: { width: "80%", backgroundColor: "white", zIndex: "10" }
      }}
    >
      {!loading && <MenuButton onClick={() => toogleMenu()}>|||</MenuButton>}
      <AddressBar
        name={"toAddress"}
        value={toAddress}
        onChange={onInputChange}
      />
      <ExtendedButton value={"Pick Address"} onClick={onAddressSubmit} />
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
