import React from 'react'
// import Alert from '@mui/material/Alert';
import TextSnippetSharpIcon from '@mui/icons-material/TextSnippetSharp'
import { Avatar, Typography } from '@mui/material'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import CommentIcon from '@mui/icons-material/Comment'

const Video = () => {
  const post = [
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
    {
      ownerIcon:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTu5KbCBza-W8QilheYFFRNax0xbNnp13kTqmg_KE8w&s',
      caption: 'Vector Icons',
      video:
        'https://res.cloudinary.com/shaheerdev/video/upload/v1665423508/SocialApp/project_bnhkq2.mp4',
      name: 'Shaheer',
      Likes: 10,
      Comments: 4,
    },
  ]
  return (
    <div className="home">
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
                  <video controls controlsList="nodownload">
                    <source src={item?.video} />
                  </video>
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

export default Video
