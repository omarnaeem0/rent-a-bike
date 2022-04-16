import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Manager, SignIn, SignUp, User } from './pages';
import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';

function App() {
  // const [user, setUser] = useState({
  //   permission: 'manager',
  //   signedIn: false
  // })
  // useEffect(() => {
  //   readUser();
  // }, [])
  // const saveUser = (user) => {
  //   setUser(user);
  //   localStorage.setItem('user', JSON.stringify(user));
  // }
  // const readUser = () => {
  //   const user = localStorage.getItem('user');
  //   user && setUser(JSON.parse(user));
  // }
  const { currentUser } = useAuth();
  const userType = 'manager';
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate to={currentUser ? userType : 'signin'} />} />
        <Route path="signin" element={<CheckSignedInRoute userType={userType}><SignIn /></CheckSignedInRoute>} />
        <Route path="signup" element={<CheckSignedInRoute userType={userType}><SignUp /></CheckSignedInRoute>} />
        <Route path="manager" element={<ProtectedRoute><Manager/></ProtectedRoute>} />
        <Route path="user" element={<ProtectedRoute><User /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function CheckSignedInRoute(props) {
  const { children, userType } = props;
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to={'/' + userType} />
  }
  return children;
}

function ProtectedRoute(props) {
  const { children } = props;
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to={'/signin'} />
  }
  return children;
}

export default App;
