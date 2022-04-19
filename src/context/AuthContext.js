import React, { useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getAccount, registerAccount } from "../api/accounts";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

let perm = '';
const getPerm = () => perm;
const setPerm = p => { perm = p };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  async function signup(email, password, role) {
    setError(false);
    setLoading(true);
    try {
      setRole(role);
      setPerm(role);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await registerAccount({ uid: response.user.uid, email, role });
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
      await signInWithEmailAndPassword(auth, email, password);
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
      await signOut(auth);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user && !getPerm()) {
        const getRole = await getAccount(user.uid);
        console.log('================', getRole)
        setRole(getRole.role);
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
    loading,
    role
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}