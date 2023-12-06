import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from './Header';
import clothes from '../../assets/clothes.jpeg';
import toilet from '../../assets/toilet.png';
import marker from '../../assets/marker.png';
import trash from '../../assets/trash.png';

function Map() {
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };
  const markers = [];

  useEffect(() => {
    const my_script = new_script(
      `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`
    );
    my_script.then(() => {
      console.log('script loaded!!!');
      const kakao = window['kakao'];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(37.477200413358, 127.13438245554), //좌표설정
          level: 3
        };
        const map = new kakao.maps.Map(mapContainer, options); //맵생성

        const trashPositions = [
          new kakao.maps.LatLng(37.478400413698, 127.13538446564),
          new kakao.maps.LatLng(37.478200413698, 127.13638247574),
          new kakao.maps.LatLng(37.478000413698, 127.13738648584),
          new kakao.maps.LatLng(37.477800413698, 127.13838849594)
        ];

        const clothesPositions = [
          new kakao.maps.LatLng(37.477619964555, 127.13405884939),
          new kakao.maps.LatLng(37.477200413698, 127.13438245614)
        ];

        const toiletPositions = [
          new kakao.maps.LatLng(37.477000413698, 127.13388245624),
          new kakao.maps.LatLng(37.476800413698, 127.13458245634)
        ];

        const trashMakers = [];
        const clothesMakers = [];
        const toiletMakers = [];

        createTrashMarkers();
        createClothesMarkers();
        createToiletMarkers();

        function createMarkerImage(src, size, options) {
          let markerImage = new kakao.maps.MarkerImage(src, size, options);
          return markerImage;
        }
        function createMarker(position, image) {
          const marker = new kakao.maps.Marker({
            position: position,
            image: image
          });

          return marker;
        }

        function createTrashMarkers() {
          for (let i = 0; i < trashPositions.length; i++) {
            const imageSize = new kakao.maps.Size(30, 30);
            const imageOptions = {
              spriteOrigin: new kakao.maps.Point(0, 0)
              //   spriteSize: new kakao.maps.Size(36, 98)
            };

            // 마커이미지와 마커를 생성합니다
            const markerImage = createMarkerImage(trash, imageSize, imageOptions);
            const marker = createMarker(trashPositions[i], markerImage);

            // 생성된 마커를 쓰레기통 마커 배열에 추가합니다
            markers.push(marker);
          }
        }
        function setTrashMarkers(map) {
          for (let i = 0; i < trashMakers.length; i++) {
            trashMakers[i].setMap(map);
          }
        }

        function createClothesMarkers() {
          for (let i = 0; i < clothesPositions.length; i++) {
            const imageSize = new kakao.maps.Size(50, 50);
            const imageOptions = {
              spriteOrigin: new kakao.maps.Point(5, 5)
              //   spriteSize: new kakao.maps.Size(36, 98)
            };

            // 마커이미지와 마커를 생성합니다
            const markerImage = createMarkerImage(clothes, imageSize, imageOptions);
            const marker = createMarker(clothesPositions[i], markerImage);
            console.log(clothesPositions);

            // 생성된 마커를 쓰레기통 마커 배열에 추가합니다
            markers.push(marker);
          }
        }
        function setClothesMarkers(map) {
          for (let i = 0; i < clothesMakers.length; i++) {
            clothesMakers[i].setMap(map);
          }
        }
        function createToiletMarkers() {
          for (let i = 0; i < toiletPositions.length; i++) {
            const imageSize = new kakao.maps.Size(40, 40);
            const imageOptions = {
              spriteOrigin: new kakao.maps.Point(0, 0)
              //   spriteSize: new kakao.maps.Size('center', 'center')
            };

            // 마커이미지와 마커를 생성합니다
            const markerImage = createMarkerImage(toilet, imageSize, imageOptions);
            const marker = createMarker(toiletPositions[i], markerImage);

            // 생성된 마커를 쓰레기통 마커 배열에 추가합니다
            markers.push(marker);
          }
        }
        function setMarkers(map) {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }

        function setToiletMarkers(map) {
          for (let i = 0; i < toiletMakers.length; i++) {
            toiletMakers[i].setMap(map);
          }
        }
        console.log(markers);
        setMarkers(map);
        // setTrashMarkers(map);
        // setClothesMarkers(map);
        // setToiletMarkers(map);
      });
    });
  }, []);

  return <WrappingMap id="map" className="map" />;
}

const WrappingMap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export default Map;
