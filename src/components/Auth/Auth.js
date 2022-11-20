import React, { useState } from 'react';
import { Avatar, Container, Paper, Typography, Grid, Button } from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signIn, signUp } from '../../actions/auth';
import axios from 'axios';
import { AUTH } from '../../constants/actionTypes';


const initalFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initalFormData);
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword)=> !prevShowPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate ));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (tokenReponse) => {
        console.log(tokenReponse)
        const token = tokenReponse?.access_token;
        try {
            const result = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${tokenReponse.access_token}`
                }
            })
            const data = result?.data;
            console.log(result);
            dispatch({ type: AUTH, data: { data, token }});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was Unsucessful. Try again later.");
    }

    const login = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: googleFailure,
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp? 'Sign Up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {   isSignUp && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignUp? 'Sign Up': 'Sign In' }
                </Button>
                {/* <GoogleLogin
                    clientId=""
                    render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={"single_host_origin"}
                /> */}
                
                <Button className={classes.googleButton} color="primary" fullWidth onClick={login}
                        startIcon={<Icon />} variant="contained">
                    Google Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                     <Grid item>
                        <Button onClick={switchMode}>
                            { isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                        </Button>
                     </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
    )
}

export default Auth;