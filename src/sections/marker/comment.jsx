import React from 'react';
import styled from 'styled-components';

const CommentBox = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  align-items: center;
  .textWrapper {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
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

export default function Comment({ comment }) {
  const createAt = new Date().toLocaleDateString();

  return (
    <CommentBox>
      <Avatar
        src={
          comment.avatar
            ? comment.avatar
            : 'https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp'
        }
        alt="프로필이미지"
      />
      <div>
        <div className="textWrapper">
          <p className="nickname">{comment.nickname}</p>
          <p>{createAt}</p>
        </div>
        <div>
          <p>{comment.comment}</p>
        </div>
      </div>
    </CommentBox>
  );
}
