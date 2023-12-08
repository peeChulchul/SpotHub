import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: fixed;
  border-radius: 100%;
  top: 5%;
  right: 3%;
  background-color: black;
  z-index: 100;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function UserMenu() {
  return (
    <Box>
      {/* <img
        src={
          src
            ? src
            : 'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
        }
        alt="프로필이미지"
      /> */}
    </Box>
  );
}
