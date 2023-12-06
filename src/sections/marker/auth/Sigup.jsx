import React from 'react';
import styled from 'styled-components';

function Sigup() {
  return (
    <Container>
      <Form>
        <Title>Sigup</Title>
        <Input 
        type='id'
        placeholder='아이디 (3~7글자)'
        minLength={3}
        maxLength={7} />
        <Input
        type="Password"
        placeholder='비밀번호 (5~10글자)'
        minLength={5}
        maxLength={10} />
        <Input 
        type='nickname'
        placeholder='닉네임 (2~10글자)'
        minLength={2}
        maxLength={10} />
        <Button>회원가입</Button>
        <Button>로그인</Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: #fcfafa;
  outline-color: #806542;

  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  display: block;
  margin-bottom: 16px;
  padding: 12px 0;
  outline: none;
`;

const Title = styled.h1`
  color: #5b515e;
  font-size: 36px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Button = styled.button`
  background-color: #343435;
  color: #ffffff;
  border: none;
  padding: 12px 0;
  font-size: 18px;
`;

export default Sigup;
