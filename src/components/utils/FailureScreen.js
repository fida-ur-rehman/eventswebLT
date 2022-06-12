import React from 'react'

function FailureScreen(props) {
    return (
        <div>
        <div className="no-chat-detail-container">
        <div>
        <div style={{textAlign:"center"}}>
        {
            props.icon
        }
        </div>
        <h1>{props.title}</h1>
        </div>
        </div>
        </div>
    )
}

export default FailureScreen
