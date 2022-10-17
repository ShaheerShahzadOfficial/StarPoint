import { Avatar, Button } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import '../Home/home.css'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import CommentIcon from '@mui/icons-material/Comment'
import { Logout } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
const UserProfile = () => {
  const { isAuthenticated, error, loading,user } = useSelector(
    (state) => state?.Auth,
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const post = [
    {
      ownerIcon:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTu5KbCBza-W8QilheYFFRNax0xbNnp13kTqmg_KE8w&s',
      caption: 'Forever Fashion',
      img:
        'https://www.theforeverfashion.com/static/media/Forever%20fashion.7a9ede9238e3d626b005.png',
      name: 'Shaheer',
      Likes: 2,
      Comments: 4,
    },
    {
      ownerIcon:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTu5KbCBza-W8QilheYFFRNax0xbNnp13kTqmg_KE8w&s',
      caption: 'Vector Icons',
      img:
        'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?b=1&k=20&m=517188688&s=612x612&w=0&h=x8h70-SXuizg3dcqN4oVe9idppdt8FUVeBFemfaMU7w=',
      name: 'Shaheer',
      Likes: 10,
      Comments: 4,
    },
    {
      ownerIcon:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTu5KbCBza-W8QilheYFFRNax0xbNnp13kTqmg_KE8w&s',
      caption: 'Forever Fashion',
      video:
        'https://res.cloudinary.com/shaheerdev/video/upload/v1665423508/SocialApp/project_bnhkq2.mp4',
      name: 'Shaheer',
      Likes: 2,
      Comments: 4,
    },
  ]


  return (
    <Fragment>
      {loading ? (
        <div className='profile'>
          <div className='loaderContainer'> Loading ....</div>
        </div>
      ) : (
        <div className="Background">
          <div className="UserProfile">
            <div className="ProfileContainer">
              <div>
                <Avatar
                  src={user?.avatar?.url}
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

                <h2> {user?.name} </h2>

                <div className="Link">
                  <Link to={'/updateProfile'} className="editProfile">
                    Edit Profile
                  </Link>
                  <Link to={'/UpdatePassword'}>Change Password</Link>
                </div>
              </div>

              <div className="Details">
                <div>
                  <h4>Followers</h4>
                  <p>{user?.followers?.length}</p>
                </div>

                <div>
                  <h4>Following</h4>
                  <p>{user?.following?.length}</p>
                </div>

                <div>
                  <h4>Posts</h4>
                  <p>{user?.posts?.length}</p>
                </div>
              </div>

              <div className="logout">
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(Logout())
                  }}
                >
                  LogOut
                </Button>
                <br />
                <Button color="error">DELETE MY PROFILE</Button>
              </div>
            </div>

            <div className="postContainer">
              {post?.map((item, i) => (
                <div className="post" key={i}>
                  <div className="postHeader">
                    <Avatar
                      src={item?.ownerIcon}
                      alt="User"
                      className="avatar"
                      sx={{
                        width: '10vh',
                        height: '10vh',
                        marginLeft: '1vmax',
                        marginRight: '1vmax',
                        zIndex: 1,
                      }}
                    />
                    <h3>{item?.name}</h3>
                  </div>
                  <div className="postBody">
                    {/* Caption */} <p>{item?.caption}</p>
                    {item?.img && <img src={item?.img} alt="postOwner" />}
                    {item?.video && (
                      <video controls controlsList="nodownload">
                        <source src={item?.video} />
                      </video>
                    )}
                  </div>
                  <div className="postFooter">
                    <p>{item?.Likes}Likes</p>
                    <p>{item?.Comments}Comments</p>
                    <hr className="new" />
                    <ThumbUpOutlinedIcon />
                    <CommentIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserProfile
