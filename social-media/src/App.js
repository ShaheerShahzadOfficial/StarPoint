import './App.css'
import Login from './component/Login/login.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './component/Register/Register'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'
import Home from './component/Home/Home'
import Navbar from './config/Navbar'
import UserProfile from './component/UserProfile/UserProfile'
import UpdatePassword from './component/UpdatePassword/UpdatePassword'
import UpdateProfile from './component/UpdateProfile/UpdateProfile'
import ResetPassword from './component/ResetPassword/ResetPassword'
import Error from './component/Error/Error.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { LoadUser } from './Redux/Actions/Auth'
import Search from './component/Search/Search'
import UserAccount from './component/User/UserId'



function App () {
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(state => state?.Auth)
  useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])

  return (
    <div className='App'>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}

        <Routes>
          <Route
            path='/login'
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />
          <Route
            path='/register'
            element={isAuthenticated ? <UserProfile /> : <Register />}
          />

          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route
            exact
            path='/'
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route
            path='/account'
            element={isAuthenticated ? <UserProfile /> : <Login />}
          />
          <Route
            path='/user/:id'
            element={isAuthenticated ? <UserAccount /> : <Login />}
          />
          <Route
            path='/UpdatePassword'
            element={isAuthenticated ? <UpdatePassword /> : <Login />}
          />
          <Route
            path='/updateProfile'
            element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
          <Route
            path='/search'
            element={isAuthenticated ? <Search /> : <Login />}
          />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
