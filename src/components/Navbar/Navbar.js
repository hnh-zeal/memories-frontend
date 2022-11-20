import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../../images/memories.png';
import { LOGOUT } from '../../constants/actionTypes';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile'))); // does not work when in custom login 
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.data ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={`${user?.data.name}`} src={user?.data.picture}>
              {user?.data.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6"> {`${user?.data.name}`} </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}> Logout</Button>
          </div>
        ) : (<>
          <Button component={Link} to="/auth" variant="contained" color="primary"> Sign In </Button>
        </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar