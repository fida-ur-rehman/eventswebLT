import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import Marker from '../../utils/Marker/Marker'
import GoogleMapReact from 'google-map-react';
import {regionFrom} from '../../utils/deltaCalculator'
import "./MyAccount.scss"
import Alert from '@mui/material/Alert'
import OwnMarker from '../../utils/Marker/OwnMarker';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import axios from 'axios'
import {storeUserInfo,setUser,deleteUser} from '../../redux/user/userActions'
import {connect} from 'react-redux'
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import profile from '../../../Images/profile.png'
import GradingIcon from '@mui/icons-material/Grading';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import storageSession from 'redux-persist/lib/storage/session'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditFormDialogue from '../../utils/EditFormDialogue'
import Footer from '../../Footer/Footer'

function MyAccount(props) {
    const [display,setDisplay]=React.useState(false)
    const [open,setOpen]=React.useState(false)
    //const [location,setLocation]=React.useState({center:{lat:59.95,lng:30.33},zoom:11})
    let userInfo =props.userInfo;

    const getUser = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/single-user`,{headers:{token:props.userToken}})
            .then(res=>{
                console.log(res)
                if(res.data.result.img){
                //setImageLink(res.data.result.img)
                }
                
                props.storeUserInfo(res.data.result)
                })
                .catch(err=>{
                    console.log(err)
                })
    }

    React.useEffect(() => {
        getUser()
    },[])
    const handleLogout = ()=>{
        props.deleteUser()
        //window.sessionStorage.clear()
        //storageSession.removeItem('socket')
        props.history.push("/")

    }


    const renderEmail = (email)=>{

    }

    return (
        <div className="row myaccountdiv">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={6} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="  " onClick={()=>setDisplay(false)}>
        <EditFormDialogue getUser={getUser} open={open} setOpen={setOpen} />

        <div className="shadow-sm profile-container">
            {userInfo.img?<img className='profile' src={`${process.env.REACT_APP_DEVELOPMENT}/api/user/image/${userInfo.img}`} alt="img" />:<img className='profile' src={profile} alt="profile" />}
            <h1>Hi, {userInfo.name}</h1>
            <div className="row m-auto justify-content-between">
                <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 infodiv">
                <p className="key">Name</p>
                <p className="value">{userInfo.name}</p>
                </div>

                <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 infodiv">
                    <p className="key">Mobile</p>
                    <p className="value">{userInfo.mobileNo}</p>
                </div>

                <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 infodiv">
                    <p className="key">Email</p>
                    {
                        userInfo.email.split("@").map((item,index)=><p className="value" style={{fontSize:"90%"}} >{item}{index===0&&"@"}</p>)
                    }
                    
                </div>

                <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 infodiv">
                    <p className="key">Organisation</p>
                    <p className="value">{userInfo.organisation}</p>
                </div>

                <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 infodiv">
                    <p className="key">City</p>
                    <p className="value">{userInfo.city}</p>
                </div>

                <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 infodiv">
                    <p className="key">Address</p>
                    <p className="value">{userInfo.address}</p>
                </div>
            </div>

            <div className="linkscontainer">
                <hr />
                <div onClick={()=>props.history.push("/myapprovals")} className="row m-auto justify-content-between">
                    <h3>My Approvals</h3>
                    <ArrowForwardIosIcon />
                </div>
                <hr />
                <div onClick={()=>props.history.push("/mygroups")} className="row m-auto justify-content-between">
                    <h3>My Groups</h3>
                    <ArrowForwardIosIcon />
                </div>
                <hr />
                <div  onClick={()=>props.history.push("/myservices")} className="row m-auto justify-content-between">
                    <h3>My Services</h3>
                    <ArrowForwardIosIcon />
                </div>
                <hr />
                <div onClick={()=>props.history.push("/findvendors")} className="row m-auto justify-content-between">
                    <h3>Find Vendors</h3>
                    <ArrowForwardIosIcon />
                </div>
            </div>
            <div style={{textAlign:"center"}}>
        <Button onClick={()=>handleLogout()} className="logoutbutton" variant="contained">Logout <LogoutIcon sx={{marginLeft:1}} /></Button>
        </div>

        </div>
        
        {/* <div className="shadow-sm row align-items-center profilediv">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 imagediv">
        {userInfo.img?<img src={`${process.env.REACT_APP_DEVELOPMENT}/api/user/image/${userInfo.img}`} alt="img" />:<img src={profile} alt="profile" />}
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 infodiv ">
        <h2 className="name"><PersonOutlineTwoToneIcon /> {userInfo.name}</h2>  
        <p className="mobile"><LocalPhoneTwoToneIcon /> {userInfo.mobileNo}</p>      
        <p className="email"><EmailTwoToneIcon /> {userInfo.email}</p>
        <p className="organisation"><BusinessTwoToneIcon /> {userInfo.organisation}</p>
        <p className="city"><HomeTwoToneIcon /> {userInfo.city}</p>
        <p className="address"><HomeTwoToneIcon /> {userInfo.address}</p>
        </div>
        </div>
        
        <div className="row justify-content-between approvaldiv">
        <div onClick={()=>props.history.push("/myapprovals")} className="row shadow-sm align-items-center col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 cardiv">
            <GradingIcon className="cardIcon" />
            <p className="cardheading">My Approvals</p>
        </div>
        <div onClick={()=>props.history.push("/myservices")} className="row shadow-sm align-items-center col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 cardiv">
            <HomeRepairServiceIcon className="cardIcon" />
            <p className="cardheading">My Services</p>
        </div>
        </div>


        <div className="row justify-content-between approvaldiv">
        <div onClick={()=>props.history.push("/mygroups")} className="row shadow-sm align-items-center col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 cardiv">
            <GroupsIcon className="cardIcon" />
            <p className="cardheading">My Groups</p>
        </div>
        <div onClick={()=>props.history.push("/findvendors")} className="row shadow-sm align-items-center col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 cardiv">
            <PersonSearchIcon className="cardIcon" />
            <p className="cardheading">Find Vendors</p>
        </div>
        </div>
        <div className="logoutbuttondiv">
        <Button onClick={()=>handleLogout()} className="logoutbutton" variant="contained">Logout <LogoutIcon sx={{marginLeft:1}} /></Button>
        </div> */}


        <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Edit Profile">
              <Fab onClick={()=>setOpen(true)} color="primary" aria-label="add">
                <EditRoundedIcon />
              </Fab>
              </Tooltip>
        </div>
            {/* end of block */}
        </div>
        </div>
    </div>
    )
}
const mapDispatchToProps =(dispatch)=>{
    return {
      storeUserInfo:(info)=>dispatch(storeUserInfo(info)),
      deleteUser:()=>dispatch(deleteUser())
    }
  }
  
  const mapStateToProps =({EventUser})=>{
  return {
      userToken:EventUser.user,
      userInfo:EventUser.userInfo
  }
  }
  

export default connect(mapStateToProps,mapDispatchToProps)(MyAccount)
