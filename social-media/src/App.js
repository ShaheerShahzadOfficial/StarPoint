import './App.css'
import Login from './component/Login/login.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './component/Register/Register'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'
import Home from './component/Home/Home'
import Navbar from './config/Navbar'
import UserProfile from './component/UserProfile/UserProfile'
import Video from './component/Video/Video'
import UpdatePassword from './component/UpdatePassword/UpdatePassword'
import UpdateProfile from './component/UpdateProfile/UpdateProfile'
import ResetPassword from './component/ResetPassword/ResetPassword'
import Error from './component/Error/Error.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LoadUser } from './Redux/Actions/Auth'
function App() {
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector((state) => state?.Auth)
  useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/watch" element={<Video />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App