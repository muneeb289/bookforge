import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './themes/customTheme';
import Layout from './pages/Layout/Layout.js';
import SignIn from './pages/User/SignIn.js';
import SignUp from './pages/User/SignUp.js';
import Pagenotfound from './pages/Pagenotfound.js';
import BookList from './pages/Book/BookList.js';
import AuthorList from './pages/Author/AuthorList.js';
import axios from 'axios';

function App() {

  axios.defaults.withCredentials = true;

  const handleSignIn = () => {
    // console.log(localStorage.getItem('auth'))
    localStorage.setItem('auth', JSON.stringify(true));
    // console.log(localStorage.getItem('auth'))
  };

  // ; (async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verifyUser`);
  //     if (res.data.status === true) {
  //       console.log(localStorage.getItem('auth'))
  //       setAuth(true);
  //       localStorage.setItem('auth', JSON.stringify(true));
  //       console.log(localStorage.getItem('auth'))
  //     } else {
  //       console.log(res)
  //       console.log(localStorage.getItem('auth'))
  //       localStorage.setItem('auth', JSON.stringify(false));
  //       console.log(localStorage.getItem('auth'))
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // })()

  const PrivateRoutes = () => {
    // console.log(`from line 46 of App.js ${JSON.parse(localStorage.getItem('auth'))}`)
    return (
      JSON.parse(localStorage.getItem('auth')) === true ? <Layout /> : <Navigate to='/signin' />
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            {/* Add protected or private route here */}
            <Route path='/' element={<BookList />} />
            <Route path='/authorList' element={<AuthorList />} />

          </Route>
          <Route path='/signin' element={<SignIn onSignIn={handleSignIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );


}

export default App;
