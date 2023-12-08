import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100%;
`;

export default function ModifyUser() {
  const { currentUser } = useSelector((modules) => modules.currentUserModules);
  const [newNickName, setNewNickName] = useState();
  const [privewImg, setPrivewImg] = useState();

  useEffect(() => {
    setNewNickName(currentUser.nickname);
  }, [currentUser]);

  function onChangeNickname(e) {
    setNewNickName(e.target.value);
  }

  return (
    <Container>
      <h1>프로필 수정</h1>
      <PreviewImg
        src={
          currentUser.avatar ||
          'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
        }
        alt="user img"
      />
      <form>
        <input onChange={onChangeNickname} value={newNickName}></input>
        <button>완료</button>
      </form>
    </Container>
  );
}
