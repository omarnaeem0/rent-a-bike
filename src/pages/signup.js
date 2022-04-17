import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Loader } from "../components";
import { useAuth } from "../context/AuthContext";
import { Container, Grid, Paper, Typography, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import './signup.css';

export const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isManager, setIsManager] = useState(false);
  const navigate = useNavigate();
  const { signup, currentUser, error, loading } = useAuth();
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
      <Paper className="SignUpContainer">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Avatar />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Sign Up</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField size="small" id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField size="small" id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField size="small" id="outlined-basic" label="Confirm Password" variant="outlined" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              label="Is Manager?"
              control={
                <Checkbox
                  checked={isManager}
                  onChange={() => setIsManager(!isManager)}
                />
              }
            />
          </Grid>
          {error && <Grid item xs={12}>
            <Typography variant="caption">{error.message}</Typography>
          </Grid>}
          <Grid item xs={12}>
            <Button variant="contained" disabled={email === '' && password === '' && confirmPassword === '' && password !== confirmPassword} onClick={() => signup(email, password, isManager ? 'manager' : 'user')} >Sign Up</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>Already have an account? <Link to='/signin'>Sign In</Link> </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
