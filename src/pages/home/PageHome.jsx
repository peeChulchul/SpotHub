import React from 'react';
import Map from './Map';
import styled from 'styled-components';

export default function PageHome() {
  return (
    <Container>
      <Map />
    </Container>
  );
}

const Container = styled.div`
  /* position: relative; */
`;
