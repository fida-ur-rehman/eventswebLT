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
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import SimpleBackdrop from '../../utils/SimpleBackdrop'
import FailureScreen from '../../utils/FailureScreen';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import Chip from '@mui/material/Chip'
import EditIcon from '@mui/icons-material/Edit';
const MyBids = (props) => {
    const [mybids,setMyBids]=React.useState([])
    const [error,setError] = React.useState("")
    const [refresh,setRefresh]=React.useState(false)
    const [loading,setLoading]=React.useState(false)
    React.useEffect(()=>{  
        setLoading(true) 
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/event/bided-event`,{headers:{token:props.user.user}})
        .then(res=>{
          setRefresh(false)
            console.log(res)
            setLoading(false)
            setMyBids(res.data.result.bidedEvent)
            
        })
        .catch(err=>{
            setLoading(false)
            setRefresh(false)
            console.log(err);
        })
    },[refresh])
    console.log("my bids",mybids)
    // const handleUnsubscribe = (id)=>{
    //     setLoading(true)
    // }
    const renderEditButton = (item)=>{
    let status=false;
      item.bids.map(bid=>{
        if(bid.userId._id===props.user.userInfo._id){
          if(bid.status.toLowerCase()==="approved"){
            status=true;
          }
        }
      })
      if(status===true){
        return null
      }else{
        return  <Button
        className="cardbutton"
        onClick={()=>props.history.push("/editbid",item)}
        startIcon={<EditIcon />}
        >
          Edit Bid
        </Button>
      }
    
    }

    
    const [display,setDisplay]=React.useState(false)
    return (
        <div className="row">
            <SimpleBackdrop open={loading} />
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={4} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

             <div onClick={()=>setDisplay(false)}>
             <h1 className="dashboard-heading">My Bids</h1>
            <div className="parentofcards row justify-content-between">
              {
                mybids.length>0?(
                  mybids.map((item,index)=>(
                    <div key={index}  className={item.status.toLowerCase()!=="over"?"cardhead col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`":"cardheadgrey col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5`"}>
                     <div className="row justify-content-between">
                      <div className="col-9">
                      <h2 className="">{item.name}</h2>
                      </div>
                      <div className="col-3">
                      <p className="mb-3 subs">{item.totalSubs} people have joined</p>
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
                          {
                            renderEditButton(item)
                          }
                          <Button  
                          onClick={()=>props.history.push('/bidsscreen',item.bids)}
                          className="cardbutton"
                          endIcon={<GavelRoundedIcon />}
                          variant="contained">View Bids</Button>
                        </div>

                    </div>
                  ))
                ):<FailureScreen icon={<CloudOffOutlinedIcon sx={{fontSize:"4em"}} color="primary" />} title="You don't have any bids" />
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

export default connect(mapStateToProps)(MyBids)