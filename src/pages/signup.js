import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, AuthContainer, Input, Text, Loader } from "../components";
import { useAuth } from "../context/AuthContext";
import './signup.css';

export const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
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
    <AuthContainer className='SignUpContainer' internalClassName='SignUpInternalContainer'>
      <Avatar className='marginBottom' />
      <Text className='h5 marginBottom'>Sign Up</Text>
      <Input className='marginTopRemove' label='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <Input className='marginTopRemove' label='Password' value={password} onChange={e => setPassword(e.target.value)} />
      <Input className='marginTopRemove' label='Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <Input className='marginTopRemove' label='Role' value={role} onChange={e => setRole(e.target.value)} />
      {error && <Text className='caption error marginBottom'>{error.message}</Text>}
      <Button className='marginBottom' title='Sign Up' disabled={email === '' && password === '' && confirmPassword === '' && password !== confirmPassword} onClick={() => signup(email, password, role)} />
      <Text>Already have an account? <Link to='/signin'>Sign In</Link> </Text>
    </AuthContainer>
  )
}