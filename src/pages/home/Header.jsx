import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function Header() {
  return (
    <HeaderContainer>
      <RefreshBtn />
      <StatusBtn />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: fit-content;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
`;

const RefreshBtn = styled.button`
  display: flex;
  width: 75px;
  height: 50px;
  background-color: beige;
  position: absolute;
  top: 0;
  right: 0;
`;

const StatusBtn = styled.button`
  display: flex;
  width: 75px;
  height: 50px;
  background-color: beige;
  position: absolute;
  top: 0;
  right: 0;
`;

export default Header;
