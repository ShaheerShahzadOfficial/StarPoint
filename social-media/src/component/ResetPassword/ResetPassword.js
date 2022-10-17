import "./resetPassword.css"
import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ResetPasswordUser } from "../../Redux/Actions/Auth"
import swal from "sweetalert"
import { RESET_PASSWORD_EMAIL_RESET } from "../../Redux/Constant"

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {token} = useParams()

    const { loading,error ,isUpdated} = useSelector(
        (state) => state?.Auth,
      )
      const dispatch = useDispatch()

      useEffect(() => {
        console.log(error)
        if (error?.msg === "Reset Password Token is invalid or it has been Expired null") {
            swal({text:"Token Has been Expired",icon:"error"})
        dispatch({
            type:RESET_PASSWORD_EMAIL_RESET
        })
        }

        if (isUpdated?.message === "Password has been Change") {
          swal("Success", `Password has been Change`, "success")
        }

        setNewPassword("")
        setConfirmPassword("")

      }, [dispatch, error, isUpdated?.message])
      
    
      const resetPassword = ()=>{
        if(newPassword !== "" && confirmPassword !== ""){
        if (newPassword === confirmPassword) {
          dispatch(ResetPasswordUser(token, newPassword,confirmPassword))
        } else {
          swal({text:"Password and Confirm Password must be same",icon:"error"})
        }
        }else{
          swal({text:"Password and Confirm Password are Required",icon:"error"})
        } 
    }

  return (
<div className="ResetPassword">
  {
    loading?<div className="ResetPasswordContainer">loading ...</div>:<div className="ResetPasswordContainer">
    <Typography variant="h3" style={{ padding: "2vmax" , color:"#155799" }}>
    Reset Password
    </Typography>
        <input placeholder="New Password" value={confirmPassword}   onChange={(e)=>setConfirmPassword(e.target.value)}  type={"password"} />
        <input placeholder="Confirm Password" value={newPassword}  onChange={(e)=>setNewPassword(e.target.value)} type={"password"}/>
    
            <Button onClick={resetPassword}>Reset Password</Button>
       
    </div>
  }

</div>   )
}

export default ResetPassword