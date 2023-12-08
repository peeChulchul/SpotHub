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

// 자주씀 컴포넌트로 뺴야함
const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 1px solid black;
`;

export default function Comment({ comment }) {
  const createAt = new Date().toLocaleDateString();

  return (
    <CommentBox>
      <Avatar />
      <div>
        <div className="textWrapper">
          <p className="nickname">유저 닉네임</p>
          <p>{createAt}</p>
        </div>
        <div>
          <p>{comment.comment}</p>
        </div>
      </div>
    </CommentBox>
  );
}
