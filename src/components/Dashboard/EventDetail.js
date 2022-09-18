import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from './Dashhead/Dashhead'
import Marker from '../utils/Marker/Marker'
import GoogleMapReact from 'google-map-react';
import moment from 'moment'
import "./EventDetail.scss"
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AgoraRTC from "agora-rtc-sdk-ng";
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import OwnMarker from '../utils/Marker/OwnMarker';
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import axios from 'axios'
import {connect} from 'react-redux'
import Chip from '@mui/material/Chip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {showReport} from '../redux/report/ReportActions'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SimpleBackdrop from '../utils/SimpleBackdrop';
import LiveStream from './LiveStream';
function EventDetail(props) {
    const [display,setDisplay]=React.useState(false)
    const [location,setLocation]=React.useState({center:{lat:59.95,lng:30.33},zoom:11})
    const [eventLocation,setEventLocation]=React.useState({})
    const [subscribe,setSubscribed]=React.useState(false)
    const [error,setError]=React.useState("")
    const [loading,setLoading]=React.useState(false)
    console.log(props)
    let details = props.location.state

    const getGeo = async ()=>{
      window.navigator.geolocation.getCurrentPosition((loca)=>{
        setLocation({center:{lat:loca.coords.latitude,lng:loca.coords.longitude},zoom:18})
      },(err)=>setError(err.message));
    }
    React.useEffect(()=>{
      //console.log(navigator);
      setLoading(true)
      getGeo()
      if(details.subs.includes(props.user.userInfo._id)){
        setSubscribed(true)
      }
      setLoading(false)
    },[])

    const handleSubscribe=()=>{
      setLoading(true)
      if(subscribe){
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/unsub-event`,{eventId:details._id},{headers:{token:props.user.user}})
        .then(res=>{
            setLoading(false)
          console.log(res)
          setSubscribed(false)
  //        var carIndex = colors.indexOf("car");//get  "car" index
//remove car from the colors array
//colors.splice(carIndex, 1); // colors = ["red","blue","green"]
          let ind = props.location.state.subs.indexOf(props.user.userInfo._id)
          props.location.state.subs.splice(ind)
        })
        .catch(err=>{
            setLoading(false)
          console.log(err)
          setError("Something went wrong")
        })
      }else{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/join-event`, {eventId:details._id, maxMembers:details.maxMembers , joined: details.totalSubs }, {headers:{token:props.user.user}})
        .then(res=>{
            setLoading(false)
            if(res.data.result==="Joined"){
                //navigation.navigate("successlottie",{route:"My Events"})
                setSubscribed(true)
              props.location.state.subs.unshift(props.user.userInfo._id)
            }else{
              setError("Can't subscribe as event is full")
            }
            console.log(res);
        })
        .catch(err=>{
             setLoading(false)
            console.log(err);
        })
      }
      
    }

    const createConv = ()=>{
      axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/conv/new-con`,{senderId:props.user.userInfo._id,recieverId:details.organiserId} ,{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res);
                if(res.data.msg==="Success"){
                if(Array.isArray(res.data.result)){
                    props.history.push("/chats",res.data.result[0]._id)
                }else if(typeof(res.data.result)==='object'){
                    props.history.push("/chats",res.data.result._id)
                }else{
                    props.history.push("/chats",res.data.result)
                }
                
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }


    //agora initals



    //agora initals 



    return (
        <div className="row eventdetail">
          <SimpleBackdrop open={loading} />
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={1} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div onClick={()=>setDisplay(false)}>
      
       
       <div className='shadow-sm eventDetaildiv'>
         <div className="mb-3" style={{textAlign:"right"}}>
       <IconButton onClick={()=>props.showReport({id:details._id,type:"Event"})} color="primary">
            <InfoOutlinedIcon />
          </IconButton>
          </div>
       <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBOzAkOqCVMjP4hXIkabfHi40vJ8afKKZ4'}}
          defaultCenter={{lat:details.location.latitude,lng:details.location.longitude}}
          defaultZoom={location.zoom}
        >
         <OwnMarker 
      lat = {location.center.lat}
      lng={location.center.lng}
      text="My Location"
      />
      <Marker
        lat={details.location.latitude}
        lng={details.location.longitude}
        text="Event Location"
      />
        </GoogleMapReact>
        </div>
        <div className="row">
        <div className="col-10">
        <h1>{details.name}</h1>
        </div>
        {details.organiserId!==props.user.userInfo._id &&details.status.toLowerCase()!=="over"?<div className="col-2">
        {!subscribe?<Button size="large" startIcon={<NotificationsNoneIcon />} variant="contained" onClick={()=>handleSubscribe()}>
          Subscribe
        </Button>:<Button size="large" startIcon={<NotificationsActiveRoundedIcon />} color="secondary" onClick={()=>handleSubscribe()}>Unsubscribe</Button>}
        </div>:null}

        </div>
        <h2 className="greycolor">organised by - {details.organiserName}</h2>

        <div className="status-div">
        <span className="status-active">{details.type}</span>
        <span className="status-red">{details.status}</span>
        </div>

        {/* {
          details.serviceTags.length>0&&details.serviceTags.map((item,index)=>(
            <Chip className='m-3' label={`${item.quantity} ${item.name}`} key={index} icon={<LocalOfferIcon />} />
          ))
        } */}

        <div className="row justify-content-around timediv">
        <p><HourglassEmptyIcon /> Start : {moment.parseZone(details.start).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        <p><HourglassFullIcon /> End : {moment.parseZone(details.end).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        </div>
        <p><b>Address : </b>{details.eventAddress}</p>
        <p><b>Description : </b>{details.description}</p>

        {details.organiserId!==props.user.userInfo._id &&details.status.toLowerCase()!=="over"?<div style={{textAlign:"center"}}>
        {details.allowContact && <Button onClick={()=>createConv()} variant="text" className="detailbutton" startIcon={<ChatBubbleOutlineOutlinedIcon />}>Chat</Button>}
        <Button onClick={()=>props.history.push("/createbid",details)} variant="contained" className="detailbutton" endIcon={<GavelOutlinedIcon />}>Bid</Button>
        </div>:null}
        <LiveStream eventOrganizerId={details.organiserId} name={details.organiserName} />

        </div>

            {/* end of block */}
        </div>
        </div>
        {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
    </div>
    )
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
export default connect(mapStateToProps,mapDispatchToProps)(EventDetail)
