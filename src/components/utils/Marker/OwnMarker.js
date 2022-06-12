import React from 'react'
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import "./Marker.scss"
import Tooltip from '@mui/material/Tooltip';
function OwnMarker({text}) {
    return (
        <div className="parentmarker">
             <Tooltip title={text}>
            <PersonPinCircleRoundedIcon sx={{fontSize:'3.5em',color:"red"}} />
            </Tooltip>
        </div>
    )
}

export default OwnMarker
