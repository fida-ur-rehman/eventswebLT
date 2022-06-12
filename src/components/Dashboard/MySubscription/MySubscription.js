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
import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';
import SimpleBackdrop from '../../utils/SimpleBackdrop'
import FailureScreen from '../../utils/FailureScreen';
import Chip from '@mui/material/Chip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import {showReport} from '../../redux/report/ReportActions'

const MySubscription = (props) => {
    const [creation,setCreation]=React.useState([])
    const [error,setError] = React.useState("")
    const [refresh,setRefresh]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
    React.useEffect(()=>{  
        setLoading(true) 
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/user-event`, {headers:{token:props.user.user}})
        .then(res=>{
            setLoading(false)
            let MyCreatiion =res.data.result.filter(item=>item.organiserId!==props.user.userInfo._id)
            console.log(MyCreatiion)
            
            setCreation(MyCreatiion)
        })
        .catch(err=>{
            setLoading(false)
           setError("something went wrong")
        })
    },[refresh])

    const handleUnsubscribe = (id)=>{
        setLoading(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/unsub-event`,{eventId:id},{headers:{token:props.user.user}})
        .then(res=>{
            setLoading(false)
          console.log(res)
          setRefresh(!refresh)
        })
        .catch(err=>{
            setLoading(false)
          console.log(err)
          setError("Something went wrong")
        })
    }
    
    const [display,setDisplay]=React.useState(false)
    return (
        <div className="row">
            <SimpleBackdrop open={loading} />
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={3} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

             <div onClick={()=>setDisplay(false)}>
            <h1 className="dashboard-heading">My Subscriptions</h1>
            <div className="parentofcards row justify-content-between">
              {
                creation.length>0?(
                  creation.map((item,index)=>(
                    <div key={index} className={item.status.toLowerCase()!=="over"?"cardhead col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`":"cardheadgrey col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`"}>
                      <div className="mb-3 row justify-content-between align-items-center">
                      <div className="col-7">
                      <h2 className="">{item.name}</h2>
                      </div>
                      <div className="col-4">
                      <p className="subs">{item.totalSubs} people have joined</p>
                      </div>
                      <div className="col-1">
                        <IconButton onClick={()=>props.showReport({id:item._id,type:"Event"})} color="primary">
                          <InfoOutlinedIcon />
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
                      <Button
                          className="cardbutton"
                          onClick={()=>props.history.push("/eventdetail",item)}
                          startIcon={<InfoRoundedIcon />}
                          >
                              Details
                          </Button>
                          {item.status.toLowerCase()!=="over"?<Button  
                          onClick={()=>handleUnsubscribe(item._id)}
                          className="cardbutton"
                          endIcon={<NotificationsOffRoundedIcon />}
                          variant="contained">Unsubscribe</Button>:

                          !item.feedbackUsers.includes(props.user.userInfo._id)?<Button  
                          onClick={()=>props.history.push("/fillfeedbackform",item.form)}
                          className="cardbutton"
                          endIcon={<NotificationsOffRoundedIcon />}
                          variant="contained">send feedback</Button>:null
                          }
                        </div>

                    </div>
                  ))
                ):<FailureScreen icon={<NotificationsOffOutlinedIcon sx={{fontSize:"4em"}} color="primary" />} title="You haven't subscribed to any events" />
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

const mapDispatchToProps =(dispatch)=>{
  return {
    showReport:(obj)=>dispatch(showReport(obj))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MySubscription)