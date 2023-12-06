import Login from 'sections/marker/auth/Login';
import Sigup from 'sections/marker/auth/Sigup';
import Router from 'shared/Router';
import { GlobalStyles } from 'styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
      <Login />
      <Sigup />

    </>
  );
}

export default App;
