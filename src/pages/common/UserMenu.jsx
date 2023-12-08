import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiLoginCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { modalOpen } from '../../redux/modules/modalModules';
import { AUTH } from 'myFirebase';

const Box = styled.div`
  position: fixed;
  z-index: 100;
  border-radius: 100%;
  top: 5%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: ${({ theme }) => theme.spacing.lg};
  & svg {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

const LogOutBtn = styled.button`
  font-size: 0.7rem;
  min-width: 10ch;
  cursor: pointer;
`;

const Avatar = styled.img`
  overflow: hidden;
  width: 50px;
  height: 50px;
  cursor: pointer;
  object-fit: cover;
  border-radius: 100%;
`;

const Card = styled.div`
  width: 280px;
  height: 100px;
  background-color: white;
  border-radius: 16px;
  padding: ${({ theme }) => `calc(${theme.spacing.lg} * 1)`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  display: ${({ $display }) => ($display ? '' : 'none')};
  .modifyUser {
    font-size: 0.8rem;
    margin-top: ${({ theme }) => theme.spacing.base};
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function UserMenu() {
  const { currentUser, isLoading, error } = useSelector((modules) => modules.currentUserModules);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMenuRef = useRef(null);

  function onClicklogout() {
    AUTH.signOut();
  }

  useLayoutEffect(() => {
    function closeUserMenu(e) {
      if (!userMenuRef.current?.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.body.addEventListener('click', closeUserMenu);

    return () => {
      document.body.addEventListener('click', closeUserMenu);
    };
  }, [isLoading]);

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
    <Box ref={userMenuRef}>
      <Avatar
        onClick={() => {
          setMenuOpen((prev) => !prev);
        }}
        src={
          currentUser.avatar
            ? currentUser.avatar
            : 'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
        }
        alt="프로필이미지"
      />
      <Card $display={menuOpen}>
        <Avatar
          src={
            currentUser.avatar ||
            'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
          }
        />
        <div className="info">
          <p className="nickname">{currentUser.nickname}</p>
          <p className="modifyUser">프로필수정</p>
        </div>
        <LogOutBtn onClick={onClicklogout}>로그아웃</LogOutBtn>
      </Card>
    </Box>
  );
}
