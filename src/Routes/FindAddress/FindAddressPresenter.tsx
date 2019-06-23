import React from "react";
import Helmet from "react-helmet";
import styled from "src/Styles/styled-components";

const Map = styled.div``;

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
        <Map innerRef={mapRef} />
      </>
    );
  }
}

export default FindAddressPresenter;
