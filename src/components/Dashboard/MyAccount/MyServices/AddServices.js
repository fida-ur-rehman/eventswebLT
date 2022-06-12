import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../../Dashhead/Dashhead'
import axios from 'axios'
import "./MyServices.scss"
import {connect} from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import Alert from '@mui/material/Alert'
import SimpleSnackbar from '../../../utils/Snackbar'
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function AddServices(props) {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [display,setDisplay]=React.useState(false)
    const [mainCategory,setMainCategory] =React.useState([])
    const [mainCategoryR,setMainCategoryR]=React.useState("")
    const [error,setError]=React.useState("")
    const [dataList,setDataList]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [unit, setUnit] = React.useState('');
    const SiUnits = ['ml','L','kg','lbs','g','cm','m','inch',"pcs", 'boxes']
    const handleChange = (event) => {
      setUnit(event.target.value);
    };
  
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/category/all-category`, {headers:{token:props.EventUser.user}})
        .then(res=>{
            console.log("all category",res);
            if(res.data.result.length>0){
                setMainCategory(res.data.result);
            }
        })
        .catch(err=>{
            console.log(err);
            setError("Something went wrong")
        })
    },[])
    const onSubmit = (data)=>{
        setLoading(true)
        let categoryId=""
        console.log(data);
        if(mainCategoryR==="" || unit===''){
            setError("Please fill all details")
        }else{
            setError("")
            let arr = mainCategory.filter(item=>item.name===mainCategoryR)
            if(arr.length>0){
                categoryId=arr[0]._id
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/create-service` ,{categoryId, category:mainCategoryR, subCategory:data.subcategory, quantity:data.quantity, price:data.price,unit},{headers:{token:props.EventUser.user}})
                .then(res=>{
                    console.log(res);
                    if(res.data.msg==="Success"){
                        setOpen(true)
                        setLoading(false)
                        setDataList([...dataList,res.data.result])
                    }
                    
                })
                .catch(err=>{
                    setLoading(false)
                    console.log(err)
                })
            }else{
              setError("Category dosen't exists, please select from dropdown")
            }
            
        }
    }
    console.log(dataList);
    return (
        <div className="row">
        <SimpleSnackbar open={open} setOpen={setOpen} message="Item added to my services" />
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={6} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="add-services" onClick={()=>setDisplay(false)}>
   
        <h1 className="heading">Add Services</h1>
       
        <form onSubmit = {handleSubmit(onSubmit)} className="addservicesform" >
        <div className="auto-complete-div">
        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mainCategoryR}
          label="Age"
          onChange={(e)=>setMainCategoryR(e)}
        >
          {
            mainCategory.map((option) => <MenuItem value = {option.name}>{option.name}</MenuItem>)
          }
        </Select>
      </FormControl> */}
        <Autocomplete
        onInputChange={(e,n)=>setMainCategoryR(n)}
        id="free-solo-demo"
        freeSolo
        options={mainCategory.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      </div>
      <TextField
      error={errors.subcategory?true:false}
      helperText={errors.subcategory?"sub-category is must":null}
      inputProps={{ maxLength: 20 }}
      {...register('subcategory',{required:true})}
      className="textfield" fullWidth label="Sub Category" variant="outlined" />

      <div className="row justify-content-center align-items-center">
     
     <div className="col-4">
      <TextField 
      fullWidth
      error={errors.quantity?true:false}
      helperText={errors.quantity?"quantity is must":null}
      onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
    }}
      {...register('quantity',{required:true})}
      className="textfield" label="Quantity" variant="outlined" />
      </div>


      <div className="col-4">
      <FormControl fullWidth> 
        <InputLabel id="demo-simple-select-label">Select Unit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={unit}
          label="Select Unit"
          onChange={handleChange}
        >
          
          {
              SiUnits.map((item,index)=><MenuItem key={index} value={item}>{item}</MenuItem>)
          }
        </Select>
      </FormControl>
      </div>
      
    
      </div>
      <TextField 
      onInput = {(e) =>{
        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
    }}
    fullWidth
      error={errors.price?true:false}
      helperText={errors.price?"price is must":null}
      {...register('price',{required:true})}
      className="textfield" label="Price" variant="outlined" />
    <div style={{textAlign:"center"}}>
    <Button 
    loading={loading?true:false}
    type="submit" className="additem" variant="contained">Add Item</Button>
    </div>
      </form>
      
            {/* end of block */}
            
            {
                dataList.length>0?(
                    <div className="tablediv">
            <table class="ui celled table">
  <thead>
    <tr><th>Category</th>
    <th>Sub Category</th>
    <th>Quantity</th>
    <th>Price</th>
  </tr></thead>
  <tbody>
                    {dataList.map((item,index)=>(
                        <tr>
                        <td data-label="Name">{item.category}</td>
                        <td data-label="Age">{item.subCategory}</td>
                        <td data-label="Job">{item.quantity} {item.unit}</td>
                        <td data-label="Job">{item.price} {props.EventUser.userInfo.curr}</td>
                      </tr>
                    ))}
                    </tbody>
</table>
</div>
                ):null
            }
            
    
   
 
            <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add Services">
              <Fab onClick={()=>props.history.push("/myservices")} color="primary" variant="extended">
                Done
                <NavigationIcon sx={{ ml: 1 }} />
                </Fab>
              </Tooltip>
            </div>
            
        </div>
        </div>
        
        {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
    </div>
    )
}
const mapStateToProps = ({EventUser})=>{
    return {
        EventUser
    }
}

export default connect(mapStateToProps)(AddServices)
