import { useSelectQuery } from 'hooks/useQueryHook';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

  console.log(uid);
  console.log(isLoading);
  console.log(data);

  

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
      <button>삭제</button>
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
`;
