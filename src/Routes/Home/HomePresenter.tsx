import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";
import styled from "src/Styles/styled-components";

const Container = styled.div``;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Button = styled.button`
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

interface IProps {
  isMenuOpen: boolean;
  toogleMenu: () => void;
  loading: boolean;
  mapRef: any;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toogleMenu,
  loading,
  mapRef
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
      {!loading && <Button onClick={() => toogleMenu()}>|||</Button>}
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
