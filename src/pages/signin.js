import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, AuthContainer, Input, Text, Loader } from "../components";
import { useAuth } from "../context/AuthContext";
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
    <AuthContainer className='SignInContainer' internalClassName='SignInInternalContainer'>
      <Avatar className='marginBottom' />
      <Text className='h5 marginBottom'>Sign In</Text>
      <Input className='marginTopRemove' label='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <Input className='marginTopRemove' label='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
      {error && <Text className='caption error marginBottom'>{error.message}</Text>}
      <Button className='marginBottom' title='Sign In' onClick={() => signin(email, password)} />
      <Text>Don't have an account? <Link to='/signup'>Sign Up</Link> </Text>
    </AuthContainer>
  )
}
