import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, SignIn, SignUp } from './pages';
import { useAuth } from './context/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const { currentUser } = useAuth();
  return (
    <div className='App'>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to={currentUser ? 'home' : 'signin'} />} />
        <Route path="signin" element={<CheckSignedInRoute><SignIn /></CheckSignedInRoute>} />
        <Route path="signup" element={<CheckSignedInRoute><SignUp /></CheckSignedInRoute>} />
        <Route path="home/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

function CheckSignedInRoute(props) {
  const { children } = props;
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to={'/home'} />
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
