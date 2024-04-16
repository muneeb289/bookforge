import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import customTheme from './themes/customTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './pages/User/SignIn.js';
import SignUp from './pages/User/SignUp.js';
import Pagenotfound from './pages/Pagenotfound.js';
import BookList from './pages/Book/BookList.js';
import axios from 'axios';
import Layout from './pages/Layout/Layout.js';
import AuthorList from './pages/Author/AuthorList.js';

function App() {
  // let navigate = useNavigate()

  // const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;

  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const handleSignIn = () => {
    setAuth(true);
  };

  ; (async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verifyUser`);
      if (res.data.status === true) {
        // console.log(localStorage.getItem('auth'))
        setAuth(true);
        localStorage.setItem('auth', JSON.stringify(auth));
      } else {
        setAuth(false);
        // console.log(res)
        localStorage.setItem('auth', JSON.stringify(auth));
        // console.log(localStorage.getItem('auth'))
        // localStorage.setItem('auth', JSON.stringify(auth));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })()

  const PrivateRoutes = () => {
    // console.log(auth)
    return (
      auth ? <Layout /> : <Navigate to='/signin' />
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn onSignIn={handleSignIn} />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<BookList />} />
            <Route path='/authorlist' element={<AuthorList />} />


          </Route>


          <Route path='/*' element={<Pagenotfound />} />

        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;

