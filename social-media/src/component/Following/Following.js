import "../Home/home.css"
import { Avatar, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom';

const Following = ({followings,open=false,close=true}) => {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        bgcolor: 'white',
        boxShadow: 24,
        border:"2px solid transparent",
        maxHeight:"80vh",
        overflowY:"auto",
           p: 4,
      };
  return (

<Modal
open={open}
onClose={close}
aria-labelledby="Following"
aria-describedby="List Of Following"
className={"modal3"}
>
    <Box sx={style}>
  <Typography variant='h4' sx={{width:"90%",textAlign:"center",
textDecorationLine: "underline",
textDecorationStyle: "dashed"
}} >FOLLOWING</Typography>

<br />

<div className="following">

{
    followings?.map((item,i)=>(

<Link to={`/user/${item?._id}`}  key={i}>
                  <Avatar
                    src={
                        item?.avatar?.url
                    }
                    alt={item?.avatar?.public_id}
                    className='avatar'
                    sx={{
                      width: '8vh',
                      height: '8vh',
                      marginLeft: '1vmax',
                      marginRight: '1vmax',
                      zIndex: 1
                    }}
                  />
                  <h3>{item?.name}</h3>
        </Link>

    ))
}



</div>

    </Box>
</Modal>
  )
}

export default Following