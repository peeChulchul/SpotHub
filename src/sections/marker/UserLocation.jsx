import { useSelectQuery } from 'hooks/useQueryHook';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {useDeleteQuery} from "hooks/useQueryHook"

const Container = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
  gap: 16px;
`;

export default function UserLocation() {
  const { uid } = useParams();
  const { isLoading, idError, data } = useSelectQuery({ document: 'markers', fieldId: 'uid', condition: uid });
 

  return (
    <Container>
      {isLoading ? (
        <>로딩중 </>
      ) : (
        <>
          {data.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </>
      )}
    </Container>
  );
}

function LocationCard({ location, setIsOnMypage }) {
  console.log(location);
  const navigate = useNavigate();
  const deleteQuery = useDeleteQuery({document:"markers"})


  const hadleDeleteButton = () => {
    const userConfirm = window.confirm('마커를 삭제하시겠습니까?');
    if (!userConfirm) return;
    try {
      deleteQuery.mutate({fieldId:location.id});
    } catch (err) {
      console.log('삭제 실패', err);
    }
  };


  return (
    <CardContainer>
      <img className="locationImg" src={location.image} alt="이미지"></img>
      <div className="infobox">
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
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  gap: 16px;
  align-items: center;
  .locationImg {
    height: 100%;
    width: 45%;
  }
  .infobox {
    flex: 1;
  }

  & button{
    font-size: 20px;
    cursor: pointer;
    color: #ffffff;
    border: none;
    border-radius: 10px;

    background-color: ${(props) => (props.disabled ? 'lightgray' : '#FFA559')};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    &:hover {
      background-color: ${(props) => (props.disabled ? 'lightgray' : '#454545')};
    }
  }
`;
