// source: https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/getting-started/templates/sign-in/SignIn.js#L33
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

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function SignIn({ onSignIn }) {
    let navigate = useNavigate()
    let data;
    const [inputData, setinputData] = useState(data = {
        User_Email: "",
        User_Password: "",
    });
    axios.defaults.withCredentials = true;
    const handleInput = (event) => {
        setinputData({ ...inputData, [event.target.name]: event.target.value })
    };
    // console.log(inputData)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(inputData)
        if (!inputData.User_Email.match(emailRegex)) {
            return toast.error("Invalid email")
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, inputData);
            if (res.data.status === false) {
                return toast.error("Invalid credentials!");
            }
            if (res.data.status === true) {
                // console.log("hello")
                // Call the callback function passed from App.js
                onSignIn();
                // Redirect to the dashboard or any other protected route
                navigate('/');
            }

            // Check what data is returned from the server
        } catch (error) {
            console.log(`from catch ${error}`);
        }
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
                        Sign in
                    </Typography>
                    <Box component="form" method='post' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="User_Email"
                            label="Email Address"
                            name="User_Email"
                            autoFocus
                            onChange={handleInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="User_Password"
                            label="Password"
                            type="password"
                            id="User_Password"
                            onChange={handleInput}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <NavLink to='/signup'>Forgot password?</NavLink> */}
                            </Grid>
                            <Grid item>
                                <NavLink to='/signup'>Don't have an account? Sign Up</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container >
            <ToastContainer />

        </>
    );
}

export default SignIn;