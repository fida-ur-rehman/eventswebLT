import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import "./SignUp.scss"
import axios from 'axios'
import { setUser } from '../redux/user/userActions'
import {connect} from 'react-redux'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SimpleBackdrop from '../utils/SimpleBackdrop'
import Alert from '@mui/material/Alert'
const AddInfo = (props) => {
    console.log(props)
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [open,setOpen]=React.useState(false)
    const [error,setError]=React.useState("")
    const onSubmit = (data,e)=>{
        setOpen(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/edit-user`,[
            {"propName" : "name", "value": data.name},
            {"propName" : "email", "value": data.email},
            {"propName" : "organisation", "value": data.organisation},
            {"propName" : "address", "value": data.address},
            {"propName" : "city", "value": data.city},
            {"propName" : "curr", "value": props.location.state.curr}
          
          ],{headers:{'token':props.location.state.token}})
          .then(res=>{
            console.log(res);
            setOpen(false)
            if(res.data.msg==='Success'){
                props.setUser(props.location.state.token)
              props.history.push('dashboard')
            }
          })
          .catch(err=>{
              setOpen(false)
              setError("something went wrong")
            console.log(err)
          })
    }
    return (
        <div className="signupdiv">
            <SimpleBackdrop open={open} />
            <form className="shadow form" onSubmit = {handleSubmit(onSubmit)}>
            <h1>Add Info</h1>
            <div className="start addinfoinputdiv ">
               {!errors.name ?<TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Name" 
                variant="outlined" {...register('name',{required:true})} 
                
                 />:
                 <TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Name" 
                variant="outlined" {...register('name',{required:true})} 
                error
                helperText="Name is required"
                 />
                 }
            </div>

            <div className="start addinfoinputdiv ">
            {!errors.email?<TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Email" 
                variant="outlined" {...register('email',{required:true})} 
                
                 />:
                 <TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Email" 
                variant="outlined" {...register('email',{required:true})} 
                error
                helperText="Email is required"
                 />
                 }
            </div>

            <div className="start addinfoinputdiv ">
                {!errors.organisation?<TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Organization" 
                variant="outlined" {...register('organisation',{required:true})} 
                
                 />:
                 <TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Organization" 
                variant="outlined" {...register('organisation',{required:true})} 
                helperText="Organization is required"
                error
                 />
                 }
            </div>

            <div className="start addinfoinputdiv ">
                {!errors.address?<TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Address" 
                variant="outlined" {...register('address',{required:true})} 
                
                 />:
                 <TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter Address" 
                variant="outlined" {...register('address',{required:true})} 
                helperText="Address is required"
                error
                 />
                 }
            </div>

            <div className="start addinfoinputdiv ">
                {!errors.city?<TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter City" 
                variant="outlined" {...register('city',{required:true})} 
                
                 />:
                 <TextField 
                sx={{width:"100%"}}
                id="outlined-basic" 
                label="Enter City" 
                variant="outlined" {...register('city',{required:true})} 
                helperText="city is required"
                error
                 />
                 }
            </div>

            <Button type="submit" variant="contained" className="btn-purple">Sign Up</Button>
            {
                error.length>0?<Alert sx={{margin:"3% 10%"}} severity="error">{error}</Alert>:null
            }
            </form>
        </div>
    );
}

const mapStateToProps=({EventUser})=>{
    return {
        user:EventUser.user
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:(user)=>dispatch(setUser(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddInfo);