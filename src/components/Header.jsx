import React, { useState } from 'react';
import styled from 'styled-components';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <WrapHeader>
      {isLogin ? (
        <>
          <HomeBtn>홈</HomeBtn>
          <LoginBtn>회원가입</LoginBtn>
        </>
      ) : (
        <>
          <HomeBtn>홈</HomeBtn>
          <LoginBtn>로그인</LoginBtn>
        </>
      )}
    </WrapHeader>
  );
}

const WrapHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HomeBtn = styled.button`
  width: 70px;
  height: 40px;
  background-color: aqua;
`;

const LoginBtn = styled.button`
  width: 70px;
  height: 40px;
  background-color: black;
  color: white;
`;

export default Header;
