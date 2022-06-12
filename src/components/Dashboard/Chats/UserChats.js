import React from 'react'
import "./Chats.scss"
import {connect} from 'react-redux'

function UserChats(props) {
    console.log("props of user chats",props);
    React.useEffect(()=>{

    },[props.newMessages])
    return (
        <div className="userchats">
        


            {
                props.messages.length>0?(
                    props.messages.map((item,index)=>(
                        <div key={index} className={item.sender===props.EventUser.userInfo._id?"mychat":"senderchat"}>
                        <span>{item.text}</span>
                        {props.messages.length===index+1?<div style={{marginBottom:"10%"}} />:null}
                        {index===0?<div style={{marginTop:"10%"}} />:null}
                        </div>
                    ))
                ):null
            }
              {
                props.newMessages.length>0?(
                    props.newMessages.map((e,index)=>(
                        <div className='mychat' key={index}>
                            {e.text}
                        </div>
                    ))
                ):null
            }

        </div>
    )
}
const mapStateToProps = ({socket,EventUser})=>{
    return {
        EventUser
    }
}

export default connect(mapStateToProps)(UserChats)
