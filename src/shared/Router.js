import PageHome from 'pages/home/PageHome';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marker from 'sections/marker/Marker';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../redux/config';
import Index from 'pages/test';
import Signup from 'sections/auth/Signup';
import Login from 'sections/auth/Login';
import EditMarker from 'sections/marker/EditMarker';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { AUTH } from 'myFirebase';
import { useKakaoLoader, Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';

function Router() {
  const queryClient = new QueryClient();
  const [islogin, setIsLogin] = useState(false);
  const [latLng, setLatLng] = useState({
    lat: 0,
    lng: 0
  });
  function onClickMap(_t, mouseEvent) {
    console.log(mouseEvent.latLng);
  }

  useEffect(() => {
    const unsubscribeAUth = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        return setIsLogin(true);
      }
      return setIsLogin(false);
    });

    return unsubscribeAUth;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route element={<PageHome />} path="/"></Route>
              <Route element={<Marker />} path="/marker"></Route>
              <Route element={<EditMarker />} path="/editMarker"></Route>
              <Route
                element={
                  <>
                    <Signup /> <Login />
                  </>
                }
                path="/Auth"
              ></Route>
              <Route path="/test" element={<Index />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default Router;
