import { useSelectQuery } from 'hooks/useQueryHook';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteQuery } from 'hooks/useQueryHook';
import FormattedDate from 'pages/common/FormattedDate';
import { Timestamp } from 'firebase/firestore';

const Container = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* margin: 0 20px; */
  overflow-y: scroll;
  gap: 10px;
  align-items: center;

  @media (max-width: 550px) {
    width: 350px;
    padding: 5px;
  }
`;

export default function UserLocation() {
  const { uid } = useParams();
  const { isLoading, idError, data } = useSelectQuery({ document: 'markers', fieldId: 'uid', condition: uid });
  return (
    <Container>
      {isLoading ? (
        <>로딩중</>
      ) : data.length === 0 ? (
        <>등록한 장소가 없습니다.</> //추가: 등록한 장소 없을시.
      ) : (
        <>
          {/* 데이터 최신순 정렬 */}
          {data
            .sort((a, b) => b.timeStamp - a.timeStamp)
            .map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
        </>
      )}
    </Container>
  );
}

function LocationCard({ location }) {
  // console.log(location);
  const navigate = useNavigate();
  const deleteQuery = useDeleteQuery({ document: 'markers' });

  const hadleDeleteButton = () => {
    const userConfirm = window.confirm('마커를 삭제하시겠습니까?');
    if (!userConfirm) return;
    try {
      deleteQuery.mutate({ fieldId: location.id });
    } catch (err) {
      console.log('삭제 실패', err);
    }
  };

  return (
    <CardContainer>
      <img className="locationImg" src={location.image} alt="이미지"></img>
      <div>
        <div className="infobox">
          <TimeStamp>{FormattedDate(location.timeStamp)}</TimeStamp>
          <div>
            <h1>{location.locationName}</h1>
          </div>
        </div>
        <button
          onClick={() => {
            navigate(`/editMarker/${location.id}`);
          }}
        >
          수정
        </button>
        <button onClick={hadleDeleteButton}>삭제</button>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  gap: 16px;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  .locationImg {
    height: 100%;
    width: 35%;
  }
  .infobox {
    flex: 1;
  }

  & button {
    border: none;
    margin: 7px;
    border-radius: 5px;
    background-color: ${(props) => (props.disabled ? 'lightgray' : '#FFE6C7')};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    &:hover {
      background-color: ${(props) => (props.disabled ? 'lightgray' : '#FF6000')};
    }
  }
`;

const TimeStamp = styled.p`
  font-size: small;
  margin-bottom: 10px;
  color: gray;
`;
