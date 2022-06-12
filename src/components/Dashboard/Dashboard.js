import React from 'react'
import "./Dashboard.scss"
import Dashhead from './Dashhead/Dashhead'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GoogleMapReact from 'google-map-react';
import Marker from '../utils/Marker/Marker'
import axios from 'axios'
import {connect} from 'react-redux'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import moment from 'moment'
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {storeUserInfo} from '../redux/user/userActions'
import OwnMarker from '../utils/Marker/OwnMarker';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import SimpleBackdrop from '../utils/SimpleBackdrop';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/material/Chip'
import SearchIcon from '@mui/icons-material/Search';
const Dashboard = (props) => {
    const [display,setDisplay]=React.useState(false)
    const [location,setLocation]=React.useState({center:{lat:59.95,lng:30.33},zoom:11})
    const [data,setData]=React.useState([])
    const [flag,setFlag]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
    const [error,setError]=React.useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filter,setFilter] = React.useState("New Events Nearby")

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    
    console.log("dashboard props",props)
    const getGeo = async ()=>{
      window.navigator.geolocation.getCurrentPosition((loca)=>{
        setLocation({center:{lat:loca.coords.latitude,lng:loca.coords.longitude},zoom:18})
      },(err)=>setError(err.message));
    }
    React.useEffect(()=>{
      setLoading(true)
      getGeo()
         axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/all-event`,{headers:{token:props.userToken}})
          .then(res=>{
            if(res.data.msg==="Success" && res.data.result.length>0){
              setData(res.data.result)
            }
            axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/single-user`,{headers:{token:props.userToken}})
            .then(res=>{
              if(res.data.msg==="Success"){
                props.storeUserInfo(res.data.result)
              }
              setLoading(false)
            })
            .catch(err=>{
              console.log(err);
              setLoading(false)

            })
          })
          .catch(err=>{
            console.log(err);
          setLoading(false)

          })
          
    },[flag])
    const getEvent  = ()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/all-event`,{headers:{token:props.userToken}})
          .then(res=>{
            if(res.data.msg==="Success" && res.data.result.length>0){
              setData(res.data.result)
            }})
            .catch(err=>{
              console.log(err);
            })
    }
    console.log("all events",data);
    const setSearchResult=(e)=>{
      if(e.length<=0){
        getEvent()
      }else{
        let array = data.filter(item=>{
          //console.log(item)
          let name = item.name.slice(0,e.length).trim().replace(' ','').toLowerCase();
          let serachname = e.toLowerCase().replace(' ','').trim();
          if(name===serachname){
            return item;
          }
        })
        setData(array)
      }
      
    }
    return (
        <div className="row">
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
            <div style={{ height: '50vh', width: '100%' }}>
            {/* AIzaSyDa3zC3zgOqGZq-yIVdixTmOuB27nNfqgs */}
            {/* AIzaSyBOzAkOqCVMjP4hXIkabfHi40vJ8afKKZ4 */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBOzAkOqCVMjP4hXIkabfHi40vJ8afKKZ4'}}
          defaultCenter={location.center}
          defaultZoom={location.zoom}
        >
        <OwnMarker 
      lat = {location.center.lat}
      lng={location.center.lng}
      text="My Location"
      />
          {data.map((marker,index)=>(
            marker.location.latitude&&
            <Marker
            lat={marker.location.latitude}
            lng={marker.location.longitude}
            text={marker.name}
          />
          ))}
        </GoogleMapReact>
      </div>
      
            {/* <h1><MapOutlinedIcon sx={{fontSize:"2em"}}/> Nearby Events</h1>    */}
            <div className="searchdiv">
            {/* <TextField fullWidth 
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <TravelExploreRoundedIcon />
            //     </InputAdornment>
            //   ),
            // }}
            onChange={(e)=>setSearchResult(e.target.value)}
            id="filled-basic" label="Search event by name" variant="filled" /> */}
            <div className="row align-items-center input">
              <SearchIcon sx={{fontSize:"2em"}} />
            <input placeholder="Search event by name" onChange={(e)=>setSearchResult(e.target.value)} />
            </div>
            </div> 

            <div>
      <Button
        sx={{marginLeft:5,fontSize:"1.2em"}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
       {filter}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem disabled={filter==="New Events Nearby"?true:false} onClick={()=>{ //oldest, newest, name
        setFilter("New Events Nearby")
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/filter`, {option: "newest"}, {headers:{token:props.userToken}})
        .then(res=>{
          setData(res.data.result)
          setAnchorEl(null);
        })
        .catch(err=>{
          console.log(err)
        })
        }}>New Events Nearby</MenuItem>
        <MenuItem disabled={filter==="Oldest Events"?true:false} onClick={()=>{
          setFilter("Oldest Events")
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/filter`, {option: "oldest"}, {headers:{token:props.userToken}})
        .then(res=>{
          console.log(res)
          setData(res.data.result)
          setAnchorEl(null);
        })
        .catch(err=>{
          console.log(err)
        })
        }}>Sort by oldest</MenuItem>
        <MenuItem disabled={filter==="Events by name"?true:false} onClick={()=>{
          setFilter("Events by name")
          axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/filter`, {option: "ZtoA"}, {headers:{token:props.userToken}})
          .then(res=>{
            setData(res.data.result)
            setAnchorEl(null);
          })
          .catch(err=>{
            console.log(err)
          })
        }}>Sort by name</MenuItem>
      </Menu>
    </div>

            <div className="parentofcards row justify-content-between">
              {
                data.length>0?(
                  data.map((item,index)=>(
                    item.type.toLowerCase()!=="private"?<div onClick={()=>props.history.push("/eventdetail",item)} key={index} className={item.status.toLowerCase()!=="over"?"shadow cardhead col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`":"cardheadgrey col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`"}>
                      <div className="row justify-content-between">
                      <h2 className="col-8">{item.name}</h2>
                      <p className="col-4 subs">{item.totalSubs} People have joined</p>
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
                      {/* <div className="row">
                        <div className="col-6">
                        <p>{item.description}</p>
                        </div>
                        <div className="col-6">
                        <p className="start">Start : {moment.parseZone(item.start).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                        <p className="end">End : {moment.parseZone(item.end).local().format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                        </div>
                      </div> */}

                    </div>:null
                  ))
                ):<p>No nearby events</p>
              }
              </div>
              <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Create Event">
              <Fab onClick={()=>props.history.push("/createevent")} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
              </Tooltip>
              </div>



              



                {/* end of block */}
            </div>
            </div>
        </div>
    );
}

const mapDispatchToProps =(dispatch)=>{
  return {
    storeUserInfo:(info)=>dispatch(storeUserInfo(info))
  }
}

const mapStateToProps =({EventUser})=>{
return {
    userToken:EventUser.user
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);