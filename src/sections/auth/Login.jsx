import React, { useState } from 'react';
import styled from 'styled-components';
import { AUTH } from 'myFirebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useSetQuery } from 'hooks/useQueryHook';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalClose } from '../../redux/modules/modalModules';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(modalClose());
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with LogIn', errorCode, errorMessage);
      alert('등록되지 않은 회원이거나 유효하지 않은 이메일입니다.');
    }
  };

  const signUp = async (e) => {
    try {
      // Firebase Authentication을 사용하여 계정 생성
      e.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
      updateProfile(userCredential.user, {
        displayName: nickName
      });
      AUTH.signOut();
      setEmail('');
      setPassword('');
      setNickName('');
      toggleonHandler();
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
    Provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      const result = await signInWithPopup(AUTH, Provider);
      console.log(result.user);
      console.log(result);
      const { uid, photoURL, displayName } = result.user;
      setQuery({ fieldId: uid, data: { avatar: photoURL, uid, nickName: displayName } });
      dispatch(modalClose());
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with googleLogIn', errorCode, errorMessage);
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
        <Form onSubmit={login}>
          <>
            <Title>Login</Title>
            <Input name="email" value={email} onChange={onChange} />
            <Input name="password" value={password} onChange={onChange} />

            <Button>로그인</Button>
            <Button type="button" onClick={GoogleLogin}>
              🆕 Google 로그인
            </Button>
            <Button type="button" onClick={() => togglehandle()}>
              회원가입
            </Button>
          </>
        </Form>
      ) : (
        <Form onSubmit={signUp}>
          <>
            <Title>Signup</Title>
            <Input
              type="email"
              value={email}
              name="email"
              placeholder="아이디 (3~20글자)"
              minLength={3}
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
            <Button>회원가입</Button>
            <Button type="button" onClick={() => toggleonHandler()}>
              로그인으로 이동
            </Button>
          </>
        </Form>
      )}
    </Container>
  );
}

const Container = styled.div`
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
