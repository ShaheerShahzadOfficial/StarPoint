import './home.css'
import React, { useEffect, useState } from 'react'
// import Alert from '@mui/material/Alert';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp'
import { Avatar, Box, Button, Modal, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import CommentIcon from '@mui/icons-material/Comment'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import VideocamIcon from '@mui/icons-material/Videocam';
import { CreatePost } from '../../Redux/Actions/Post'
import {useDispatch, useSelector} from "react-redux"
import swal from "sweetalert"
import { LoadUser } from '../../Redux/Actions/Auth'
import { CREATE_POST_RESET } from '../../Redux/Constant'
const Home = () => {
  const [Open, setOpen] = useState(false)
const [avatar, setAvatar] = useState("")
const [Filetype, setFiletype] = useState("")
const [caption, setCaption] = useState("")
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

const dispatch = useDispatch()
const { isAuthenticated, loading, user } = useSelector((state) => state?.Auth)
const {success} = useSelector(state => state.post)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    p: 3,
  }

useEffect(() => {
if (success === true) {
  swal({text:"Post Has been Created",icon:"success"})
  setOpen(false)
  setAvatar("")
  setCaption("")
  dispatch({
    type:CREATE_POST_RESET
  })
  dispatch(LoadUser())
}
}, [dispatch, success])


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
  ]

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

const sharePost = ()=>{
dispatch(CreatePost(caption,avatar,Filetype))
}

  return (
    <div className="home">
      <div className="AddPost">
        <Avatar
          src={user?.avatar?.url}
          alt={user?.avatar?.public_id}
          className="avatar"
          sx={{
            height: '8vh',
            width: '8vh',
            marginTop: '1vh',
            marginBottom: '1vh',
            marginLeft: '1vmax',
            marginRight: '1vmax',
            zIndex: 1,
          }}
        />
        <button onClick={handleOpen}>{`What's on your mind, ${user?user?.name:"User"}?`}</button>

        <Modal
          open={Open}
          onClose={handleClose}
          aria-labelledby="CreatePost"
          aria-describedby="AddPost"
        >
          <Box className="CreatePost" sx={style}>
            <h2>Create Post</h2>
            <hr />
            <textarea
              placeholder={`What's on your mind, ${user?user?.name:"User"}?`}
              style={{ resize: 'none' }}
              className="PostContent"
              value={caption}
              onChange={(e)=>{setCaption(e.target.value)}}
            />
            <br />
            <div className='fileInput'> 
            <input
              accept="image/*"
              className={'input'}
              id="icon-button-photo"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              type="file"
              onClick={()=> setFiletype("image")}
            />
            <label htmlFor="icon-button-photo">
              <PhotoLibraryIcon />
            </label>

            <input
              accept="video/*"
              className={'input'}
              id="icon-button-video"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              type="file"
              onClick={()=> setFiletype("video")}
            />
            <label htmlFor="icon-button-video">
              <VideocamIcon />
            </label>
            </div>

{
  Filetype === "image" ? avatar &&<div style={{width:"20%",margin:"auto"}}> <img style={{width:"80%",height:"10%"}} src={avatar} alt={avatar}/> </div>:
<div> 
  <p style={{textAlign:"center",width:"100%",margin:"0",fontSize:"1rem",fontWeight:"600"}}>
  Preview of video is not Available
  </p>
</div>
}

<Button style={{marginTop:"1vmax",width:"100%"}} variant="contained" onClick={sharePost}>Share Post</Button>

          </Box>
        </Modal>
      </div>

      {post.length === 0 ? (
        <div className="noPost">
          <TextSnippetSharpIcon />
          <br />
          <Typography>No Post Found</Typography>

          <br />
        </div>
      ) : (
        <>
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
                  <img src={item?.img} alt="postOwner" />
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
        </>
      )}
    </div>
  )
}

export default Home
