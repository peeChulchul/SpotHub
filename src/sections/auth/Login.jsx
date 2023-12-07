import React, { useState } from 'react';
import styled from 'styled-components';
import { AUTH } from 'myFirebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useSetQuery } from 'hooks/useQueryHook';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const { mutate: setQuery } = useSetQuery({
    document: 'user'
  });

  const togglehandle = () => {
    setIsLogin(false);
  };

  const toggleonHandler = () => {
    setIsLogin(true);
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(AUTH, email, password);
      console.log('user with LogIn', userCredential.user);
      console.log(userCredential.user.email);
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with LogIn', errorCode, errorMessage);
      alert('등록되지 않은 회원이거나 유효하지 않은 이메일입니다.');
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
      const uid = userCredential.user.uid;
      console.log('user', userCredential.user);
      console.log(uid);
      alert('회원가입이 완료되었습니다.');
      setQuery({ fieldId: uid, data: { avatar: null, uid, nickName } });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.errorMessage;
      console.log('error with signUp', errorCode, errorMessage);
      alert('중복이거나 사용할 수 없는 이메일 입니다.');
    }
  };

  const GoogleLogin = async (e) => {
    e.preventDefault();

    const Provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(AUTH, Provider)
      console.log(result.user)
      console.log(result)

    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('error with googleLogIn', errorCode, errorMessage)
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'nickname') {
      setNickName(value);
    }
  };

  return (
    <Container>
      {isLogin ? (
        <Form>
          <>
              <Title>Login</Title>
              <Input name="email" value={email} onChange={onChange} />
              <Input name="password" value={password} onChange={onChange} />

              <Button onClick={login}>로그인</Button>
              <Button onClick={GoogleLogin}>🆕 Google 로그인</Button>
              <Button onClick={() => togglehandle()}>회원가입</Button>
          </>
        </Form>
      ) : (
        <Form>
          <>
              <Title>Signup</Title>
              <Input
                type="email"
                value={email}
                name="email"
                placeholder="이메일 (6~30글자)"
                minLength={6}
                maxLength={30}
                onChange={onChange}
                required
              />
              <Input
                type="password"
                value={password}
                name="password"
                placeholder="비밀번호 (6~10글자)"
                minLength={6}
                maxLength={10}
                onChange={onChange}
                required
              />
              <Input
                type="text"
                value={nickName}
                name="nickname"
                placeholder="닉네임 (6~10글자)"
                minLength={6}
                maxLength={10}
                onChange={onChange}
                required
              />
              <Button onClick={signUp}>회원가입</Button>
              <Button onClick={() => toggleonHandler()}>로그인으로 이동</Button>
              {/* <Button>로그아웃</Button> */}
              {/* <Button>회원가입</Button> */}
            {/* </detailWrapper> */}
          </>
        </Form>
      )}
    </Container>
  )
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

export default Login;
