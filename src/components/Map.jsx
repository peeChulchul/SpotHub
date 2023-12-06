import React, { useEffect } from 'react';
import styled from 'styled-components';

const { kakao } = window;

function Map() {
  useEffect(() => {
    let mapContainer = document.getElementById('map');
    let mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };

    let map = new kakao.maps.Map(mapContainer, mapOption);
  }, []);

  return <MainMap id="map"></MainMap>;
}

const MainMap = styled.div`
  display: flex;
  size: 100%;
`;

export default Map;
