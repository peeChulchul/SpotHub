import Login from 'sections/auth/Login';
import Signup from 'sections/auth/Signup';
import Router from 'shared/Router';
import { GlobalStyles } from 'styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router />
      <Login />
      <Signup />

    </>
  );
}

export default App;
