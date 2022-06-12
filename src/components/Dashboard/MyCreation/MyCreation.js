import React from 'react'
import Dashhead from '../Dashhead/Dashhead'
import axios from 'axios'
import {connect} from 'react-redux'
import moment from 'moment'
import Button from '@mui/material/Button'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Alert from '@mui/material/Alert'
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import FailureScreen from '../../utils/FailureScreen';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import TwoBDialog from '../../utils/TwoBDialog'
import Chip from '@mui/material/Chip'
import SimpleBackdrop from '../../utils/SimpleBackdrop'
const MyCreation = (props) => {
    const [creation,setCreation]=React.useState([])
    const [error,setError] = React.useState("")
    const [loading,setLoading]=React.useState(false)
    const [flag,setFlag]=React.useState(false)
    React.useEffect(()=>{  
      setLoading(true) 
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/user-event`, {headers:{token:props.user.user}})
        .then(res=>{
          console.log(res);
            let MyCreatiion =res.data.result.filter(item=>item.organiserId===props.user.userInfo._id)
            console.log(MyCreatiion)
            setLoading(false)
            setCreation(MyCreatiion)
        })
        .catch(err=>{
            setLoading(false)
           setError("something went wrong")
        })
    },[flag])
    
    const [display,setDisplay]=React.useState(false)
    const [open,setOpen]=React.useState(false)
    const [deleteId,setDeleteId]=React.useState("")
    const handleSubmit = ()=>{
      console.log(deleteId);
      setLoading(true)
      axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/delete-event`,{eventId:deleteId},{headers:{token:props.user.user}})
      .then(res=>{
        console.log(res);
        setFlag(!flag)
        setOpen(false)
        setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
        console.log(err)
      })
    }
    return (
        <div className="row">
          <SimpleBackdrop open={loading} />
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

             <div onClick={()=>setDisplay(false)}>
             <TwoBDialog title="Delete Event" description="Are you sure you want to delete this event"
        rightButton="Delete"
        leftButton="Cancel"
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        />
            <h1 className="dashboard-heading">My Creations</h1>
            <div className="parentofcards row justify-content-between">
              {
                creation.length>0?(
                  creation.map((item,index)=>(
                    <div key={index}  className={item.status.toLowerCase()!=="over"?"cardhead col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`":"cardheadgrey col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`"}>
                      <div className="row justify-content-between">
                      <div className="col-11">
                      <h2 className="">{item.name}</h2>
                      <p className="mb-3 subs">{item.totalSubs} people have joined</p>
                      </div>
                      <div className="col-1">
                      <IconButton onClick={()=>{
                        setDeleteId(item._id)
                        setOpen(true)}} color='primary' aria-label="delete">
                      <DeleteIcon />
                      </IconButton>
                      </div>
                      </div>

                      <div className="chipdiv">
                      <Chip label={item.status} color={item.status==="Live"?"primary":"default"} />
                      </div>

                      <div className="descriptioncontainer">
                        <h5>Description</h5>
                        <p>{item.description}</p>
                      </div>

                      <div className="timecontainer">
                        <p className="starts"><b>starts :</b> {moment.parseZone(item.start).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                        <p><b>ends :</b> {moment.parseZone(item.end).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                      </div>

                      <div className="row justify-content-between cardbuttondiv">
                          {item.status.toLowerCase()!=="over"?<Button  
                          onClick={()=>props.history.push("/editeventmap",item)}
                          className="cardbutton"
                          startIcon={<ModeEditRoundedIcon />}
                          variant="text">Edit</Button>:
                          <Button  
                          onClick={()=>props.history.push("/feedbackform",item)}
                          className="cardbutton"
                          startIcon={<NoteAltRoundedIcon />}
                          variant="text">Create feedback form</Button>
                          }
                          <Button
                          className="cardbutton"
                          onClick={()=>props.history.push("/eventdetail",item)}
                          startIcon={<InfoRoundedIcon />}
                          >
                              Details
                          </Button>
                          <Button  
                          className="cardbutton"
                          onClick={()=>props.history.push("/organizerbid",item._id)}
                          endIcon={<GavelOutlinedIcon />}
                          variant="contained">Bids</Button>
                        </div>

                    </div>
                  ))
                ):<FailureScreen icon={<EditOffOutlinedIcon sx={{fontSize:"4em"}} color="primary" />} title="You haven't created any event" />
              }
              </div>
              </div>
            </div>
            {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
        </div>
    );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(MyCreation)