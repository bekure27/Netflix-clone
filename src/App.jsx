import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage';
import Nav from './components/Nav';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import RegisterPage from './components/RegisterPage';
import { AuthProvider } from "./context/context";
import ProtectRoute from './components/ProtectRoute';

function App() {

  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<ProtectRoute><UserPage /></ProtectRoute> } />
          <Route path="/home" element={<ProtectRoute><MainPage /></ProtectRoute> } />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App
