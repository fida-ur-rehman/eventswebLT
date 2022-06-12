import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {connect} from 'react-redux'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const Input = styled('input')({
  display: 'none',
});
function FormDialog(props) {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    const [selectedImage,setSelectedImage]=React.useState([])
    console.log(selectedImage)
    React.useEffect(()=>{
        setValue("name",props.user.userInfo.name)
        setValue("emailaddress",props.user.userInfo.email)
        setValue("organization",props.user.userInfo.organisation)
        setValue("city",props.user.userInfo.city)
        setValue("address",props.user.userInfo.address)
    },[])

    const onSubmit = (data)=>{
        console.log(data)
        
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/edit-user`,[
            {"propName" : "name", "value": data.name},
            {"propName" : "email", "value": data.emailaddress},
            {"propName" : "organisation", "value": data.organization},
            {"propName" : "address", "value": data.address},
            {"propName" : "city", "value": data.city}
          
          ],{headers:{'token':props.user.user}})
          .then(res=>{
            console.log(res);
            const formdata = new FormData();
                if(!Array.isArray(selectedImage)){
                  formdata.append('image',selectedImage)
                console.log(formdata)
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/upload`,formdata,{headers:{Accept:'application/json','Content-Type':"multipart/form-data",token:props.user.user}})
                .then(res=>{
                    console.log(res);
                    props.setOpen(false)
                    props.getUser()
                  
                })
                .catch(err=>{
                    console.log(err);
                })
              }else{
                props.setOpen(false)
                    props.getUser()
              }
          })
          .catch(err=>{
            console.log(err)
          })
    }

  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <DialogTitle>Edit Info</DialogTitle>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Note : Phone number can't be edited, use a different account instead
          </DialogContentText>
          <TextField
          inputProps={{ maxLength: 200 }}
          {...register('name',{required:true})}
          error={errors.name?true:false}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
          inputProps={{ maxLength: 200 }}
          {...register('emailaddress',{required:true})}
          error={errors.emailaddress?true:false}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
           <TextField
          inputProps={{ maxLength: 200 }}
          {...register('organization',{required:true})}
          error={errors.organization?true:false}
            margin="dense"
            id="name"
            label="Organization"
            fullWidth
            variant="standard"
          />
           <TextField
          inputProps={{ maxLength: 200 }}
          {...register('city',{required:true})}
          error={errors.city?true:false}
            margin="dense"
            id="name"
            label="City"
            fullWidth
            variant="standard"
          />
           <TextField
          inputProps={{ maxLength: 200 }}
          {...register('address',{required:true})}
          error={errors.address?true:false}
            margin="dense"
            id="name"
            label="Address"
            fullWidth
            variant="standard"
          />
{!Array.isArray(selectedImage)?(
        <div className="my-3 row justify-content-center">
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <IconButton onClick={()=>setSelectedImage([])} aria-label="delete" size="small" color='error'>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
        </div>
      ):null}

            <div className="mt-4 mb-2" style={{textAlign:"center"}}>
            <label htmlFor="contained-button-file">
            <Input 
             onChange={(event) => {
                console.log(event.target.files);
                setSelectedImage(event.target.files[0]);
              }}
            accept="image/*" id="contained-button-file" multiple type="file" />
            <Button variant="contained" component="span" endIcon={<CameraAltIcon />}>
            Upload image
            </Button>
            </label>
            </div>







        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(FormDialog)