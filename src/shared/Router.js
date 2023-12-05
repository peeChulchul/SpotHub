import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<></>} path="/"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
