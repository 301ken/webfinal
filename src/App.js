import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext'; // Assuming useAuth hook is used to check authentication
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';

function ProtectedRoute({ element, redirectTo }) {
    const { user } = useAuth(); // Assuming useAuth hook provides user info
    return user ? element : <Navigate to={redirectTo} replace />;
}

function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    {/* Redirect default path to /home */}
                    <Route path='/' element={<Navigate to="/home" replace />} />

                    {/* Main Home Page */}
                    <Route path='/home' element={<Home />} />

                    {/* Register and Login Pages */}
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />

                    {/* Profile Page (Protected Route) */}
                    <Route
                        path='/profile/:userId'
                        element={<ProtectedRoute element={<Profile />} redirectTo="/login" />}
                    />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
