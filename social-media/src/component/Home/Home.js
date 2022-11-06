import './home.css'
import React, { Fragment, useEffect, useState } from 'react'
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp'
import { Avatar, Box, Button, Modal, Typography } from '@mui/material'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import { CreatePost, getPostOfFollowing } from '../../Redux/Actions/Post'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import { LoadUser } from '../../Redux/Actions/Auth'
import { CREATE_POST_RESET } from '../../Redux/Constant'
import PostCard from "../Post/PostCard"

const Home = () => {
  const [Open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [Filetype, setFiletype] = useState('')
  const [caption, setCaption] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useDispatch()
  const {user} = useSelector(state => state?.Auth)
  const { success } = useSelector(state => state.post)
  const {post,loading} = useSelector(state => state.userPost)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid transparent',
    boxShadow: 24,
    p: 3
  }

  useEffect(() => {
    if (success === true) {
      swal({ text: 'Post Has been Created', icon: 'success' })
      setOpen(false)
      setAvatar('')
      setCaption('')
      dispatch({
        type: CREATE_POST_RESET
      })
      dispatch(LoadUser())
    }

    dispatch(getPostOfFollowing())
  }, [dispatch, success])


  const handleImageChange = e => {
    const file = e.target.files[0]

    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result)
      }
    }
  }

  const sharePost = () => {
    if (caption !== "" && avatar!=="") {
      dispatch(CreatePost(caption, avatar))
    } else {
      swal("Caption And Picture Are Required")
    }
  }


  return (
    <Fragment>

{
  loading ? <div className="loaderContainer">
    <div className="loader">Loading ...</div>
  </div> :
    <div className='home'>
      <div className='AddPost'>
        <Avatar
          src={user?.avatar?.url}
          alt={user?.avatar?.public_id}
          className='avatar'
          sx={{
            height: '8vh',
            width: '8vh',
            marginTop: '1vh',
            marginBottom: '1vh',
            marginLeft: '1vmax',
            marginRight: '1vmax',
            zIndex: 1
          }}
        />
        <button onClick={handleOpen}>{`What's on your mind, ${
          user ? user?.name : 'User'
        }?`}</button>

        <Modal
          open={Open}
          onClose={handleClose}
          aria-labelledby='CreatePost'
          aria-describedby='AddPost'
        >
          <Box className='CreatePost' sx={style}>
            <h2>Create Post</h2>
            <hr />
            <textarea
              placeholder={`What's on your mind, ${
                user ? user?.name : 'User'
              }?`}
              style={{ resize: 'none' }}
              className='PostContent'
              value={caption}
              onChange={e => {
                setCaption(e.target.value)
              }}
            />
            <br />
            <div className='fileInput'>
              <input
                accept='image/*'
                className={'input'}
                id='icon-button-photo'
                onChange={handleImageChange}
                style={{ display: 'none' }}
                type='file'
                onClick={() => setFiletype('image')}
              />
              <label htmlFor='icon-button-photo'>
                <PhotoLibraryIcon sx={{fontSize:"4vmax"}} />
              </label>
                          </div>

            {Filetype === 'image' ? (
              avatar && (
                <div style={{ width: '50%', margin: 'auto' }}>
                  {' '}
                  <img
                    style={{ width: '100%', height: '20%' }}
                    src={avatar}
                    alt={avatar}
                  />{' '}
                </div>
              )
            ) : (
              <div>
             
              </div>
            )}

            <Button
              style={{ marginTop: '1vmax', width: '100%' }}
              variant='contained'
              onClick={sharePost}
            >
              Share Post
            </Button>
          </Box>
        </Modal>
      </div>

      {post?.length === 0 ? (
        <div className='noPost'>
          <TextSnippetSharpIcon />
          <br />
          <Typography>No Post Found</Typography>

          <br />
        </div>
      ) : (
        <>
          <div className='postContainer'>
            {post?.map((item, i) => (
<PostCard
key={i}
item={item}
/>
            ))}
          </div>
        </>
      )}
    </div>}
    </Fragment>
  )
}

export default Home
