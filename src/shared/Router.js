import PageHome from 'pages/home/PageHome';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '../redux/config';
import Index from 'pages/test';
import Signup from 'sections/marker/auth/Signup';
import Login from 'sections/marker/auth/Login';
function Router() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route element={<PageHome />} path="/">
                {/* oultet으로 처리 */}
                {/* 로그인페이지  */}
                {/* 마커 디테일페이지 쿼리스트링 마커아이디 */}
                {/* 마커 등록페이지 쿼리스트링 유저아이디 */}
                {/*  */}

                {/* <Route element={<Home />} path="/"></Route> */}
              </Route>
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
