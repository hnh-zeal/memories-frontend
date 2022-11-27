import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import Memories_Logo from '../../images/memories-Logo.png';
import Memories_Text from '../../images/memories-Text.png';
import { LOGOUT } from '../../constants/actionTypes';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    if (token && token.substr(0,5) === 'eyJhb') {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    } else {
      //  need to consider for google oauth
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={Memories_Text} alt="memories_text" height="45" />
        <img className={classes.image} src={Memories_Logo} alt="memories_logo" height="40" />
      </Link>
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