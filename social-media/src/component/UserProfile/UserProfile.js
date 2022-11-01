import { Avatar, Button } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import '../Home/home.css'
import { Logout } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteProfile, myProfile } from '../../Redux/Actions/User'
import { MyPost } from '../../Redux/Actions/Post'
import MyPosts from '../Post/MyPosts'
import Following from "../Following/Following"
import Followers from "../Followers/Followers.js"
const UserProfile = () => {
  const { isAuthenticated, loading, user } = useSelector(state => state?.Auth)
  const { post } = useSelector(state => state?.myPost)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    dispatch(MyPost())
    dispatch(myProfile())
  }, [dispatch, isAuthenticated, navigate])

  const deleteProfile = () => {
    dispatch(DeleteProfile())
  }

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const handleClose = ()=> {setOpen(!open)}
  const handleClose2 = ()=> {setOpen2(!open2)}

  return (
    <Fragment>
      {loading ? (
        <div className='loaderContainer'>
          <div className='loader'> Loading ....</div>
        </div>
      ) : (
        <div className='Background'>
          <div className='UserProfile'>
            <div className='ProfileContainer'>
              <div>
                <Avatar
                  src={user?.avatar?.url}
                  alt='User'
                  className='avatar'
                  sx={{
                    height: '15vmax',
                    width: '15vmax',
                    marginLeft: '1vmax',
                    marginRight: '1vmax',
                    zIndex: 1
                  }}
                />

                <h2> {user?.name} </h2>

                <div className='Link'>
                  <Link to={'/updateProfile'} className='editProfile'>
                    Edit Profile
                  </Link>
                  <Link to={'/UpdatePassword'}>Change Password</Link>
                </div>
              </div>

              <div className='Details'>

                <div style={{cursor:"pointer"}} onClick={()=>setOpen2(!open2)}>
                  <h4>Followers</h4>
                  <p>{user?.followers?.length}</p>
                </div>

                <div style={{cursor:"pointer"}} onClick={()=>setOpen(!open)}>
                  <h4>Following</h4>
                  <p>{user?.following?.length}</p>
                </div>

                <div>
                  <h4>Posts</h4>
                  <p>{user?.posts?.length}</p>
                </div>
              </div>

              <div className='followingContainer'>
    {user &&       <Following  followings={user?.following} open={open} close={handleClose}/>}
    </div>


    <div className='followerContainer'>
    {user &&       <Followers  followers={user?.followers} open={open2} close={handleClose2}/>}
    </div>

              <div className='logout'>
                <Button
                  variant='contained'
                  onClick={() => {
                    dispatch(Logout())
                  }}
                >
                  LogOut
                </Button>
                <br />
                <Button color='error' onClick={deleteProfile}>
                  DELETE MY PROFILE
                </Button>
              </div>
            </div>

            <div className='postContainer'>
              {post?.posts?.map((item, i) => (
                <MyPosts key={i} item={item} />
              ))}
            </div>



          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserProfile
