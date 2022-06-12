import React from 'react'

function ChatDetailT(props) {
    const [message,setMessage]=React.useState("")
    const [newMessages,setNewMessages]=React.useState([])
    React.useEffect(()=>{
        props.socket.on("receive_message", (msg) => {
            console.log("messagesrecived",msg);
            // props.socket.emit('seen_msg', msg, props.EventUser.userInfo._id)
            setNewMessages([...newMessages,msg]);
            setMessage("")
          });
          
        // return ()=>{
        //      props.socket.emit("leave_room", props.room)
        // }
    },[props.socket,newMessages])
    console.log("cnew messsages",newMessages);
    const handleSubmit = async ()=>{
        if (message !== "") {

            const messageData = {
              room: props.room,
              sender: props.username,
              text: message,
            };
      
            await props.socket.emit("send_message", messageData);
            // setMessageList((list) => [...list, messageData]);
            // console.log(messageList,"____________________")
            setMessage("");
          }
    }

    return (
        <div>
            chat details
            {
            props.messages.length>0?(
                props.messages.map((item,index)=>(
                    <div style={{backgroundColor:"#f7f7f7"}} key={index}>
                        <div>
                            {item.text}
                        </div>
                    </div>
                ))
            ):null
            }

            {
                newMessages.length>0?(
                    newMessages.map((e,index)=>(
                        <div style={{backgroundColor:"#fa2314"}} key={index}>
                            {e.text}
                        </div>
                    ))
                ):null
            }


            <input 
            placeholder="Enter Message"
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
            />
            <button onClick={()=>handleSubmit()} type="submit">Submit</button>

        </div>
    )
}

export default ChatDetailT
