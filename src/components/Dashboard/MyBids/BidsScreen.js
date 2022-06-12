import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import "./BidsScreen.scss"
import {connect} from 'react-redux'
import Button from '@mui/material/Button'
import axios from 'axios'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import TwoBDialog from '../../utils/TwoBDialog'
import Alert from '@mui/material/Alert'
function BidsScreen(props) {
    const [display,setDisplay]=React.useState(false);
    const [value, setValue] = React.useState('allbids');
    const [myBid,setMyBid]=React.useState([])
    const [open,setOpen]=React.useState(false)
    const [id,setId]=React.useState('')
    const [open2,setOpen2]=React.useState(false)
    const bids = props.location.state
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    console.log(props)
    React.useEffect(()=>{
        let Bid = bids.filter(bid=>bid.userId._id===props.user.userInfo._id)
        setMyBid(Bid)
        
    },[])
    const handleSubmit = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/delete-bid`,{bidId:id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            props.history.push("/mybids")
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit2=()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/cancel-ven`,{bidId:id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            setOpen2(false)
            props.history.push("/mybids")
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={4} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="container" onClick={()=>setDisplay(false)}>
        <TwoBDialog title="Delete Event" description="Are you sure you want to delete this event"
        rightButton="Delete"
        leftButton="Cancel"
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        />
        <TwoBDialog title="Accept Cancellation" description="Are you sure you want to approve bid cancellation"
        rightButton="Accept"
        leftButton="Cancel"
        open={open2}
        setOpen={setOpen2}
        handleSubmit={handleSubmit2}
        />
        {/* <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="mybid" label="My Bid" />
        <Tab value="allbids" label="All Bids" />
      </Tabs>
    </Box> */}
    <div style={{wordWrap:"break-word"}} className="row mt-3 bid-parent">
    {
            myBid.length>0 ?(
                myBid.map((item,index)=>(
                    <div className="shadow-sm col-6 bid-parent-container" key={index}>
                    <div className="">
                    <div className="row align-items-center justify-content-between">
                    <h3 className="name col-8">{item.userId.name}</h3>
                    <p className="price col-3 m-auto">{item.totalPrice} {props.user.userInfo.curr}</p>
                    <div className="col-1">
                    <IconButton onClick={()=>{
                            setOpen(true) 
                            setId(item._id)}} aria-label="delete">
                        <DeleteOutlineRoundedIcon color="primary" />
                        </IconButton>
                    </div>
                    </div>
                    <Chip label={item.status} />

                    <p className="mt-3 for">{item.userId.organisation}</p>
                    <p className="description">{item.description}</p>

                    {
                        item.services.map((service,sindex)=>(
                            <div key={sindex} className="row shadow-sm services-container">
                                <div className="col-1">
                                <p className="index">{sindex+1}</p>
                                </div>

                                <div className="col-7">
                                <p className="service-subcat">{service.subCategory}</p>
                                <p className="service-cat">{service.category}</p>
                                </div>

                                <div className="col-3">
                                <p className="service-price">{service.price} {props.user.userInfo.curr}</p>
                                <p className="service-quantity">{service.quantity} {service.unit}</p>
                                </div>
                            </div>
                        ))
                    }
                     {item.cancel.organiser.value && !item.cancel.vendor.value?<div style={{textAlign:"center"}} className="mt-3">
                    <Button onClick={()=>{
                        setId(item._id)
                        setOpen2(true)
                    }} variant="text" color="error">Accept Bid cancellation?</Button>
                    </div>:item.cancel.vendor.value?<Alert className="mt-3" severity="error">Bid cancelled</Alert>:null}
                    </div>
                </div>
                ))
            ):null
        }
        </div>
        {/* all ibds starts */}
        {/* <div className="row bid-parent">
        {
            bids.length>0 && value==="allbids"?(
                bids.map((item,index)=>(
                    <div className="shadow-sm col-5 mx-auto bid-parent-container" key={index}>
                    <div className="">
                    <div className="row justify-content-between">
                    <h3 className="name col-9">{item.userId.name}</h3>
                    <p className="price col-3">${item.totalPrice}</p>
                    </div>

                    <p className="for">{item.userId.organisation}</p>
                    <p className="description">{item.description}</p>

                    {
                        item.services.map((service,sindex)=>(
                            <div key={sindex} className="row shadow-sm services-container">
                                <div className="col-1">
                                <p className="index">{sindex+1}</p>
                                </div>

                                <div className="col-7">
                                <p className="service-subcat">{service.subCategory}</p>
                                <p className="service-cat">{service.category}</p>
                                </div>

                                <div className="col-3">
                                <p className="service-price">${service.price}</p>
                                <p className="service-quantity">{service.quantity}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                ))
            ):null
        }
        </div> */}

            {/* end of block */}
        </div>
        </div>
    </div>
    )
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(BidsScreen)
