import Home from 'components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
