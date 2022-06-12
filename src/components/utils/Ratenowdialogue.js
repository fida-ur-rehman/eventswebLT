import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import axios from 'axios'
import {connect} from 'react-redux'
function Ratenowdialogue(props) {
    const [value,setValue]=React.useState(0)
    const handleRating = (id)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/rate-user`,{userId:id,stars:value},{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res);
            if(res.data.msg === "Success"){
                props.setOpen(false)
            }
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
  return (
    <div>
     
      <Dialog
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
                                 <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue)
                          
                        }}
                      />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>{props.leftButton}</Button>
          <Button onClick={()=>handleRating(props.item.userId._id)} autoFocus>
            {props.rightButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps=({EventUser})=>{
    return{
        user:EventUser
    }
}

export default connect(mapStateToProps)(Ratenowdialogue);