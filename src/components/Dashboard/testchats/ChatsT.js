import React from 'react'
import {connect} from 'react-redux'
import ChatDetailT from './ChatDetailT';
import axios from 'axios'
import Button from '@mui/material/Button'
import io from 'socket.io-client'
const  socket = io.connect(process.env.REACT_APP_DEVELOPMENT)
function ChatsT(props) {
    const [chatList,setChatList]=React.useState([])
    const [room, setRoom] = React.useState("");
    const [messages,setMessages]= React.useState([])
    const [username,setUsername]=React.useState("")
    const [counts,setCount]=React.useState(false)


    React.useEffect(()=>{
        socket.emit("event_connect",props.EventUser.userInfo._id)
          axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/conv/user-con`, {headers: {token: props.EventUser.user}})
            .then(async response =>  {
                console.log(response.data.result)
                setChatList(response.data.result)
                let localchatList = response.data.result
                await socket.on("count",(conversationId)=>{
                    //setCount(conversationId)
                    console.log("inside couujuuuuuuuuuuuuuuuuuuuuuunt");
                    let index = 0
                    let ar = localchatList.filter((item,indexC)=>{
                        if(item._id===conversationId){
                            index=indexC
                        }
                        return item._id===conversationId
                        
                    })
                    console.log("aris",ar);
                    if(ar.length>0){
                        let count = -ar[0].unseen
                        count = count+1
                        console.log("countis",count,index);
                        localchatList[index].unseen=-count;
                    console.log("localchatlist",localchatList);
                        setChatList(localchatList)
                        setCount(!counts)
                    }else{
                        console.log("chatlist is mpy");
                    }
        
                })
            });

    },[socket,counts])


    
    const joinRoom = async (item)=>{
        if(room!==""){
            await socket.emit("leave_room", room)
        }

            await socket.emit("join_room", item._id, props.EventUser.userInfo._id, item.unseenMsg);
            setRoom(item._id)
            setUsername(props.EventUser.userInfo._id)
            await socket.on("all-msg", async (data) => {
            //    await socket.emit("seen_msg", item.unseen, item._id);
              //console.log(data)
              setMessages(data);
            });
        
        
    }
    



    
    const renderName = (item)=>{
        if(item.name.length===1){
            return item.name[0]
        }else{
          let name = item.name.filter(e=>e.userId!==props.EventUser.userInfo._id)
          return name[0].name
        }
    }
    return (
        <div className="row">
            <div className="col-4">
            <h1>Coversations</h1>
            {
                chatList.map((item,index)=>(
                    <div key={index} className="row">
                        <Button onClick={()=>joinRoom(item)} variant="text" className="nameheading">{renderName(item)}</Button>
                        <p>{-item.unseen}</p>
                    </div>
                ))
            }
            </div>
            <div className="col-8">
            <ChatDetailT username={username} room={room} messages={messages} setMessages={setMessages} socket={socket} />
            </div>
        </div>
    )
}
const mapStateToProps = ({EventUser})=>{
    return {
        EventUser
    }
}

export default connect(mapStateToProps)(ChatsT)
