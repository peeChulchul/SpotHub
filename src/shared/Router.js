import PageHome from 'pages/home/PageHome';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

function Router() {
  return (
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

            {/* <Route element={<Home />} path="/"></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
