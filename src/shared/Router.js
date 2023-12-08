import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marker from 'sections/marker/Marker';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

import Index from 'pages/test';
import Login from 'sections/auth/Login';
import EditMarker from 'sections/marker/EditMarker';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { AUTH } from 'myFirebase';
import Map from 'pages/home/Map';
import { Modal } from 'pages/common/Modal';
import { currentUserFullfild, currentUserPendeing } from '../redux/modules/currentUserModules';

function Router() {
  const { isLoading, massage, error, currentUser } = useSelector((modules) => modules.currentUserModules);
  console.log(isLoading);
  console.log(currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAUth = onAuthStateChanged(AUTH, async (user) => {
      console.log(user);
      if (user) {
        dispatch(currentUserFullfild({ uid: user.uid, avatar: user.photoURL, nickname: user.displayName }));
      } else {
        dispatch(currentUserFullfild(null));
      }
    });

    return unsubscribeAUth;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Map />} path="/">
            <Route
              element={
                <Modal>
                  <Marker />
                </Modal>
              }
              path="/marker"
            ></Route>
            <Route
              element={
                <Modal>
                  <EditMarker />
                </Modal>
              }
              path="/editMarker"
            ></Route>
            <Route
              element={
                <Modal>
                  <Login />
                </Modal>
              }
              path="/Auth"
            ></Route>
          </Route>
          <Route path="/test" element={<Index />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
