import React from 'react'
import Button from '@mui/material/Button'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {connect} from 'react-redux'
import {updateSocket} from '../../redux/socket/socketActions'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FailureScreen from '../../utils/FailureScreen';
import UserInfoModal from './UserInfoModal'
import axios from 'axios'

function ChatDetailT(props) {
    const [message,setMessage]=React.useState("")
    const [newMessages,setNewMessages]=React.useState([])
    const [open,setOpen]=React.useState(false)
    const [organizerInfo,setOrganizerInfo]=React.useState({})
    console.log(props)
    React.useEffect(()=>{




        
      console.log("props of chat detail",props);
    if(props.organizerId.length>0){
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/organiser-event`,{organiserId:props.organizerId},{headers:{token:props.EventUser.user}})
        .then(res=>{
            console.log("organizerdi req",res)
            setOrganizerInfo(res.data.result)
        })
        .catch(err=>{
            console.log(err)
        })
    }


        
        props.socket.on("receive_message", (msg) => {
            console.log("messagesrecived",msg,props);
            //setNewMessages((prevMsg)=>[...prevMsg,msg]);
            console.log("propsmessages is",props.messages);
            props.updateSocket(msg)

          });
    },[props.socket,props.organizerId])
    const handleSubmit = async ()=>{
        if (message !== "") {

            const messageData = {
              room: props.room,
              sender: props.username,
              text: message,
              senderName:props.EventUser.userInfo.name
            };
      
            await props.socket.emit("send_message", messageData);
            // setMessageList((list) => [...list, messageData]);
            // console.log(messageList,"____________________")
            setMessage("");
          }
    }

    return (
        <div className="chat-detail">
            <UserInfoModal organizerInfo={organizerInfo} open={open} setOpen={setOpen} />
            {props.name!==""?<div>
            <div className="cursor-pointer header" onClick={()=>setOpen(true)}>
                <h2>{props.name}</h2>
            </div>
            {/* user chats */}
            
            <div className="userchats">
        {
            props.messages.length>0?(
                props.messages.map((item,index)=>(
                    <div className={index===0?"mt-5 mb-5":"mb-3"}  key={index}>
                    <div className={item.sender===props.EventUser.userInfo._id?"mychat":"senderchat"}>
                    <p className="textcontainer">{item.text}</p>
                    </div>
                    {props.type.toLowerCase()==="group"&&<p className={item.sender===props.EventUser.userInfo._id?"myname":"sendername"}>{item.senderName?item.senderName:""}</p>}
                    </div>
                ))
            ):null
        }
          {/* {
           newMessages.length>0?(
               newMessages.map((item,index)=>(
                <div key={index} className={item.sender===props.EventUser.userInfo._id?"mychat":"senderchat"}>
                <span>{item.text}</span>
                
                </div>
                ))
            ):null
        } */}

    </div>

      {/* user chats */}

            <div className="input-div">
            <input 
            placeholder="Enter Message"
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
            onKeyPress={(e)=>e.key==="Enter" && handleSubmit()}
            />
            <Button 
            endIcon={<SendRoundedIcon />}
            onClick={()=>handleSubmit()} type="submit">send</Button>
            </div>

        </div>:<FailureScreen icon={<SmsOutlinedIcon sx={{fontSize:"4em"}} color="primary" />} title="You don't have any conversations" />
       }
        </div>
    )
}
const mapStateToProps = ({socket,EventUser})=>{
    return {
        EventUser,
        messages:socket.messages
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateSocket:(messages)=>dispatch(updateSocket(messages))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChatDetailT)
