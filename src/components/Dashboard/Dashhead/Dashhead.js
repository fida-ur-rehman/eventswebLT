import React from 'react'
import "./Dashhead.scss"
import {withRouter} from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Reports from '../Reports/Reports'
import Badge from '@mui/material/Badge';
import {connect} from 'react-redux'
const Dashhead = (props) => {
    console.log(props);
    let {id,display} = props
    return (
        
            
        <div className={display?"shadow-lg dashhead":'dashhead displayhidden'}>
            <h1>Events</h1>
            {id===1?<div className="menu-container-active">
                <p><HomeIcon /> Home</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('dashboard')} >
            <p><HomeOutlinedIcon /> Home</p>
            </div>
            }

            {id===2?<div className="menu-container-active">
                <p><NoteAddIcon /> My Creation</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('mycreation')}>
            <p><NoteAddOutlinedIcon /> My Creation</p>
            </div>
            }

            {id===3?<div className="menu-container-active">
                <p><EventAvailableIcon /> My Subscription</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('mysubscription')} >
            <p><EventAvailableOutlinedIcon /> My Subscription</p>
            </div>
            }

            {id===4?<div className="menu-container-active">
                <p><LocalAtmIcon /> My Bids</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('mybids')}>
            <p><LocalAtmIcon /> My Bids</p>
            </div>
            }

            {id===5?<div className="menu-container-active">
                <p>
                <Badge 
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            badgeContent={props.user.userInfo!==null?props.user.userInfo.conversationCount:0} color="primary">    
                <ChatIcon /> 
                </Badge> Chats</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('chats')}>
            <p>
            <Badge 
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            badgeContent={props.user.userInfo!==null?props.user.userInfo.conversationCount:0} color="primary">        
            <ChatOutlinedIcon /> 
            </Badge> Chats</p>
            </div>
            }

            {id===7?<div className="menu-container-active">
                <p>
                <Badge 
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            badgeContent={props.user.userInfo!==null?props.user.userInfo.reminderCount:0} color="primary">    
                <NotificationsRoundedIcon /> 
                </Badge>
                Reminders</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('/reminders')}>
            <p>
            <Badge 
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            badgeContent={props.user.userInfo!==null?props.user.userInfo.reminderCount:0} color="primary">
                <NotificationsNoneOutlinedIcon /> 
            </Badge>
            Reminders
                </p>
            </div>
            }

            {id===6?<div className="menu-container-active">
                <p><PersonIcon /> My Account</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('myaccount')}>
            <p><PersonOutlineOutlinedIcon /> My Account</p>
            </div>
            }

<Reports />

            
        </div>
    );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(withRouter(Dashhead));