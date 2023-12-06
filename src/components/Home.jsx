import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Map from './Map';

function Home() {
  return (
    <Container>
      <Map>
        <Header />
      </Map>
    </Container>
  );
}

const Container = styled.div`
  size: 100%;
  display: flex;
`;

export default Home;
