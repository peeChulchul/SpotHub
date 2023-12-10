import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from './Header';
import clothes from '../../assets/clothes.png';
import marker from '../../assets/marker.png';
import toilet from '../../assets/toilet.png';
import gpsIcon from '../../assets/gpsIcon.png';
import trash from '../../assets/trash.png';
import battery from '../../assets/battery.png';
import { useNavigate, Link, Outlet, useParams } from 'react-router-dom';
import { useKakaoLoader, Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen, modalClose } from '../../redux/modules/modalModules';
import Login from 'sections/auth/Login';
import { Modal } from 'pages/common/Modal';
import UserMenu from 'pages/common/UserMenu';
import { useQueryHook } from 'hooks/useQueryHook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { modalopen, modalclose } from 'redux/modules/modalModules';

function Map() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [point, setPoint] = useState();
  const [markerState, setMarkerState] = useState(false);
  const { currentUser, isLoading } = useSelector((store) => store.currentUserModules);
  const { uid } = useParams();
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY // 발급 받은 APPKEY
    // ...options // 추가 옵션
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useQueryHooked = useQueryHook({ document: 'markers' });
  const markers = useQueryHooked.data;
  console.log(currentUser);

  // const navigate = useNavigate();

  const [userLocation, setUserLocation] = useState({
    center: {
      lat: 37.554837713553,
      lng: 126.97181200824
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
    if (!markerState) return;
    setPoint({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng()
    });
    navigate('/marker');
    dispatch(modalOpen());
    setMarkerState(false);
  }

  function mapOnOffButton() {
    toast.success('등록할 장소를 찍어주세요!');
    setMarkerState(true);
  }

  function noUidState() {
    toast.error('로그인이 필요합니다!');
    navigate('/Auth');
    dispatch(modalOpen());
  }

  const options = {
    쓰레기통: trash,
    화장실: toilet,
    의류수거함: clothes,
    폐건전지: battery
  };

  return (
    <>
      <WrappingMap markerState={markerState}>
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
            height: '100%',
            cursor: 'progress'
          }}
          level={3} // 지도의 확대 레벨
        >
          {markers?.map(({ lat, lng, option, img, locationName, id }, index) => (
            <MapMarker
              key={index}
              position={{
                lat: lat,
                lng: lng
              }}
              image={{
                src: options[option],
                size: { width: 30, height: 30 },
                options: {
                  spriteSize: { width: 30, height: 30 },
                  spriteOrigin: { x: 0, y: 0 }
                }
              }}
              onClick={() => {
                navigate(`/marker/${id}`);
                dispatch(modalOpen());
              }}
            ></MapMarker>
          ))}
        </KakaoMap>
        <LocatedBtn>
          <MarkerIcon src={gpsIcon} />
        </LocatedBtn>
        <MarkerBtn
          currentUser={currentUser}
          onClick={() => {
            if (currentUser) {
              mapOnOffButton();
            } else {
              noUidState();
            }
          }}
        >
          <MarkerIcon src={marker} />
        </MarkerBtn>
        <UserMenu />
        <Modal />
        <Outlet context={{ lat: point?.lat, lng: point?.lng }} />
      </WrappingMap>
      <ToastContainer autoClose={3000} aposition={toast.POSITION.TOP_LEFT} />
    </>
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

const MarkerBtn = styled.button`
  z-index: 100;
  width: 70px;
  height: 50px;
  background-color: ${(props) => {
    return props.currentUser ? '#79AC78' : '#FF8080';
  }};
  position: fixed;
  bottom: 50%;
  right: 3%;
  border-radius: 60px;
  cursor: pointer;
`;

const LocatedBtn = styled.button`
  z-index: 100;
  width: 70px;
  height: 50px;
  position: fixed;
  bottom: 60%;
  right: 3%;
  border-radius: 60px;
  background-color: gray;
  cursor: pointer;
`;

const WrappingMap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: relative;
  svg {
    cursor: ${(props) => {
      return props.markerState ? 'crosshair' : 'grab';
    }};
  }
`;
export default Map;
