import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Map from './Map';
import Header from './Header';
import styled from 'styled-components';

export default function PageHome() {
  return (
    <Container>
      <Header />
      <Map />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
