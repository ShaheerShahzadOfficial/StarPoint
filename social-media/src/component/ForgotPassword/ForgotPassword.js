import "./forgotpassword.css"
import React, { useEffect, useState } from 'react'
import {Typography,Button} from "@mui/material"
import swal from "sweetalert"
import {useDispatch, useSelector} from "react-redux"
import { ForgotPasswordEmail } from "../../Redux/Actions/Auth"
import { FORGOT_PASSWORD_EMAIL_RESET } from "../../Redux/Constant"
const ForgotPassword = () => {
  const [email, setEmail] = useState("")
const dispatch = useDispatch()

const {error, loading,message } = useSelector((state) => state?.Auth)

useEffect(() => {
if (error?.msg === "User not found") {
  swal("Autentication Failed", "User Not Found", "error")

}
if (message?.msg===`Email sent to ${email}`) {
  swal("Success", `Email sent to ${email}`, "success")
  setEmail("")
dispatch({
  type:FORGOT_PASSWORD_EMAIL_RESET
})
}



}, [dispatch, email, error?.msg, message?.msg])


const sendEmail = () => {
if (email !== "") {
  dispatch(ForgotPasswordEmail(email))
}else{
  swal({text:"Enter Email First"})
}


  }

  return (
<div className="forgetPassword">
  {
    loading ? <div  className="forgetPasswordContainer">Loading ... </div> : <div className="forgetPasswordContainer">
    <Typography variant="h3" style={{ padding: "2vmax" , color:"#155799" }}>
      Social App
    </Typography>
        <input placeholder="Email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Button onClick={sendEmail} >Send Email</Button>
       
    </div>
  }

</div>  
)
}

export default ForgotPassword