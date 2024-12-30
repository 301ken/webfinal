import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();


    const [isAuthenticated, setIsAuthenticated] = useState(
        JSON.parse(localStorage.getItem("isAuthenticated")) || false
    );
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || {}
    );


    const login = (token) => {
        const decodedToken = jwtDecode(token); // Decode the JWT
        setUser(decodedToken.user); // Set user data
        setIsAuthenticated(true); // Mark user as authenticated

        // Store token and user details in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem("user", JSON.stringify(decodedToken.user));

        navigate("/home"); // Redirect to home page
    };


    const logout = () => {
        setIsAuthenticated(false);
        setUser({});


        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");

        navigate("/"); // Redirect to landing page
    };


    const checkTokenExpired = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decodedToken.exp < currentTime) {
                logout(); // Log out if the token has expired
                console.log("Token expired, logging out...");
            }
        }
    };


    useEffect(() => {
        if (isAuthenticated) {
            checkTokenExpired();
        }


        const interval = setInterval(() => {
            if (isAuthenticated) checkTokenExpired();
        }, 60000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);


    const value = { isAuthenticated, login, logout, user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
