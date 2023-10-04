import { Link } from "react-router-dom";
import * as React from 'react';
import "./register.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { BASE_URL } from "../../Constants";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    banner: ""
  })
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [showAlertName, setShowAlertName] = useState(false);
  const [showAlertPassword, setShowAlertPassword] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [showRegisterFail, setShowRegisterFail] = useState(false);
  const navigate = useNavigate();
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlertEmail(false);
    setShowAlertName(false)
    setShowAlertPassword(false)
    setShowRegisterSuccess(false)
    setShowRegisterFail(false)
  };

  function checkEmail(email) {
    //The email value must be a valid stud.noroff.no or noroff.no email address.
    if (email.includes("@stud.noroff.no") || email.includes("@noroff.no")) return true;
    return false
  }
  function checkName(name) {
    //The name value must not contain punctuation symbols apart from underscore (_).
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(name);
  }
  function checkPassword(password) {
    //The password value must be at least 8 characters.
    const isValidLength = /^.{8,16}$/;
    return isValidLength.test(password)
  }
  const Register = async e => {
    e.preventDefault();
    try {
      if (!checkName(inputs.name)) {
        setShowAlertName(true)
        return false
      }
      if (!checkEmail(inputs.email)){
        setShowAlertEmail(true)
        return false
      }
       if (!checkPassword(inputs.password)) {
        setShowAlertPassword(true)
        return false
      }
      await axios.post(BASE_URL+'auth/register', inputs);
      setShowRegisterSuccess(true)
      navigate('/');
    }
    catch (err) {
     setShowRegisterFail(true)
    }
  }
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hello.</h1>
          <p>
            Welcome to our social media application.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
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
          Something Went Wrong, Please Try Again With a Different Name and Email
          </Alert>
        </Snackbar> }
        {showAlertName&&
          <Snackbar open={showAlertName} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          The name value must not contain punctuation symbols apart from underscore (_)
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
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Name" name="name" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <input type="text" placeholder="Avatar URL" name="avatar" onChange={handleChange} />
            <input type="text" placeholder="Banner URL" name="banner" onChange={handleChange} />
            <button onClick={Register}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
