import React from "react";
import Helmet from "react-helmet";
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

interface IProps {
  mapRef: any;
}

class FindAddressPresenter extends React.Component<IProps> {
  public render() {
    const { mapRef } = this.props;
    return (
      <>
        <Helmet>
          <title>Find Address | Nuber</title>
        </Helmet>
        <Map ref={mapRef} />
        <Center>📍</Center>
      </>
    );
  }
}

export default FindAddressPresenter;
