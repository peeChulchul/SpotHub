import { useDeleteQuery } from 'hooks/useQueryHook';
import { AUTH } from 'myFirebase';
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
  .info {
    flex: 1;
  }

  & button{
  padding: 10px 40px;
  border: none;
  border-radius: 5px;
  background-color: #ffe6c7;
  &:hover {
    cursor: pointer;
  }
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
  const { mutate: deleteQuery } = useDeleteQuery({
    document: 'comment'
  });

  console.log(comment);

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
      <div className="info">
        <div className="textWrapper">
          <p className="nickname">{comment.nickname}</p>
          <p>{createAt}</p>
        </div>
        <div>
          <p>{comment.comment}</p>
        </div>
      </div>
      {AUTH.currentUser.uid === comment.uid && (
        <div className="btns">
          <button
            onClick={() => {
              deleteQuery({ fieldId: comment.commentid });
            }}
          >
            삭제
          </button>
        </div>
      )}
    </CommentBox>
  );
}
