import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert } from '@mui/material';
import { BASE_URL } from "../Constants";
export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const response = await axios.post(BASE_URL+'auth/login', inputs)
    if (response) {
      setCurrentUser(response.data);
      <Alert variant="filled" severity="success">
        Logged In Successfully!
      </Alert>

    }
    else {
      <Alert variant="filled" severity="error">
        Something Went Wrong !
      </Alert>

    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
