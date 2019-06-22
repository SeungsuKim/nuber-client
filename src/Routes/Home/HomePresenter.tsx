import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Menu from "src/Components/Menu";
import styled from "src/Styles/styled-components";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toogleMenu: () => void;
  loading: boolean;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toogleMenu,
  loading
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
      {!loading && <button onClick={() => toogleMenu()}>Open Sidebar</button>}
    </Sidebar>
  </Container>
);

export default HomePresenter;
