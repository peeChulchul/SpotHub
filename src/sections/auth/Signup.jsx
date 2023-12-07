import styled from 'styled-components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AUTH } from 'myFirebase';
import { useState } from 'react';
import { useSetQuery } from 'hooks/useQueryHook';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');

  const { mutate: setQuery } = useSetQuery({
    document: 'user'
  });

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(AUTH, email, password);
      const uid = userCredential.user.uid;
      console.log('user', userCredential.user);
      console.log(uid);
      setQuery({ fieldId: uid, data: { avatar: null, uid, nickName } });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.errorMessage;
      console.log('error with signUp', errorCode, errorMessage);
      alert('중복이거나 사용할 수 없는 이메일 입니다.');
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
      <Form>
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
        <Button onClick={signUp}>회원가입</Button>
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

export default Signup;
