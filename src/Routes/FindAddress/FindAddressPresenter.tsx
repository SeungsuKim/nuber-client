import React from "react";
import Helmet from "react-helmet";
import AddressBar from "src/Components/AddressBar";
import Button from "src/Components/Button";
import styled from "src/Styles/styled-components";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Center = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  margin: auto;
  width: 30px;
  height: 30px;
  font-size: 30px;
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
  mapRef: any;
  address: string;
  onInputBlur: () => void;
  onInputChange: (evnet: React.ChangeEvent<HTMLInputElement>) => void;
  onPickPlace: () => void;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const {
      mapRef,
      address,
      onInputBlur,
      onInputChange,
      onPickPlace
    } = this.props;
    return (
      <>
        <Helmet>
          <title>Find Address | Nuber</title>
        </Helmet>
        <AddressBar
          value={address}
          name={"address"}
          onBlur={onInputBlur}
          onChange={onInputChange}
        />
        <ExtendedButton value={"Pick this place"} onClick={onPickPlace} />
        <Center>📍</Center>
        <Map ref={mapRef} />
      </>
    );
  }
}

export default FindAddressPresenter;
