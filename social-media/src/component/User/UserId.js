import "../UserProfile/profile.css"
import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material'
 import { useDispatch, useSelector } from "react-redux"
 import { useParams } from 'react-router-dom'
import { LoadUser } from "../../Redux/Actions/Auth"
import { followAndUnfollowUser, getUsersProfile } from "../../Redux/Actions/User"
import UserPost from "../Post/UserPost.js"
import Following from "../Following/Following"
import Followers from "../Followers/Followers"

const UserAccount = () => {

  // const [LikedPost, setLikedPost] = useState(false)

const [myProfile, setMyProfile] = useState(false)
const [following, setFollowing] = useState(false);
  const dispatch = useDispatch()
  let {id}  = useParams();

useEffect(() => {
  dispatch(getUsersProfile(id))

}, [dispatch, id])
  const  {user,loading} = useSelector((state) => state.User)

  const  {user:me} = useSelector((state) => state.Auth)



useEffect(() => {

  if (me?._id === id) {
    setMyProfile(true)
  }else{
    setMyProfile(false)
  }

  if (user) {
    user?.users?.followers?.forEach((item) => {
      if (item._id === me._id) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });
  }


}, [id, me._id, user])

const followHandler = async () => {
  setFollowing(!following);
  await dispatch(followAndUnfollowUser(user?.users?._id));
  await dispatch(getUsersProfile(id));
  await  dispatch(LoadUser())
};


const [open, setOpen] = useState(false)
const [open2, setOpen2] = useState(false)

const handleClose = ()=> {setOpen(!open)}
const handleClose2 = ()=> {setOpen2(!open2)}

  return (
<Fragment>

{
  loading ? <div className="loaderContainer">
    <div className="loader">Loading ...</div>
  </div> :
  <div className='Background'>
  <div className="UserProfile">
     
  <div className="ProfileContainer">
<div>
<Avatar
src={user?.users?.avatar?.url}
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

<h2> {user?.users?.name} </h2>


</div>

<div className="Details">
<div style={{cursor:"pointer"}} onClick={()=>setOpen2(!open2)}>
<h4>Followers</h4>
<p>{user?.users?.followers?.length}</p>
</div>

<div style={{cursor:"pointer"}} onClick={()=>setOpen(!open)}>
<h4>Following</h4>
<p>{user?.users?.following?.length}</p>
</div>

<div>
<h4>Posts</h4>
<p>{user?.users?.posts?.length}</p>
</div>
</div>

<div className="follow">
{myProfile ? null : (
          <Button
            variant="contained"
            style={{ background: following===true ? "red" : "" }}
            onClick={followHandler}
            // disabled={followLoading}
          >
            {following===true ?
             "Unfollow" :
              "Follow"
              } 
          </Button>
        )}

</div>


<div className='followingContainer'>
    {user &&       <Following  followings={user?.users?.following} open={open} close={handleClose}/>}
    </div>


    <div className='followerContainer'>
    {user &&       <Followers  followers={user?.users?.followers} open={open2} close={handleClose2}/>}
    </div>

</div>

<div className="postContainer">
{user?.post?.map((item, i) => (
<UserPost
key={i}
item={item}
User={user?.users}
/>
))}
</div> 


</div>
</div>
}

</Fragment>
  )
}

export default UserAccount