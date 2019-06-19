import React from "react";
import BackArrow from "src/Components/BackArrow";
import styled from "src/Styles/styled-components";

const Container = styled.header`
  background-color: black;
  color: white;
  display: flex;
  height: 50px;
  font-size: 20px;
  font-weight: 300;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 50px;
  padding: 0 10px;
  & svg {
    fill: white;
  }
`;

const Title = styled.h2`
  margin-left: 10px;
`;

interface IProps {
  title: string;
  backTo?: string;
}

const Header: React.SFC<IProps> = ({ title, backTo }) => (
  <Container>
    {backTo && <BackArrow backTo={backTo} />}
    <Title>{title}</Title>
  </Container>
);

export default Header;
