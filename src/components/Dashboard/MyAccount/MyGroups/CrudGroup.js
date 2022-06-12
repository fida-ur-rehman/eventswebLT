import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../../Dashhead/Dashhead'
import TextField from '@mui/material/TextField'
import "./MyGroups.scss"
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios'
import {connect} from 'react-redux'
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip'
function CrudGroup(props) {
    const [display,setDisplay]=React.useState(false)
    const [groupName,setGroupName]=React.useState("")
    const [mobileNumber,setMobileNumber]=React.useState("")
    const [name,setName]=React.useState("")
    const [mobileNumberList,setMobileNumberList]=React.useState({})
    const [error,setError]=React.useState("")
    console.log(props);

    React.useEffect(()=>{
        setError("")
        if(props.location.state.route===true){
            let obj = Object.fromEntries(props.location.state.list)
            setMobileNumberList(obj)
        }
        setGroupName(props.location.state.name)
    },[])

    const handleSubmit = ()=>{
      
       console.log(mobileNumberList) 
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/userContact/create-userContact`,{groupName:groupName,list:mobileNumberList},{headers:{token:props.user.user}})
                       .then(res=>{
                           console.log(res);
                           if(res.data.msg==="Success"){
                               props.history.push("/mygroups")
                           }
                       })
                       .catch(err=>{
                           console.log(err);
                           setError("Something went wrong check your inputs")
                       })
    }

    const handleAdd = ()=>{
        if(name.length<=0 || groupName.length<=0 || mobileNumber.length<=0){
            setError("Check your inputs")
        }else{
            setError("")
            mobileNumberList[mobileNumber]=name
            setMobileNumberList({...mobileNumberList})
        }
        
    }
    const renderChip =()=>{
       return Object.keys(mobileNumberList).length>0?Object.entries(mobileNumberList).map((item,index)=>(
        <Chip
        className="mx-1 my-1 numberchip"
        label={`${item[1]} ${item[0]}`}
        deleteIcon={<ClearIcon  />}
        //onClick={handleClick}
        onDelete={()=>{
           let arr = Object.entries(mobileNumberList).filter(e=>e[0]!==item[0])
           console.log(arr);
           let obj = Object.fromEntries(arr)
           setMobileNumberList(obj)
        }}
      />
       )):null
    }

    const renderForm = ()=>{
        return <form className="groupform">
            <TextField className="my-3" value={groupName} onChange={(e)=>setGroupName(e.target.value)} fullWidth id="outlined-basic" label="Group Name" variant="outlined" />
            <TextField className="my-3" onChange={(e)=>setName(e.target.value)} fullWidth id="outlined-basic" label="Name" variant="outlined" />
            <TextField className="my-3" onChange={(e)=>setMobileNumber(e.target.value)} fullWidth id="outlined-basic" label="Mobile Number" variant="outlined" />
            <Alert severity="warning">make sure to include dial code before phone number, example : "+91123456789"</Alert>
            <div className="my-3" style={{textAlign:"center"}}>
            <Button onClick={()=>handleAdd()} variant="contained">Add Phone Number</Button>
            </div>
        </form>
    }

    const renderEdition =()=>{
        return <div className="row groupcreation">
            <div className="shadow-sm mx-auto cont1 col-3 py-2">
            <h1>Edit Group</h1>
            <p>
                Group edition will update the existing group
            </p>
            <p>
            {Object.keys(mobileNumberList).length>0?Object.entries(mobileNumberList).map((item,index)=>(
        <Chip
        key={index}
        className="mx-1 my-1 numberchip"
        label={`${item[1]} ${item[0]}`}
        //onClick={handleClick}
        
      />
       )):null}
            </p>
            </div>

            <div className="shadow-sm mx-auto cont2 col-8 py-2">
            <h1>Create Group</h1>
            {renderForm()}
            <div className="mb-4">
            {renderChip()}
            </div>
            </div>
        </div>
    }

    const renderCreation = ()=>{
        return <div className="row groupcreation">
            <div className="shadow-sm mx-auto cont1 col-3 py-2">
            <h1>Group Creation</h1>
            <p>
                You can create a group by adding members with your phone numbers and name. While creating a private event you can manually select a group and those members will be the subscribers / attendees of your event 
            </p>
            </div>

            <div className="shadow-sm mx-auto cont2 col-8 py-2">
            <h1>Create Group</h1>
            {renderForm()}

            <div className="mb-3">
            {renderChip()}
            </div>

            </div>
        </div>
    }

    return (
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={6} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container grey">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="mt-4" onClick={()=>setDisplay(false)}>
        {
            props.location.state.route===true?(
              renderEdition()
            ):renderCreation()
        }
        
        <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Create Group">
              <Fab onClick={()=>handleSubmit()} color="primary" variant="extended">
                {props.location.state.route===true?"Edit Group":"Create Group"}
                <AddIcon sx={{ ml: 1 }} />
                </Fab>
              </Tooltip>
            </div>
            {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
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

export default connect(mapStateToProps)(CrudGroup)
