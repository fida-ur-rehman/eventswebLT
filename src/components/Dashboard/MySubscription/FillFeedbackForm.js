import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./FillFeedbackForm.scss"
import Button from '@mui/material/Button'
import axios from 'axios'
import {connect} from 'react-redux'

function FillFeedbackForm(props) {
    const [display,setDisplay]=React.useState(false)
    const [userData,setUserData]=React.useState({})
    console.log(userData);

    let formdata= props.location.state
    React.useEffect(()=>{
    //     let obj = {}
    //    if(formdata.length>0){
    //        formdata[0].formData.map((item,index)=>{
    //         obj[index+1]
    //        })
    //    }
    },[])
    const handleSubmit  = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/eventForm/submit-eventForm`,{eventId:formdata[0].event, formData:userData },{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={2} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div onClick={()=>setDisplay(false)}>
        fill feedback

        {
            formdata.length>0?(
                formdata[0].formData.map((item,index)=>(
        <FormGroup key={index}>
    {item.input===1?<TextField onChange={(e)=>{
        userData[index+1]=e.target.value;
        setUserData({...userData})
    }} id="outlined-basic" label={item.label} variant="outlined" />:
      <FormControlLabel control={<Checkbox onChange={(e,val)=>{
        userData[index+1]=val;
        setUserData({...userData})
      }} defaultChecked />} label={item.label} />}
    </FormGroup>

                ))
            ):null
        }
        <Button onClick={()=>handleSubmit()}>Submit</Button>


            {/* end of block */}
        </div>
        </div>
    </div>
    )
}
const mapStateToProps =({EventUser})=>{
    return{
        user:EventUser
    }
}

export default connect(mapStateToProps)(FillFeedbackForm)
