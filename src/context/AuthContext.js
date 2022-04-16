import React, { useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  async function signup(email, password) {
    setError(false);
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(response.user);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  }
  async function signin(email, password) {
    setError(false);
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(response.user);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  }
  async function signout() {
    setError(false);
    setLoading(true);
    try {
      const response = await signOut(auth);
      setCurrentUser(undefined);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user){
        setCurrentUser(user);
      }
      setLoading(false)
    })
    return unsubscribe;
  }, [])
  const value = {
    currentUser,
    signup,
    signin,
    signout,
    error,
    loading
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}