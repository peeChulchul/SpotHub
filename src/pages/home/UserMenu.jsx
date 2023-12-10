import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RiLoginCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { modalOpen } from '../../redux/modules/modalModules';
import { AUTH } from 'myFirebase';

const Box = styled.div`
  position: fixed;
  z-index: 5;
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

  & p {
    font-size: larger;
  }
`;

const LogOutBtn = styled.button`
  font-size: 0.7rem;
  cursor: pointer;
  line-height: 20px;
  min-width: 10ch;
  background-color: ${(props) => (props.disabled ? 'lightgray' : '#FFA559')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: #ffffff;  position: absolute;
  right: 30px;
  line-height: 28px;
  padding: 4px;
  text-align: center;
  border: none;
  color: #454545;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.disabled ? 'lightgray' : '#6b6b6b')};
  }
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
  min-width: 280px;
  height: 90px;
  background-color: white;
  border-radius: 16px;
  padding: ${({ theme }) => `calc(${theme.spacing.lg} * 1)`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => `calc(${theme.spacing.lg} * 1.5)`};
  display: ${({ $display }) => ($display ? '' : 'none')};
  .info {
    flex: 1;
    flex-direction: column;
    display: flex;
    gap: 2px;
  }
  .modifyUser {
    font-size: 0.8rem;
    margin-top: ${({ theme }) => theme.spacing.base};
    /* color: blue; */

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
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
          <p
            onClick={() => {
              dispatch(modalOpen());
              setMenuOpen(false);
              navigate(`/user/${currentUser.uid}`);
            }}
            className="modifyUser"
          >
            프로필수정
          </p>
          <p
            onClick={() => {
              dispatch(modalOpen());
              setMenuOpen(false);

              navigate(`/user/location/${currentUser.uid}`);
            }}
            className="modifyUser"
          >
            나의 장소
          </p>
        </div>
        <LogOutBtn onClick={onClicklogout}>로그아웃</LogOutBtn>
      </Card>
    </Box>
  );
}
