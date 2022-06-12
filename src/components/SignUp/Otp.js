import React from 'react'
import {useForm} from 'react-hook-form'
import "./SignUp.scss"
import axios from 'axios'
import { setUser } from '../redux/user/userActions'
import {connect} from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SimpleBackdrop from '../utils/SimpleBackdrop'
import Alert from '@mui/material/Alert'
import {storeSocket} from '../redux/socket/socketActions'
import OtpInput from "react-otp-input";

//console.log(socket)
const Otp = (props) => {
    //console.log(props)
    const [open, setOpen] = React.useState(false);
    const [error,setErrorr]=React.useState("")
    const {register,handleSubmit,setError,formState:{errors}}=useForm()
    const [otpsep,setOtpsep]=React.useState("")
    const onSubmit = (data,e)=>{
        
        
    }
    const handleOtpChange = (e)=>{
        setOtpsep(e)
        if(e.length===6){
            setOpen(true)
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/auth/verifyOTP`,{phone:props.location.state.data.phone,otp:e,hash:props.location.state.data.hash})
                .then(res=>{
                    console.log(res);
                    setOpen(false)
                    if(res.data.result==="Incorrect"){
                        alert("Incorrect otp")
                    }
                    else if(res.data.msg!=="login"){
                        console.log(res.data.result); //token
                        //props.setUser(res.data.result)
                        props.history.push("addInfo",{token:res.data.result,curr:props.location.state.curr})
                    }else if(res.data.msg==="login"){
                        props.setUser(res.data.result)
                        //props.storeSocket(socket)
                        props.history.push("dashboard")
                    }
                })
                .catch(err=>{
                    console.log(err);
                    setOpen(false)
                    setErrorr("something went wrong")
                })
        }
    }
    console.log(errors)
    return (
        <div className="signupdiv">
            <SimpleBackdrop open={open} />
            <form className="shadow form" onSubmit = {handleSubmit(onSubmit)}>
            <h1>OTP</h1>
            <p className="authpara">Code is sent to <b>{props.location.state.data.phone}</b></p>
            <div className="" style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
            {/* {errors.otp?<TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter OTP" 
                variant="outlined" {...register('otp',{required:true})} 
                error
                helperText="Invalid OTP"
                 />:
                 <TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter OTP" 
                variant="outlined" {...register('otp',{required:true})} 
                
                 />
                 } */}
                   <OtpInput
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                value={otpsep}
                shouldAutoFocus
                onChange={handleOtpChange}
                numInputs={6}
                inputStyle={{
                  width: "3rem",
                  height: "4rem",
                  margin: "0 .8rem",
                  fontSize: "2rem",
                  borderRadius: 6,
                  border: "2px solid #cccf"
                }}
                focusStyle={{border:"2px solid #5a1e96"}}
              />
            </div>
            <p className="authpara2">didn't receive the code? <Button>resend</Button></p>
            <p>{props.location.state.data.otp}</p>

            
            {/* <Button type="submit" variant="contained" className="btn-purple">Verify OTP</Button> */}
            {
                error.length>0?<Alert sx={{margin:"3% 10%"}} severity="error">{error}</Alert>:null
            }
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:(user)=>dispatch(setUser(user)),
        storeSocket:(socket)=>dispatch(storeSocket(socket))
    }
}



export default connect(null,mapDispatchToProps)(Otp);