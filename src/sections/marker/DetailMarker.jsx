import { useSelectQuery } from 'hooks/useQueryHook';
import Comment from 'pages/common/comment';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function DetailMarker() {
  const { markerId } = useParams();
  console.log(markerId);
  const { isError, isLoading, data } = useSelectQuery({ document: 'markers', condition: markerId, fieldId: 'id' });

  console.log(data);
  return (
    <Container>
      {isLoading ? (
        <>로딩중</>
      ) : (
        <>
          <h1 className="title">{data[0].locationName}</h1>
          <InfoBox>
            <img src={data[0].image} width={50} alt="이미지"></img>
            <div className="infoBox">
              <p className="subTitle">작성자 코멘트</p>
              <p>{data[0].comment}</p>
              <p className="subTitle">위도</p>
              <p>{data[0].lat}</p>
              <p className="subTitle">경도</p>
              <p>{data[0].lng}</p>
            </div>
          </InfoBox>
          <CommentBox>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </CommentBox>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  height: 500px;
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
  flex: 1;
`;
