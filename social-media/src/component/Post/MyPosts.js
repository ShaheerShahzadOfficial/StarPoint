import { Avatar, Box, Button, Modal} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteComment, DeletePost, Like, MyPost, updateCaption } from '../../Redux/Actions/Post'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { DELETE_POST_RESET, LIKE_AND_UNLIKE_POST_RESET, UPDATE_POST_RESET } from '../../Redux/Constant'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';
import swal from 'sweetalert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const MyPosts = ({item}) => {

    const dispatch = useDispatch()
 
        const [LikedPost, setLikedPost] = useState(false)
        const [comment, setComment] = useState("")

        const { user } = useSelector(state => state.Auth)
        const { message } = useSelector(state => state.like)
        const {isDeleted,isUpdated} = useSelector((state)=>state.post)

      
useEffect(() => {
  if (isDeleted) {
    dispatch({type:DELETE_POST_RESET})
    dispatch(MyPost())
  }
  if (isUpdated) {
    dispatch({type:UPDATE_POST_RESET})
    dispatch(MyPost())
  }

}, [dispatch, isDeleted, isUpdated])


        useEffect(() => {
      
          if (message === 'Post Unliked') {
            setLikedPost(false)
          }
      
          if (message !== null) {
           dispatch(MyPost())
            dispatch({
              type: LIKE_AND_UNLIKE_POST_RESET
            })
          }
      
         
        }, [dispatch, message, user._id,isDeleted])
      
      
        useEffect(() => {
            item?.likes?.forEach(items => {
            if (items._id === user?._id) {
              setLikedPost(true)
            }
              })
          
        }, [user?._id, item?.likes, item])
        


        const [captionToggle, setCaptionToggle] = useState(false);
        const [menuToggle, setMenuToggle] = useState(false);
        const [captionValue, setCaptionValue] = useState("");
        

        const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };



    
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
  




        return (
          <div className='post'>
            <div className='postHeader'>
              <Link to={`/user/${user?._id}`}>
                <Avatar
                  src={user?.avatar?.url}
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
                <h3>{user?.name}</h3>
              </Link>

<MoreVertIcon onClick={() => setMenuToggle(!menuToggle)}/>

            </div>
            <div className='postBody'>
              {/* Caption */} <p>{item?.caption}</p>
              <img src={item?.files?.url} alt={item?.files?.url} />
            </div>
            <div className='postFooter'>
              <p>{item?.likes?.length} Likes</p>
              <p>{item?.comments?.length} Comments</p>
              <hr className='new' />
      
                {LikedPost === true ? (
                  <FavoriteIcon  onClick={() => dispatch(Like(item?._id))}/>  
                ) : (
                  <FavoriteBorderOutlinedIcon  onClick={() => dispatch(Like(item?._id))}/>
                )}
      
                <QuestionAnswerOutlinedIcon onClick={handleClickOpen}/>
            </div>




            <Modal  open={menuToggle}
        onClose={() => setMenuToggle(!menuToggle)} >
        <div className='btnContainer' >

            <Button type="submit" sx={{width:"100%"}} variant="contained"  onClick={() =>{ setCaptionToggle(!captionToggle) ; setMenuToggle(!menuToggle) ;setCaptionValue(item?.caption)} }>
              Update Caption
            </Button>
<br />
<br />

            <Button type="submit" sx={{width:"100%"}} color='error' variant="contained" onClick={()=> {dispatch(DeletePost(item._id));setMenuToggle(!menuToggle)}}>
              Delete Post
            </Button>
        </div>
      </Modal>


            <Modal
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
<div className='captionUpdate' >

          <form className="commentForm" onSubmit={(e)=>{
            e.preventDefault()
             dispatch(updateCaption(item?._id,captionValue));
             dispatch(MyPost());
             setCaptionToggle(!captionToggle);
          }}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update Caption
            </Button>
          </form>
        </div>
      </Modal>



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
      item?.comments?.map((comment,i)=>(
      
      <div className='comment' key={i}> 
        <div className='commentCard'>
        <div className='CommentHeader'>
        <Link to={`/user/${comment?.user?._id}`}>
                  <Avatar
                    src={
                      comment?.user?.avatar?.url
                    }
                    alt={comment?.user?.avatar?.public_id}
                    className='avatar'
                    sx={{
                      width: '6vh',
                      height: '6vh',
                      marginLeft: '1vmax',
                      marginRight: '1vmax',
                      zIndex: 1
                    }}
                  />
                  <h3>{comment?.user?.name}</h3>
        </Link>
     { comment?.user?._id === user?._id ?  <DeleteForeverIcon onClick={()=>{dispatch(deleteComment(item._id,comment._id))}}/> : null }
        </div>
        <div  className="CommentBody">
            <p>{comment?.comment}</p>
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

export default MyPosts