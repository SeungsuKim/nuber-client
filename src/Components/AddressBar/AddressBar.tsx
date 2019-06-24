import React from "react";
import styled from "src/Styles/styled-components";

const Container = styled.input`
  position: absolute;
  background-color: white;
  z-index: 2;
  border-radius: 5px;
  -webkit-appearance: none;
  width: 90%;
  border: 0;
  font-size: 16px;
  padding: 15px 10px;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  margin: auto;
  top: 10px;
  left: 0;
  right: 0;
  height: auto;
`;

interface IProps {
  value: string;
  name: string;
  onBlur?: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressBar: React.SFC<IProps> = ({ value, name, onBlur, onChange }) => (
  <Container
    value={value}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    placeholder={"Type address"}
  />
);

export default AddressBar;
