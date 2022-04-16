import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Loader } from "../components";
import { useAuth } from "../context/AuthContext";
import './manager.css';

export const Manager = (props) => {
  let navigate = useNavigate();
  const {currentUser, signout, loading} = useAuth();
  useEffect(() => {
    if(!currentUser) {
      navigate('/signin');
    }
  }, [currentUser])
  if (loading) {
    return <Loader />
  }
  return (
    <Container className='Container' internalClassName='InternalContainer'>
      Manager
      <button onClick={signout}>
        SignOut
      </button>
    </Container>
  )
}
