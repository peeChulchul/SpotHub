import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from './Header';
import clothes from '../../assets/clothes.png';
import toilet from '../../assets/toilet.png';
import marker from '../../assets/marker.png';
import trash from '../../assets/trash.png';
import { useNavigate } from 'react-router-dom';
import { useKakaoLoader, Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';

function Map() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY // 발급 받은 APPKEY
    // ...options // 추가 옵션
  });
  const navigate = useNavigate();

  const markers = [
    {
      position: { lat: 37.478400413698, lng: 127.13538446564 },
      locationName: '슈퍼쓰레기통',
      locationid: '임시 아이디',
      img: trash
    },
    {
      position: { lat: 37.478000413698, lng: 127.13738648584 },
      locationName: '양철쓰레기통',
      locationid: '임시 아이디',
      img: trash
    },
    {
      position: { lat: 37.477800413698, lng: 127.13838849594 },
      locationName: '구리쓰레기통',
      locationid: '임시 아이디',
      img: trash
    },

    {
      position: { lat: 37.477619964555, lng: 127.13405884939 },
      locationName: '슈퍼의류수거함',
      locationid: '임시 아이디',
      img: clothes
    },
    {
      position: { lat: 37.477200413698, lng: 127.13438245614 },
      locationName: '구리양철의류수거함쓰레기통',
      locationid: '임시 아이디',
      img: clothes
    },

    {
      position: { lat: 37.477000413698, lng: 127.13388245624 },
      locationName: '슈퍼화장실',
      locationid: '임시 아이디',
      img: toilet
    },
    {
      position: { lat: 37.476800413698, lng: 127.13458245634 },
      locationName: '양철화장실',
      locationid: '임시 아이디',
      img: toilet
    }
  ];

  // const navigate = useNavigate();
  // const new_script = (src) => {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.addEventListener('load', () => {
  //       resolve();
  //     });
  //     script.addEventListener('error', (e) => {
  //       reject(e);
  //     });
  //     document.head.appendChild(script);
  //   });
  // };

  // useEffect(() => {
  //   const my_script = new_script(
  //     `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`
  //   );
  //   my_script.then(() => {
  //     console.log('script loaded!!!');
  //     const kakao = window['kakao'];
  //     kakao.maps.load(() => {
  //       const mapContainer = document.getElementById('map');
  //       const options = {
  //         center: new kakao.maps.LatLng(37.477200413358, 127.13438245554), //좌표설정
  //         level: 3
  //       };
  //       const map = new kakao.maps.Map(mapContainer, options); //맵생성

  //       function createMarkerImage(src, size, options) {
  //         let markerImage = new kakao.maps.MarkerImage(src, size, options);
  //         return markerImage;
  //       }
  //       function createMarker(position, image) {
  //         const marker = new kakao.maps.Marker({
  //           position: position,
  //           image: image
  //         });

  //         return marker;
  //       }
  //       kakao.maps.event.addListener(map, 'click', function (event) {
  //         console.log(event.latLng);
  //       });

  //       function createMarkers(array, src, size, point) {
  //         const imageSize = new kakao.maps.Size(size[0], size[1]);
  //         const imageOptions = {
  //           spriteOrigin: new kakao.maps.Point(point[0], point[1])
  //         };
  //         const markerImage = createMarkerImage(src, imageSize, imageOptions);
  //         array.forEach((markerData, index) => {
  //           const marker = createMarker(markerData.position, markerImage);
  //           kakao.maps.event.addListener(marker, 'click', function (event) {
  //             alert(`마커 클릭: ${markerData.location}`);
  //             // navigate(`/:${markerData.location}`);
  //           });
  //           markers.push(marker);
  //         });
  //       }

  //       createMarkers(trashPositions, trash, [30, 30], [0, 0]);
  //       createMarkers(clothesPositions, clothes, [40, 40], [0, 0]);
  //       createMarkers(toiletPositions, toilet, [40, 40], [0, 0]);

  //       function setMarkers(map) {
  //         for (let i = 0; i < markers.length; i++) {
  //           markers[i].setMap(map);
  //         }
  //       }

  //       setMarkers(map);
  //     });
  //   });

  //   return () => {
  //     const kakao = window['kakao'];

  //     // 새로추가된 이벤트를 컴포넌트 언마운트시 제거할수있도록 removeListener를 통해 제거해야함
  //     markers.forEach((marker) => {
  //       kakao.maps.event.removeListener(marker, 'click');
  //       marker.setMap(null);
  //     });
  //   };
  // }, []);

  const [userLocation, setUserLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
        },
        (err) => {
          setUserLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setUserLocation((prev) => ({
        ...prev,
        errMsg: '위치를 읽을 수 없습니다.',
        isLoading: false
      }));
    }
  }, []);

  function onClickMap(_t, mouseEvent) {
    console.log(mouseEvent.latLng);
  }

  return (
    <WrappingMap>
      <KakaoMap // 지도를 표시할 Container
        onClick={onClickMap}
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 37.478400413698,
          lng: 127.13538446564
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%'
        }}
        level={3} // 지도의 확대 레벨
      >
        {markers.map(({ position, img, locationName, locationid }, index) => (
          <MapMarker
            key={index}
            position={{
              lat: position.lat,
              lng: position.lng
            }}
            image={{
              src: img,
              size: { width: 30, height: 30 },
              options: {
                spriteSize: { width: 30, height: 30 },
                spriteOrigin: { x: 0, y: 0 }
              }
            }}
          ></MapMarker>
        ))}
      </KakaoMap>
    </WrappingMap>
  );
}

const WrappingMap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;

export default Map;
