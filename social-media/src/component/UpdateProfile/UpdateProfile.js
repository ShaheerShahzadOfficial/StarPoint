import "./profile.css"
import { Avatar, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
const UpdateProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate  = useNavigate()

    const { isAuthenticated, loading,user } = useSelector(
        (state) => state?.Auth,
      )
      const [avatar, setAvatar] = useState(user?.avatar?.url)

      
useEffect(() => {
 if (!isAuthenticated) {
    navigate("/login")
 }
}, [isAuthenticated, navigate])


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

  return (
    <div className="BackGround">
      {loading ? (
        <div className='profile'>
          <div className='loaderContainer'> Loading ....</div>
        </div>
      ) : (
        <div className="Background1">
          <div className="UserProfiles">
              <div>
                <Avatar
                  src={avatar}
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

<Button>Update Profile</Button>
              </div>
              </div>
             

            </div>  

      )}
    </div>  )
}

export default UpdateProfile
