import React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
import bgImage from "src/Images/bg.png";
import styled from "src/Styles/styled-components";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bgImage});
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const Title = styled.h1``;

const Footer = styled.div``;

const Subtitle = styled.h2`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneSignIn = styled.div`
  padding: 20px;
`;

const SocialSignIn = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

interface IProps extends RouteComponentProps<any> {}

const AuthPresenter: React.SFC<IProps> = () => (
  <Container>
    <Helmet>
      <title>Auth | Nuber</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>Nuber</Title>
      </Logo>
    </Header>
    <Footer>
      <Link to={"/phone-signin"}>
        <PhoneSignIn>
          <Subtitle>Get moving with Nuber</Subtitle>
          <FakeInput>
            🇰🇷 +82 <Grey>Enter your mobile phone number</Grey>
          </FakeInput>
        </PhoneSignIn>
      </Link>
      <Link to={"/social-signin"}>
        <SocialSignIn>
          <SocialLink>Or connect with SNS</SocialLink>
        </SocialSignIn>
      </Link>
    </Footer>
  </Container>
);

export default AuthPresenter;
