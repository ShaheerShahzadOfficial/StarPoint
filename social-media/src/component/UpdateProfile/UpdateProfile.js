import "./profile.css"
import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { UpdateUserProfile } from "../../Redux/Actions/User"
import { LoadUser } from "../../Redux/Actions/Auth"
import { UPDATE_PROFILE_RESET } from "../../Redux/Constant"
const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated, loading,user,isUpdated } = useSelector(
        (state) => state?.Auth,
      )
      const [avatar, setAvatar] = useState()

      
useEffect(() => {
 if (!isAuthenticated) {
    navigate("/login")
 }
 if (user) {
  setName(user?.name)
  setEmail(user?.email)
 }
 if (isUpdated?.message==="Profile Updated") {
      dispatch(LoadUser())
      dispatch({
        type:UPDATE_PROFILE_RESET
      })
      navigate("/Account")
}
}, [dispatch, isAuthenticated, isUpdated?.message, navigate, user])


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

  const updateProfile = ()=>{
    dispatch(UpdateUserProfile(name,email,avatar))
  }

  return (
    <div className="updateProfile">
  {
    loading?<>loading ...</>:<div className="updateProfileContainer">
             <Avatar
                  src={avatar?avatar:user?.avatar?.url}
                  alt="User"
                  className="avatar"
                  sx={{
                    height: '15vmax',
                    width: '15vmax',
                    marginLeft: '1vmax',
                    marginRight: '1vmax',
                    zIndex: 1,
                  }}
                />

<input
          type="file"
          id="avatar"
          accept="image/*" style={{color:"white",border:"none"}}
          onChange={handleImageChange}
        />
        <input placeholder="Name" value={name}   onChange={(e)=>setName(e.target.value)}  type={"text"} />
        <input placeholder="Email" value={email}  onChange={(e)=>setEmail(e.target.value)} type={"email"}/>
    
            <Button onClick={updateProfile}>Update Profile</Button>
       
    </div>
  }

</div> 
    )
}

export default UpdateProfile
