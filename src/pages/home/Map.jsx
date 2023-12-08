import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from './Header';
import clothes from '../../assets/clothes.png';
import toilet from '../../assets/toilet.png';
import marker from '../../assets/marker.png';
import trash from '../../assets/trash.png';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useKakaoLoader, Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch } from 'react-redux';
import { modalOpen, modalClose } from '../../redux/modules/modalModules';
import Login from 'sections/auth/Login';
import { Modal } from 'pages/common/Modal';
import UserMenu from 'pages/common/UserMenu';
import { useQueryHook } from 'hooks/useQueryHook';
// import { modalopen, modalclose } from 'redux/modules/modalModules';

function Map() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [point, setPoint] = useState();
  const [pointState, setPoinState] = useState(false);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY // 발급 받은 APPKEY
    // ...options // 추가 옵션
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useQueryHooked = useQueryHook({ document: 'markers' });
  const markers = useQueryHooked.data;
  console.log(markers);

  // const navigate = useNavigate();

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
    setPoint({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng()
    });
    navigate('/marker');
    dispatch(modalOpen());
  }
  const [isLogin, setIsLogin] = useState(false);

  return (
    <WrappingMap>
      <KakaoMap // 지도를 표시할 Container
        onClick={onClickMap}
        id="map"
        center={
          // 지도의 중심좌표
          userLocation.center
        }
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%'
        }}
        level={3} // 지도의 확대 레벨
      >
        {markers?.map(({ position, img, locationName, locationid }, index) => (
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
      {}
      <MarkerBtn
        onClick={() => {
          navigate('/marker');
          dispatch(modalOpen());
        }}
      >
        <MarkerIcon src={marker} />
      </MarkerBtn>
      <LoginBtn
        onClick={() => {
          navigate('/Auth');
          dispatch(modalOpen());
        }}
      >
        로그인
      </LoginBtn>
      <Modal />
      <Outlet context={{ lat: point?.lat, lng: point?.lng }} />
    </WrappingMap>
  );
}

const MarkerIcon = styled.img`
  z-index: 100;
  width: 70px;
  height: 50px;
  position: fixed;
  bottom: 50%;
  right: 0;
  right: 3%;
  border-radius: 50px;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  z-index: 100;
  width: 70px;
  height: 50px;
  background-color: #ff6000;
  position: fixed;
  border-radius: 20px;
  top: 5%;
  right: 3%;
  cursor: pointer;
`;

const MarkerBtn = styled.button`
  z-index: 100;
  width: 70px;
  height: 50px;
  background-color: #ff6000;
  position: fixed;
  bottom: 50%;
  right: 3%;
  border-radius: 50px;
  cursor: pointer;
`;

const WrappingMap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: relative;
`;

export default Map;
