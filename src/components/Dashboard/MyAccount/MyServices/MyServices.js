import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../../Dashhead/Dashhead'
import {connect} from 'react-redux'
import "./MyServices.scss"
import axios from 'axios'
import TwoBDialog from '../../../utils/TwoBDialog'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FailureScreen from '../../../utils/FailureScreen'
import ExtensionOffOutlinedIcon from '@mui/icons-material/ExtensionOffOutlined';
import {renderNormalDate} from '../../../utils/renderDate'

function MyServices(props) {
    const [display,setDisplay]=React.useState(false)
    const [services,setServices]=React.useState([])
    const [id,setId]=React.useState("")
    const [open,setOpen]=React.useState(false)
    const [flag,setFlag]=React.useState(false)
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/service/user-service`,{headers:{token:props.EventUser.user}})
        .then(res=>{
            if(res.data.result.length>0){
                setServices(res.data.result)
            }else{
                setServices([])
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[flag])
    const handleSubmit = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/delete-service`,{serviceId:id},{headers:{token:props.EventUser.user}})
        .then(res=>{
          if(res.data.msg==="Success"){
            setOpen(false)
            setFlag(!flag)
          }
         
        })
        .catch(err=>{
          console.log(err)
        })

    }
    console.log(services,open,id);
    return (
        <div className="row">
       
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={6} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="my-services" onClick={()=>setDisplay(false)}>
        <TwoBDialog title="Delete Service" description="Are you sure you want to delete this service"
        rightButton="Delete"
        leftButton="Cancel"
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        />
        <h1 >My Services</h1>

        <div className="row justify-content-between cardparentcontainer">
        {
            services.length>0?(
                services.map((item,index)=>(
                <div key={index} className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 carddiv shadow-sm">
                    <div className="row align-items-center justify-content-between">
                        <h2 className="maincategory">{item.category}</h2>
                        <IconButton onClick={()=>{
                            setId(item._id)
                            setOpen(true)}}><DeleteOutlineOutlinedIcon color="error" /></IconButton>
                    </div>
                    <div className="row align-items-center justify-content-between">
                        <p className="category"><b>{item.subCategory}</b></p>
                        <p className="price"> {item.price} {props.EventUser.userInfo.curr}</p>
                    </div>
                    <p className="description">- {item.description} </p>
                    <div className="row align-items-center justify-content-between">
                        <p className="time">{renderNormalDate(item.updatedAt)}</p>
                        <p className="quantity">{item.quantity} {item.unit}</p>
                    </div>
                </div>
                ))
            ):<FailureScreen title="You haven't added any services" icon={<ExtensionOffOutlinedIcon sx={{fontSize:"4em"}} color="primary" />} />
        }        
        </div>

        <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add Services">
              <Fab onClick={()=>props.history.push("/addservices")} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
              </Tooltip>
        </div>
            {/* end of block */}
        </div>
        </div>
    </div>
    )
}

const mapStateToProps = ({EventUser})=>{
    return {
        EventUser
    }
}

export default connect(mapStateToProps)(MyServices)
