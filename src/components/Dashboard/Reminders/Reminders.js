import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import {connect} from 'react-redux'
import "./Reminders.scss"
import Pagination from '@mui/material/Pagination';
import axios from 'axios'
import {renderDate} from '../../utils/renderDate'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import TwoBDialog from '../../utils/TwoBDialog'
import {storeUserInfo} from '../../redux/user/userActions'
function Reminders(props) {
    const [display,setDisplay]=React.useState(false)
    const [data,setData]=React.useState([])
    const [open,setOpen]=React.useState(false)
    const [id,setId]=React.useState('')
    const [pageNumber, setPageNumber] = React.useState(0)
    
    const usersPerPage = 5;
    const pagesVisited = pageNumber*usersPerPage //consider pages visited as users visited
    const displayUsers = data.slice(pagesVisited,pagesVisited+usersPerPage)
                            .map((item,index)=>(
                                <div className="shadow-sm p-3 my-5" key={index} >
                        <div className="mx-auto row align-items-center justify-content-between">
                            <h4>{item.msg.title}</h4>
                            <p>{renderDate(item.createdAt)}</p>
                        </div>
                        <div className="mx-auto row align-items-center justify-content-between">
                        <p>{item.msg.body}</p>
                        <IconButton onClick={()=>{
                            setOpen(true) 
                            setId(item._id)}} aria-label="delete">
                        <DeleteOutlineRoundedIcon color="primary" />
                        </IconButton>
                        </div>
                    </div>
                            ))
    const pageCount = Math.ceil(data.length/usersPerPage)
    const changePage = (pageno)=>{

        setPageNumber(pageno)
    }
    const getReminders = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/reminder/user-reminder`,{headers:{token:props.user.user}})
    .then(res=>{
        console.log(res)
        setData(res.data.result)
        let userinfo = props.user.userInfo;
        userinfo.reminderCount=res.data.result.length
        props.storeUserInfo(userinfo)
    })
    .catch(err=>{
        console.log(err)
    })
    }
    React.useEffect(()=>{
    console.log("user",props.user.user)
    getReminders()

    },[])
    const handleSubmit = ()=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/reminder/delete-reminder`,{reminderId:id},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            getReminders()
            setOpen(false)
        })
        .catch(err=>{
            setOpen(false)
            console.log(err);
        })
    }
    console.log(data)
    return (
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={7} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="container reminder-container" style={{height:"80vh"}} onClick={()=>setDisplay(false)}>
        <TwoBDialog title="Delete Service" description="Are you sure you want to delete this service"
        rightButton="Delete"
        leftButton="Cancel"
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        />
        <h1 className="mt-3">Reminders <NotificationsNoneOutlinedIcon sx={{fontSize:"1em"}} /></h1>
        {
            displayUsers
        }
        <Pagination color="primary" onChange={(e,pageno)=>changePage(pageno)} count={pageCount-1}  />


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

const mapDispatchToProps=(dispatch)=>{
    return{
        storeUserInfo:(user)=>dispatch(storeUserInfo(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Reminders)
