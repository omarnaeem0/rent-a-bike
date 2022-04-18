import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Loader, TextField } from "../../components";
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { useAuth } from "../../context/AuthContext";
import './signin.css';

export const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signin, currentUser, error, loading } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigate('/manager')
    }
  }, [currentUser])
  if (loading) {
    return <Loader />
  }
  return (
    <Container maxWidth="xs" >
      <Paper className="SignInContainer">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Avatar />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Sign In</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Grid>
          {error && <Grid item xs={12}>
            <Typography variant="caption">{error.message}</Typography>
          </Grid>}
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => signin(email, password)} >Sign In</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>Don't have an account? <Link to='/signup'>Sign Up</Link> </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
