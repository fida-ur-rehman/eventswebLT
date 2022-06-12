import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import axios from 'axios'
import {connect} from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import Alert from '@mui/material/Alert'
import SimpleSnackbar from '../../utils/Snackbar'
import Fab from '@mui/material/Fab';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
function EditBid(props) {
    console.log("eidt bid props",props)
    const SiUnits = ['ml','L','kg','lbs','g','cm','m','inch',"pcs", 'boxes']
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [display,setDisplay]=React.useState(false)
    const [mainCategory,setMainCategory] =React.useState([])
    const [mainCategoryR,setMainCategoryR]=React.useState("")
    const [error,setError]=React.useState("")
    const [dataList,setDataList]=React.useState([])
    const [loading,setLoading]=React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [services,setServices]=React.useState([])
    const [selection,setSelection]=React.useState([])
    const [description,setDescription]=React.useState("")
    const [unit, setUnit] = React.useState('');
    const [myBid,setMyBid]=React.useState([])
    const handleChange = (event) => {
        setUnit(event.target.value);
      };
      console.log('mybid',myBid)
    React.useEffect(()=>{
        let mybid = props.location.state.bids.filter((item)=>item.userId._id===props.EventUser.userInfo._id)
        setMyBid(mybid[0])
        setDescription(mybid[0].description)
        setDataList(mybid[0].services)
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/category/all-category`, {headers:{token:props.EventUser.user}})
        .then(res=>{
            console.log("all category",res);
            if(res.data.result.length>0){
                setMainCategory(res.data.result);
            }
            axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/service/user-service`,{headers:{token:props.EventUser.user}})
            .then(res=>{
                if(res.data.result.length>0){
                    let ar = res.data.result.map((item,index)=>({...item,id:index+1}))
                    setServices(ar)
                }else{
                    setServices([])
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
            setError("Something went wrong")
        })
    },[])

    const getTotal = (finalS)=>{
        let finalServices = [...finalS,...dataList]
        let total = 0
        finalServices.forEach((current)=>{
            total = total+Number(current.price)
        })
        return total
    }


    const handleCreateBid = ()=>{
        
        let finalS = [];
        if(description.length<=0){
            setError("Please fill the mandatory field")
        }else{
            if(selection.length>0){
                finalS = selection.map(item=>services[item-1])
            }
            // axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/create-bid`, {eventId:props.location.state._id, description, services:[...finalS,...dataList], totalPrice:getTotal(finalS)}, {headers:{token:props.EventUser.user}})
            // .then(res=>{
            // console.log(res);
            // if(res.data.result==="Already Bided"){
            // setError("Already bided, updated your bid from 'my bids' section")
            // }else{
            //     props.history.push("/mybids")
            // }
            // })
            // .catch(err=>{
            //     setError("Something went wrong")
            //     console.log(err)
            // })
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/bid/update-bid`, 
                    {
                     bidId: myBid._id,
                         data: [
                             {"propName": "description", "value": description},
                             {"propName": "services", "value": [...finalS,...dataList]},
                             {"propName": "totalPrice", "value": getTotal(finalS)}
                         ]
                     }, 
                     {headers:{token:props.EventUser.user}})
                    .then(res=>{
                        setLoading(false)
                        console.log(res);
                     
                     props.history.push("/mybids")
                        
                    })
                    .catch(err=>{
                        console.log(err);
                        setLoading(false)
                    })
        }
        
        
        //console.log(finalS)
    }

    const onSubmit = (data)=>{
        setLoading(true)
        let categoryId=""
        console.log(data);
        if(mainCategoryR===""){
            setError("Please enter category")
        }
        else{
            setError("")
            let obj = {category:mainCategoryR,subCategory:data.subcategory,quantity:data.quantity,price:data.price,unit}
            let present = dataList.filter(item=>item.subCategory===obj.subCategory)
            if(present.length>0){
                setError("Already Added")
            }else{
                setDataList([...dataList,obj])
            }
            
            
        }
    }
    const filterData = (item)=>{
        let array = dataList.filter(elem=>item!==elem)
        setDataList(array)
        //setFinalServices(array)
    }
    console.log(dataList)
    return (
        <div className="row">
        <SimpleSnackbar open={open} setOpen={setOpen} message="Item added to my services" />
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={1} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container grey">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="add-services create-bid" onClick={()=>setDisplay(false)}>
        <h1 className="create-bid-heading">Edit Bid <GavelRoundedIcon sx={{fontSize:"1em"}} /> </h1>

        <div className="row">

            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">

            <section className="shadow-sm event-info">
            <h2>{props.location.state.name}</h2>
            <p>{props.location.state.description}</p>
            {
            props.location.state.reqServices.map((item,index)=>(
                <Chip sx={{margin:"0 1%"}} label={item} key={index} />
            ))
            }
            </section>


            </div>     

            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 scroll-div">
            <section className="shadow-sm form-section">
            <TextField
            className="mb-3"
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={2}
          onChange={(e)=>setDescription(e.target.value)}
          fullWidth
        />
            <h1 className="heading">Select your services</h1>

                            {services.length>0?   <div style={{ height: 300, width: '100%' }}>
                            <DataGrid
                            rows={services}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onStateChange={(e,c)=>setSelection(e.selection)}
                            />
                            </div>:null}

                    
                    
                            {/* end of data grid */}
                            
                            
                            <h1 className="heading mt-3">Or</h1>
                            <h1 className="heading">Create custom services</h1>
                            <form onSubmit = {handleSubmit(onSubmit)} className="addservicesform" >
                        <div className="auto-complete-div">
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
                    endIcon={<AddRoundedIcon />}
                    loading={loading?true:false}
                    type="submit" className="additem" variant="contained">Add Item</Button>
                    </div>
                    </form>
                    {
                                dataList.length>0?(
                                    <div className="tablediv">
                            <table class="ui celled table">
                <thead>
                    <tr><th>Category</th>
                    <th>Sub Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </tr></thead>
                <tbody>
                                    {dataList.map((item,index)=>(
                                        <tr>
                                        <td data-label="Name">{item.category}</td>
                                        <td data-label="Age">{item.subCategory}</td>
                                        <td data-label="Job">{item.quantity} {item.unit}</td>
                                        <td data-label="Job">{item.price} {props.EventUser.userInfo.curr}</td>
                                        <td data-label="delete">
                                            <IconButton onClick={()=>filterData(item)}>
                                                <DeleteRoundedIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                    ))}
                                    </tbody>
                </table>
                </div>
                                ):null
                            }
</section>
</div>
</div>
 
            <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add Services">
              <Fab 
              onClick={()=>handleCreateBid()} color="primary" variant="extended">
                Place Bid
                <GavelRoundedIcon sx={{ ml: 1 }} />
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

export default connect(mapStateToProps)(EditBid)

const columns = [
    { field: 'id', headerName: 'Sr', width: 70 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'subCategory', headerName: 'Sub Category', width: 130 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 90,
    },
    {
        field: 'unit',
        headerName: 'Unit',
        type: 'number',
        width: 90,
      },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 90,
      },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'lastName') || ''
    //     }`,
    // },
  ];
  
