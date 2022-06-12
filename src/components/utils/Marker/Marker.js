import React from 'react'
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import "./Marker.scss"
import Tooltip from '@mui/material/Tooltip';
function Marker({text}) {
    return (
        <div className="parentmarker">
             <Tooltip title={text}>
            <RoomRoundedIcon sx={{fontSize:'2.5em',color:"#5a1e96"}} />
            </Tooltip>
        </div>
    )
}

export default Marker
