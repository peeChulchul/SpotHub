import { useSelectQuery, useSetQuery } from 'hooks/useQueryHook';
import Comment from 'pages/common/comment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';
import styled from 'styled-components';

export default function DetailMarker() {
  const { markerId } = useParams();
  const { currentUser, isLoading: currentUserLoading } = useSelector((modules) => modules.currentUserModules);
  const { isLoading, data: markerData } = useSelectQuery({ document: 'markers', condition: markerId, fieldId: 'id' });
  const { isLoading: commentLoading, data: commentData } = useSelectQuery({
    document: 'comment',
    fieldId: 'markerid',
    condition: markerId
  });
  const { mutate: setQuery } = useSetQuery({ document: 'comment', condition: markerId, fieldId: shortid.generate() });
  const [comment, setComment] = useState('');

  function onSubmitComment(e) {
    e.preventDefault();
    setQuery({
      fieldId: shortid.generate(),
      data: {
        comment,
        uid: currentUser.uid,
        avatar: currentUser.avatar,
        nickname: currentUser.nickname,
        markerid: markerData[0].id
      }
    });
    setComment('');
  }

  return (
    <Container>
      {isLoading ? (
        <>로딩중</>
      ) : (
        <>
          <h1 className="title">{markerData[0].locationName}</h1>
          <InfoBox>
            <img src={markerData[0].image} width={50} alt="이미지"></img>
            <div className="infoBox">
              <p className="subTitle">작성자 코멘트</p>
              <p>{markerData[0].comment}</p>
              <p className="subTitle">위도</p>
              <p>{markerData[0].lat}</p>
              <p className="subTitle">경도</p>
              <p>{markerData[0].lng}</p>
            </div>
          </InfoBox>
          <CommentBox>
            {commentLoading ? (
              <>로딩 </>
            ) : (
              <>
                {commentData.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </>
            )}
          </CommentBox>
          <CommentForm onSubmit={onSubmitComment}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            <button>등록</button>
          </CommentForm>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .title {
    font-size: ${({ theme }) => theme.fontSize.xxxl};
  }
`;

const InfoBox = styled.div`
  display: flex;
  height: 135px;
  gap: 16px;
  img {
    border-radius: 16px;
  }
  .infoBox {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .subTitle {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  & * {
    flex: 1;
  }
`;

const CommentBox = styled.div`
  overflow-y: scroll;
  height: 200px;
`;
const CommentForm = styled.form`
  display: flex;
  textarea {
    resize: none;
    width: 100%;
    height: 80px;
  }
  button {
    width: 10%;
  }
`;
