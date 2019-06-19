import React from "react";
import Helmet from "react-helmet";
import Button from "src/Components/Button";
import Header from "src/Components/Header";
import Input from "src/Components/Input";
import styled from "src/Styles/styled-components";

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const EInput = styled(Input)`
  margin-bottom: 20px;
`;

const VerifyPhonePresenter: React.SFC = () => (
  <Container>
    <Helmet>
      <title>Verify Phone | Nuber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <EInput value={""} placeholder={"Enter Verification Code"} />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;
