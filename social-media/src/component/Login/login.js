import "./login.css"
import React, { useEffect, useState } from 'react'
import {Typography,Button} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import swal from "sweetalert"
import { LoginUser } from "../../Redux/Actions/Auth"
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
const navigate = useNavigate()
  const { isAuthenticated, error,loading } = useSelector((state) => state?.Auth)


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Account")
    }
   
    if (error?.msg === "You Are Not Registered User") {
      swal("Autentication Failed", "You Are Not Registered User", "error")
  }
}, [error, isAuthenticated, navigate])


const loginUser = () => {
  dispatch(LoginUser(email,password))
}

  return (
    <div className="login">
      {
        loading ? <div className="loginContainer">Loading ....</div>:<div className="loginContainer">
        <Typography variant="h3" style={{ padding: "2vmax" , color:"#155799" }}>
          Social App
        </Typography>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
        />
            <Link to={"/forgotPassword"}>Forgot Password?</Link>
            <Button onClick={loginUser}>Login</Button>
            <Link to={"/register"}>New User ?</Link>
        </div>
      }
        
    </div>
  )
}

export default Login