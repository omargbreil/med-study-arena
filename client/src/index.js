import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './component/ErrorBoundary';
import { UserContextProvider } from './context/user/userContext';
import { DataContextProvider } from './context/dataContext/DataContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <UserContextProvider>

  <DataContextProvider>
  <BrowserRouter>
  <ErrorBoundary>  
  <App/>
  </ErrorBoundary>

  </BrowserRouter>
  </DataContextProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
