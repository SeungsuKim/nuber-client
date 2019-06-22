import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "src/Styles/styled-components";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toogleMenu: () => void;
}

const HomePresenter: React.SFC<IProps> = ({ isMenuOpen, toogleMenu }) => (
  <Container>
    <Helmet>
      <title>Home | Nuber</title>
    </Helmet>
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={isMenuOpen}
      onSetOpen={toogleMenu}
      styles={{
        sidebar: { width: "80%", backgroundColor: "white", zIndex: "10" }
      }}
    >
      <button onClick={() => toogleMenu()}>Open Sidebar</button>
    </Sidebar>
  </Container>
);

export default HomePresenter;
