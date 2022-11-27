import React from 'react';
import ReactDOM from 'react-dom/client';
import './sundar.css';
import './App.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Home from './pages/Home'
import Hostel from './pages/Hostel';
import Student from './pages/Student';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<App/>}>
          <Route path='/' index element={<Home />} />
          <Route path='/hostel' element={<Hostel />} />
          <Route path='/students' element={<Student/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/*' element={<ErrorPage/>} />
       </Route>
      </Routes>
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
