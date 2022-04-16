import React, { useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { addUserPermission, getUserPermission } from "../api/permission";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

let perm = '';
const getPerm = () => perm;
const setPerm = p => { perm = p };

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [permission, setPermission] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  async function signup(email, password, permission) {
    setError(false);
    setLoading(true);
    try {
      setPermission(permission);
      setPerm(permission);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await addUserPermission(response.user.uid, permission);
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
        const getPermission = await getUserPermission(user.uid);
        setPermission(getPermission.permission);
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
    permission
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}