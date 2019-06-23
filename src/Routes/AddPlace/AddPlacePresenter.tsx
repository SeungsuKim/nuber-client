import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";
import Form from "src/Components/Form";
import Header from "src/Components/Header";
import Input from "src/Components/Input";
import styled from "src/Styles/styled-components";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onSubmit: MutationFn;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit
}) => (
  <>
    <Helmet>
      <title>Add Place | Nuber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/"} />
    <Container>
      <Form submitFn={onSubmit}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          value={name}
          name={"name"}
          onChange={onInputChange}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          value={address}
          name={"address"}
          onChange={onInputChange}
        />
        <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
        <Button
          onClick={null}
          value={loading ? "Adding the place" : "Add Place"}
        />
      </Form>
    </Container>
  </>
);

export default AddPlacePresenter;
