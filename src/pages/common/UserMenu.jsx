import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiLoginCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { modalOpen } from '../../redux/modules/modalModules';
import { AUTH } from 'myFirebase';

const Box = styled.div`
  position: fixed;
  border-radius: 100%;
  top: 5%;
  right: 3%;
  z-index: 100;
  overflow: hidden;
  width: 50px;
  height: 50px;
  cursor: pointer;
  & svg {
    width: 100%;
    height: 100%;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function UserMenu() {
  const { currentUser, isLoading, error } = useSelector((modules) => modules.currentUserModules);
  console.log(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClicklogout() {
    AUTH.signOut();
  }

  if (!currentUser) {
    return (
      <Box
        onClick={() => {
          dispatch(modalOpen());
          navigate('/auth');
        }}
      >
        <RiLoginCircleLine />
      </Box>
    );
  }

  return (
    <Box onClick={onClicklogout}>
      <img
        src={
          currentUser.avatar
            ? currentUser.avatar
            : 'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
        }
        alt="프로필이미지"
      />
    </Box>
  );
}
