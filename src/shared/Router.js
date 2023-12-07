import PageHome from 'pages/home/PageHome';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marker from 'sections/marker/Marker';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../redux/config';
import Index from 'pages/test';
import Login from 'sections/auth/Login';
import EditMarker from 'sections/marker/EditMarker';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { AUTH } from 'myFirebase';
import Map from 'pages/home/Map';
import { Modal } from 'pages/common/Modal';

function Router() {
  const queryClient = new QueryClient();
  const [islogin, setIsLogin] = useState(false);

  console.log(AUTH.currentUser);
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
      </Provider>
    </QueryClientProvider>
  );
}

export default Router;
