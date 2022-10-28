import './register.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { RegisterUser } from '../../Redux/Actions/Auth'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const Register = () => {
  const [avatar, setAvatar] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const dispatch = useDispatch()
const navigate = useNavigate()
  const { isAuthenticated, error, loading,success } = useSelector((state) => state?.Auth)


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Account")
    }
    if (error?.msg === "You Are Already a User") {
        swal("Autentication Failed", "You Are Already Registered", "error")
    }
    if (success === true) {
      swal("Success", "You Are Registered", "success")

      navigate("/login")

    }
}, [error, isAuthenticated, navigate, success])


  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result)
      }
    }
  }

  const register = () => {
    dispatch(RegisterUser(name,email,password,avatar))
  }

  return (
    <div className="register">
      {
        loading ? <div className="loginContainer">Loading ....</div>:
      <div className="registerContainer">
        <Typography variant="h3" style={{ padding: '2vmax', color: '#155799' }}>
          Social App
        </Typography>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: '20vmax', width: '22vmax' }}
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleImageChange}
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Link to={'/login'}>Already Registered ? Login Now</Link>
        <Button onClick={register}>SIGN UP</Button>
      </div>
}
    </div>
  )
}

export default Register
