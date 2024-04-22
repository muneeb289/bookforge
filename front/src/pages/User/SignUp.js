// source: https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/getting-started/templates/sign-up/SignUp.js
import * as React from 'react';
import { useState } from 'react';
import customTheme from '../../themes/customTheme';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { createTheme, ThemeProvider } from '@mui/material/styles';
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
// const userNameRegex = /^(?![_.])[a-zA-Z0-9_]{6,18}(?<![_.])$/
const PasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/

function SignUp() {
  const navigate = useNavigate();
  let data = {
    User_Email: "",
    User_Password: "",
  };
  const [inputData, setinputData] = useState(data);
  const handleInput = (event) => {
    setinputData({ ...inputData, [event.target.name]: event.target.value })
  };
  // console.log(inputData)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputData);
    if (!inputData.User_Email.match(emailRegex)) {
      return toast.error("Invalid email")
    }
    if (!inputData.User_Password.match(PasswordRegex)) {
      return toast.error("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one symbol and one number")
    }
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/registeruser`, inputData)
      .then(res => {
        if (!res.status === 201) {
          navigate('/signup')
        } else {
          //res.data.msg
          toast.success(res.data.msg)
          // alert(res.data.msg)
          // navigate('/signin')
        }
      })
      // error.response.data.msg
      .catch(error => toast.error(error.response.data.msg))
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: customTheme.palette.primary.main }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="User_Email"
                  label="Email Address"
                  name="User_Email"
                  // autoComplete="email"
                  type='email'
                  onChange={handleInput}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="User_Password"
                  label="Password"
                  type="password"
                  id="User_Password"
                  onChange={handleInput}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to='/signin'> Already have an account? Sign in</NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}

export default SignUp;