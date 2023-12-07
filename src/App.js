import Router from 'shared/Router';
import { GlobalStyles } from 'styles/GlobalStyles';
import { Provider, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/config';
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GlobalStyles />
          <Router />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
