import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../../Dashhead/Dashhead'
import axios from 'axios'
import {connect} from 'react-redux'
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import "./MyApprovals.scss"
import FailureScreen from '../../../utils/FailureScreen'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
function MyApprovals(props) {
    const [display,setDisplay]=React.useState(false)
    const [data,setData]=React.useState([])
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/myApprovals`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.result.myApprovals){
                setData(res.data.result.myApprovals)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
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

        <div onClick={()=>setDisplay(false)}>
        <h1 className="myapprovalsh">My Approvals <HowToRegRoundedIcon /></h1>

        <div className="row bid-parent ">
        {
            data.length>0?(
                data.map((item,index)=>(
                    <div className="shadow-sm col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 mx-5 bid-parent-container" key={index}>
                        <div className="">
                        <div className="row justify-content-between">
                        <h3 className="name col-9">{item.bid.userId.name}</h3>
                        <p className="price col-3">${item.bid.totalPrice}</p>
                        </div>

                        <p className="for">for <span>{item.name}</span></p>
                        <p className="description">{item.bid.description}</p>

                        {
                            item.bid.services.map((service,sindex)=>(
                                <div key={sindex} className="row shadow-sm services-container">
                                    <div className="col-1">
                                    <p className="index">{sindex+1}</p>
                                    </div>

                                    <div className="col-7">
                                    <p className="service-subcat">{service.subCategory}</p>
                                    <p className="service-cat">{service.category}</p>
                                    <p className="service-cat">{service.description}</p>
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
            ):<FailureScreen title="You haven't approved any bids" icon={<GavelRoundedIcon sx={{fontSize:"4em"}} color="primary" />} />
        }
        </div>
        


            {/* end of block */}
        </div>
        </div>
    </div>
    )
}
const mapStateToProps =({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(MyApprovals)
