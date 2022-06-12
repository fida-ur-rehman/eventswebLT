import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./BidsScreen.scss"
import {connect} from 'react-redux'
import Button from '@mui/material/Button'
import axios from 'axios'
import Rating from '@mui/material/Rating';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import Alert from '@mui/material/Alert'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Ratenowdialogue from '../../utils/Ratenowdialogue';
import TwoBDialog from '../../utils/TwoBDialog'
import {showReport} from '../../redux/report/ReportActions'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
function OrganizerBid(props) {
    const [display,setDisplay]=React.useState(false);
    const [value, setValue] = React.useState('mybid');
    const [myBid,setMyBid]=React.useState([])
    const [bids,setBids]=React.useState([])
    const [flag,setFlag]=React.useState(false)
    const [status,setStatus]=React.useState("")
    const [rating,setRating]=React.useState(0)
    const [error,setError]=React.useState("")
    const [open,setOpen]=React.useState(false)
    const [open2,setOpen2]=React.useState(false)
    const [id,setId]=React.useState("")
    console.log(rating)
    //const bids = props.location.state
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
 
    console.log(myBid)
    React.useEffect(()=>{
        const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);


        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/single-event`, {eventId:props.location.state }, {headers:{token:props.user.user}})
        .then(res=>{
            setError("")
            console.log(res)
            setStatus(res.data.result.status)
            let array = res.data.result.bids.filter(item=>item.status==="Approved")
            if(array.length>0){
                setValue("mybid")
            }else{
                setValue("allbids")   
                setError("You haven't approved any bids yet") 
            }
            setMyBid(array)
            setBids(res.data.result.bids)
        })
        .catch(err=>{
            setError("Something went wrong")
            console.log(err)
        })

        
    },[flag])

    const handleApprove = (id)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/approve-bid`,{bidId:id},{headers:{token:props.user.user}})
        .then(res=>{    
            console.log(res);
            setError("")
            setFlag(!flag)
        })
        .catch(err=>{
            setError("Something went wrong")
            console.log(err);
        })
    }

    const handleSubmit = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/cancel-org`,{bidId: id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            if(res.data.msg==="Success"){
            setOpen2(false)
            props.history.push("mycreation")
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const handlePayment=()=>{
        const options = {
            key: 'rzp_test_BbBTgCM0XfV6iH',
            amount: '1000', //  = INR 1
            name: 'Tech Geeks Transac',
            description: 'some description',
            handler: function(response) {
                console.log(response);
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/razorpay`,{amount:1000})
                .then(res=>{
                  console.log(res);
                })
                .catch(err=>{
                  console.log(err);
                })
            },
            prefill: {
                name: 'Gaurav',
                contact: '9999999999',
                email: 'demo@demo.com'
            },
            notes: {
                address: 'some address'
            },
            theme: {
                color: 'blue',
                hide_topbar: false
            }
        };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
    }



    return (
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={2} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
     
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="container" onClick={()=>setDisplay(false)}>
        <TwoBDialog title="Request Cancellation" description="Are you sure you want to request vendor for cancellation of this bid"
        rightButton="Send"
        leftButton="Cancel"
        open={open2}
        setOpen={setOpen2}
        handleSubmit={handleSubmit}
        />
        <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="mybid" label="Approved Bids" />
        <Tab value="allbids" label="All Bids" />
      </Tabs>
    </Box>
    <div className="row mt-3 bid-parent">
    {
            myBid.length>0 && value==="mybid"?(
                myBid.map((item,index)=>(
                    <div className="shadow-sm col-5 mx-auto bid-parent-container" key={index}>
                    <div className="">
                    <div className="row justify-content-between align-items-center">
                    <h3 className="name col-8">{item.userId.name}</h3>
                    <p className="price col-3">{item.totalPrice} {props.user.userInfo.curr}</p>
                    <IconButton className="col-1" color="primary" onClick={()=>props.showReport({id:item._id,type:"Bid"})}>
                        <InfoOutlinedIcon />
                    </IconButton>
                    </div>

                    <div className="row mx-auto  align-items-center justify-content-between">
                    <p className="for">{item.userId.organisation}</p>
                    <Ratenowdialogue rightButton="submit" leftButton="cancel" 
                    description="Vendor reviews help organizers choose the best vendor for a event. Therefore, while it is not mandatory, it is highly recommended for organizers to leave a review for a vendor they have just completed a event with." 
                    title="Rate vendor" setOpen={setOpen}  open={open} item={item} />
                    <Button onClick={()=>setOpen(true)}>Rate User</Button>
                    </div>
                    <Rating
                    readOnly 
                        name="read-only"
                        value={item.userId.rating.avg}
                        
                      />
                    <p className="description">{item.description}</p>

                    {
                        item.services.map((service,sindex)=>(
                            <div key={sindex} className="row shadow-sm services-container">
                                <div className="col-1">
                                <p className="index">{sindex+1}</p>
                                </div>

                                <div className="col-8">
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
                    {!item.cancel.organiser.value?<div style={{textAlign:"center"}} className="mt-3">
                    <Button onClick={()=>{
                        setId(item._id)
                        setOpen2(true)
                    }} variant="text" color="error">Request Bid cancellation?</Button>
                    </div>:<Alert className="mt-3" severity="error">Bid cancellation requested</Alert>}
                    
                    <div style={{textAlign:"center"}} className="my-3">
                    <Button onClick={()=>handlePayment()} startIcon={<AttachMoneyIcon />} variant="contained">Pay Vendor</Button>
                    </div>

                    </div>
                </div>
                ))
            ):null
        }
        </div>
        {/* all ibds starts */}
        <div className="row mt-3 bid-parent">
        {
            bids.length>0 && value==="allbids"?(
                bids.map((item,index)=>(
                    <div className="shadow-sm col-5 mx-auto bid-parent-container" key={index}>
                    
                    <div className="">
                    <div className="row justify-content-between align-items-center">
                    <h3 className="name col-8">{item.userId.name}</h3>
                    {item.status!=="Approved"?<Button onClick={()=>handleApprove(item._id)} endIcon={<GavelRoundedIcon />} variant="contained">Approve Bid</Button>:null}
                    <IconButton className="col-1" color="primary" onClick={()=>props.showReport({id:item._id,type:"Bid"})}>
                        <InfoOutlinedIcon />
                    </IconButton>
                    </div>

                    <div className="row justify-content-between mx-auto mt-3">
                    <p className="for ">{item.userId.organisation}</p>
                    <p className="price ">{item.totalPrice} {props.user.userInfo.curr}</p>
                    </div>
                    <Rating
                    readOnly 
                        name="read-only"
                        value={item.userId.rating.avg}
                        
                      />
                    <p className="description">{item.description}</p>

                    {
                        item.services.map((service,sindex)=>(
                            <div key={sindex} className="row shadow-sm services-container">
                                <div className="col-1">
                                <p className="index">{sindex+1}</p>
                                </div>

                                <div className="col-8">
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
                    </div>
                </div>
                ))
            ):null
        }
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
  
export default connect(mapStateToProps,mapDispatchToProps)(OrganizerBid)


// {status.toLowerCase()==="over"?
//                         <Rating
//                         name="simple-controlled"
//                         value={item.userId.rating.avg}
//                         onChange={(event, newValue) => {
//                             handleRating(newValue,item.userId._id)
                          
//                         }}
//                       />
//                         :null}