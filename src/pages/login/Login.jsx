import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {
  const { login } = useContext(AuthContext);
  const [inputs,setInputs] = useState({
    email:"",
    password:""
  })
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [showRegisterFail, setShowRegisterFail] = useState(false);
  const navigate = useNavigate();
  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlertEmail(false);
    setShowAlertPassword(false)
    setShowRegisterSuccess(false)
    setShowRegisterFail(false)
  };
  function checkEmail(email){
    //The email value must be a valid stud.noroff.no or noroff.no email address.
   if(email.includes("@stud.noroff.no")|| email.includes("@noroff.no")) return true;
   return false;
  }
   function checkPassword(password){
    //The password value must be at least 8 characters.
    const isValidLength = /^.{8,16}$/;
    return isValidLength.test(password)
   }
  const handleLogin = async(e) => {
    try{
      e.preventDefault();
      if (!checkEmail(inputs.email)){
        setShowAlertEmail(true)
        return false
      }
       if (!checkPassword(inputs.password)) {
        setShowAlertPassword(true)
        return false
      }
     await login(inputs);
     setShowRegisterSuccess(true)
     navigate('/')
    }
    catch(e){
      setShowRegisterFail(true)
    }
    
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello.</h1>
          <p>
          Welcome to our social media application
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
        {showRegisterSuccess&&
          <Snackbar open={showRegisterSuccess} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User Created Successfully!
          </Alert>
        </Snackbar> }
        {showRegisterFail&&
          <Snackbar open={showRegisterFail} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Something Went Wrong, Please Try Again Later
          </Alert>
        </Snackbar> }
          {showAlertEmail&&
          <Snackbar open={showAlertEmail} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          The email value must be a valid stud.noroff.no or noroff.no email address.
          </Alert>
        </Snackbar> }
        {showAlertPassword&&
          <Snackbar open={showAlertPassword} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          The password value must be at least 8 characters.
          </Alert>
        </Snackbar> }
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
