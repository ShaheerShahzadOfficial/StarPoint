import { Avatar, Box, IconButton, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteComment, Like } from '../../Redux/Actions/Post'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { LIKE_AND_UNLIKE_POST_RESET } from '../../Redux/Constant'
import { getUsersProfile } from '../../Redux/Actions/User'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';


const UserPost = ({item,User}) => {
    const dispatch = useDispatch()

const {id} = useParams()

    const [LikedPost, setLikedPost] = useState(false)
    const [comment, setComment] = useState("")

    const { user } = useSelector(state => state.Auth)
    const { message } = useSelector(state => state.like)
  
  
    useEffect(() => {
  
      if (message === 'Post Unliked') {
        setLikedPost(false)
      }
  
      if (message !== null) {
       dispatch(getUsersProfile(id))
        dispatch({
          type: LIKE_AND_UNLIKE_POST_RESET
        })
      }
  
    }, [dispatch, id, message])
  
  
    useEffect(() => {
        item?.likes.forEach(items => {
        if (items === user?._id) {
          setLikedPost(true)
        }
      })
      
    }, [user?._id, item?.likes, item])
    
      
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "66%",
      bgcolor: 'white',
      boxShadow: 24,
      border:"2px solid transparent",
      maxHeight:"80vh",
      overflowY:"auto",
         p: 4,
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
    return (
      <div className='post'>
        <div className='postHeader'>
          <Link to={`/user/${User?._id}`}>
            <Avatar
              src={User?.avatar?.url}
              alt='User'
              className='avatar'
              sx={{
                width: '10vh',
                height: '10vh',
                marginLeft: '1vmax',
                marginRight: '1vmax',
                zIndex: 1
              }}
            />
            <h3>{User?.name}</h3>
          </Link>
        </div>
        <div className='postBody'>
          {/* Caption */} <p>{item?.caption }</p>
          <img src={item?.files?.url} alt={item?.files?.url} />
        </div>
        <div className='postFooter'>
          <p>{item?.likes?.length} Likes</p>
          <p>{item?.comments?.length} Comments</p>
          <hr className='new' />
  
            {LikedPost === true ? (
              <FavoriteIcon onClick={() => dispatch(Like(item?._id))}/>
            ) : (
              <FavoriteBorderOutlinedIcon onClick={() => dispatch(Like(item?._id))}/>
            )}
  
            <QuestionAnswerOutlinedIcon  onClick={handleClickOpen}/>
        </div>


        <Modal
  open={open}
  onClose={handleClose}
  sx={{width:"100%",margin:"auto",outline:"none",border:"transparent"}}
  aria-labelledby="Comments Section"
  aria-describedby="Post Comments"
  className={"modal"}
>
  <Box sx={style}>

<div className='addComment'>
    <textarea placeholder='Write a comment ...' required value={comment} onChange={(e)=>setComment(e.target.value
      )} className='PostContent' style={{ resize: 'none' }}/>
<SendIcon color='primary' onClick={()=> 

{   if (comment !== "") {
        setComment("")
        dispatch(addComment(item._id,comment))
      }else{
        swal({text:"comment are required"})
      }
}}
      
      />
            </div>
<br />
            {
  item?.comments.length === 0 ?<div> <QuestionAnswerIcon sx={{fontSize:"10vmax",color:"rgb(132, 19, 19)",width:"100%",margin:"auto"}} /> <h3 style={{color:"rgb(132, 19, 19)",width:"100%",textAlign:"center"}} >Be the first to comment</h3> </div>
  : <div className='commentContainer'>
    
    {
     item?.comments?.map((items,i)=>(
      
      <div className='comment' key={i}> 
        <div className='commentCard'>
        <div className='CommentHeader'>
        <Link to={`/user/${items?.user?._id}`}>
                  <Avatar
                    src={
                      items?.user?.avatar?.url
                    }
                    alt={items?.user?.avatar?.public_id}
                    className='avatar'
                    sx={{
                      width: '6vh',
                      height: '6vh',
                      marginLeft: '1vmax',
                      marginRight: '1vmax',
                      zIndex: 1
                    }}
                  />
                  <h3>{items?.user?.name}</h3>
        </Link>
     { items?.user?._id === user?._id ?  <DeleteForeverIcon onClick={()=>{dispatch(deleteComment(item._id,items._id))}}/> : null }
        </div>
        <div  className="CommentBody">
            <p>{items?.comment}</p>
        </div>
        </div>

        </div>
      
      
      ))
    }
    


</div>
} 




  </Box>




</Modal>



      </div>
    )
  }
  

export default UserPost