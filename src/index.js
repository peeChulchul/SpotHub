import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import swal from 'sweetalert'; // sweetalert를 가져옴

window.swal = swal;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// <React.StrictMode>
// </React.StrictMode>

reportWebVitals();
