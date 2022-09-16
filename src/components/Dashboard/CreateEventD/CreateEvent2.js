import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {connect} from 'react-redux'
import "./CreateEvent.scss"
import Alert from '@mui/material/Alert'
import axios from 'axios'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SimpleBackdrop from '../../utils/SimpleBackdrop'
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import date from 'date-and-time';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import {useForm} from 'react-hook-form'
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import Switch from '@mui/material/Switch';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import fx from 'money'
function CreateEvent2(props) {
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    let userInfo = props.user.userInfo
    let startDate = new Date()
    let endDate = date.addHours(startDate,24)
    startDate = date.addHours(startDate,1)
    const [start,setStart]=React.useState(startDate)
    const [end,setEnd]=React.useState(endDate)
    const [name,setName]=React.useState(userInfo.name)
    const [phone,setPhone]=React.useState(userInfo.mobileNo)
    const [address,setAddress]=React.useState(userInfo.address)
    const [email,setEmail]=React.useState(userInfo.email)
    const [eventName,setEventName]=React.useState("");
    const [description,setDescription]=React.useState("");
    const [eventAddresss,setEventAddress]=React.useState("")
    const [display,setDisplay]=React.useState(false)
    const [type,setType]=React.useState("Public")
    const [tag,setTag]=React.useState([])
    const [tagList,setTagList] = React.useState([])
    const [code,setCode]=React.useState("")
    const [privatephone,setPrivatePhone]=React.useState("")
    const [privateNumberList,setPrivateNumberList]=React.useState([])
    const [open, setOpen] = React.useState(false);
    const [limitSubs,setLimitSubs]=React.useState(false)
    const [allowContact,setAllowContact]=React.useState(true)
    const [groups,setGroups]=React.useState([])
    const [selectedGroups,setSelectedGroups]=React.useState([])
    const [tagTotal,setTagTotal]=React.useState(0)
    const [error,setError]=React.useState("")
    const [currency,setCurrency]=React.useState({})
    const [newService,setNewService]=React.useState({name:"",quantity:"",price:""})
    const [newServices,setNewServices]=React.useState([])
    const [totalBudget,setTotalBudget]=React.useState(0)
    const [allowService,setAllowService] = React.useState(true)
    const [displayToVendor,setDisplayToVendor]=React.useState(true)
    console.log("allow serv",allowService,newServices,displayToVendor)


    const getCurr = async ()=>{
      console.log(props.user.userInfo.curr);
      const res = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=e342da80-89cc-11ec-b105-457f4145383a&base_currency=${props.user.userInfo.curr}`)
      console.log(res)
      setCurrency(res.data.data)
    }

    React.useEffect(()=>{
      getCurr()
      if(props.location.state.addressSuggestion!==""){
          setValue("eventAddress",props.location.state.addressSuggestion)
      }
      console.log(fx)
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/category/all-category`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.data.msg==='Success'){
                setTag(res.data.result)
                axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/userContact/single-userContact`,{headers:{token:props.user.user}})
                .then(res=>{
                  if(res.data.result!=="No Contacts"){
                  setGroups(res.data.result.groups)
                  }
                  console.log("group response",res);
                })
                .catch(err=>{
                  console.log(err);
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },[props.location.state.addressSuggestion])

    const onSubmit = (data,e)=>{
       // let correctedStart=date.parse(start,'DD/MM/YYYY h:mm A')
        //let correctedEnd=date.parse(end,'DD/MM/YYYY h:mm A')
        let GroupList = []
        let groupListObj={}

        if(selectedGroups.length>0){
          selectedGroups.map(item=>{
            GroupList = GroupList.concat(item.list)
          })
        }
        if(privateNumberList.length>0){
          privateNumberList.map(item=>{
            GroupList = GroupList.concat(Object.entries(item))
          })
        }
        if(GroupList.length>0){
          GroupList = GroupList.map(item=>Object.fromEntries([item]))
          GroupList.map((item)=>{
            groupListObj={...groupListObj,...item}
          })
        }
        //problem is with group list array so private event cannot be seen for 4th user
      setOpen(true)
      console.log(GroupList);
      const obj = {mobileNo:phone, 
        email:email, 
        address:address, 
        name:data.eventName, 
        description:data.description, 
        type:type.toUpperCase(),
        contacts:groupListObj,
        location:props.location.state.eventLocation, 
        start:start, 
        end:end, 
        serviceTags:newServices,
        eventAddress:data.eventAddress,
        maxMembers: data.maximumattendees?data.maximumattendees:false,
        allowContact,
        showApproximation:displayToVendor,
        approximatePrice:totalBudget
        }
      console.log(obj)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/event/create-event`,
        obj,{headers:{token:props.user.user}})
        .then(result=>{
            setError("")
            setOpen(false)
            console.log(result)
            props.history.push("mycreation")
        })
        .catch(err=>{
          setOpen(false)
            setError("Something went wrong, check your inputs")
        })
    }

    const onSubmit2 = ()=>{
        if(code.length<=0 || privatephone.length<=0){
            setError("Enter Valid Inputs")
        }else{
            setError("")
            console.log(code);
        let e = false
        let codee = countries.filter(item=>item.label===code)
        let number = '+'+codee[0].phone+privatephone;
        let obj = {}
        obj[number]="web"
        privateNumberList.forEach(i=>{
            if(Object.keys(i)[0]===number){
                e=true
                setError("Already Added")
            }
        })
        if(!e){
            setPrivateNumberList([...privateNumberList,obj])
        }
        
        }
        
        //console.log(code,number);
    }
    console.log("private list",tagTotal,tagList);



    return (
        <div className="row">
          <SimpleBackdrop open={open} />
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={1} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container grey">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div className="createEventDiv2 shadow-sm" onClick={()=>setDisplay(false)}>
        <h1 className="heading1">Create an Event</h1>

        <form  onSubmit = {handleSubmit(onSubmit)}>
        <div className="inputdiv">
        <TextField 
        inputProps={{ maxLength: 20 }}
        {...register('eventName',{required:true})}
        fullWidth className="input" id="standard-basic" label="Create Event Name" variant="standard"  />

        <div className="datetimepicker">
        <LocalizationProvider 
        dateAdapter={AdapterDateFns} >
        <DateTimePicker
        inputFormat="dd/MM/yyyy hh:mm a"
            minDateTime={new Date(Date.now())}
            onError={(error)=>error==="invalidDate"?setError("Invalid Date"):setError("")}
            label="Select Start Date and Time"
            value={start}
            onChange={(newValue) => {
            setStart(newValue);
            }}
            renderInput={(params) => <TextField 
            
            sx={{width:'100%'}} {...params} />}
        />
        </LocalizationProvider>
        </div>

        <div className="datetimepicker">
        <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DateTimePicker
        inputFormat="dd/MM/yyyy hh:mm a"
            label="Select End Date and Time"
            minDateTime={new Date(Date.now())}
            onError={(error)=>error==="invalidDate"?setError("Invalid Date"):setError("")}
            value={end}
            onChange={(newValue) => {
            if(newValue<start){
              console.log(newValue,start)
                setError("End Date should be greater than start")
            }else{
              setError("")
               setEnd(newValue);
            }
            
            }}
            renderInput={(params) => <TextField 
            
            sx={{width:'100%'}} {...params} />}
        />
        </LocalizationProvider>
        </div>


        <TextField 
        inputProps={{ maxLength: 200 }}
        {...register('description',{required:true})}
        fullWidth className="input" id="standard-basic" label="Description" variant="standard"  />
        <TextField 
        inputProps={{ maxLength: 95 }}
        {...register('eventAddress',{required:true})}
        fullWidth className="input" id="standard-basic" label="Event Address" variant="standard" />
        <RadioGroup
        row
        aria-label="Event Type"
        defaultValue="Public"
        name="row-radio-buttons-group"
        onChange = {(e)=>setType(e.target.value)}
        value={type}
      >
        <FormControlLabel value="Public" control={<Radio />} label="Public" />
        <FormControlLabel value="Private" control={<Radio />} label="Private" />
        
      </RadioGroup>
        </div>
        {
            type==="Private"?(
                <div className="privatediv">
                    <h1>Invite People</h1>
                    <Autocomplete
                    className="autocomplete"
        onInputChange={(e,n)=>setCode(n)}
      id="country-select-demo"
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
          
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
        
      )}
    />
    <TextField
    variant="outlined"
    className="mobilenumber"
    label="Mobile Number"
    value={privatephone}
    onChange={(e)=>setPrivatePhone(e.target.value)}
  //   onInput = {(e) =>{
  //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
  // }}
    />
    <Button className="addbutton" onClick={()=>onSubmit2()} variant="contained" >Add Number</Button>
    {
        privateNumberList.length>0?(
            privateNumberList.map((item,index)=>(
                    <Chip
                    className="numberchip"
        label={Object.keys(item)[0]}
        deleteIcon={<ClearIcon />}
        //onClick={handleClick}
        onDelete={()=>{
            let arr = privateNumberList.filter(e=>e!==item)
            setPrivateNumberList(arr)
        }}
      />
                    
            ))
        ):null
    }

    <h1>Invite groups</h1>
    {
      groups.length>0?(
        groups.map((item,index)=>(
          <FormControlLabel 
                    key={index}
                    control={<Checkbox 
                    value={item.groupName}
                    onChange={()=>{
                        if(selectedGroups.length>0){
                          selectedGroups.map((group,indexg)=>{
                            if(group.groupName===item.groupName){
                              selectedGroups.splice(indexg,1)
                              setSelectedGroups([...selectedGroups])
                            }else{
                              setSelectedGroups([...selectedGroups,item])
                            }
                          })
                        }else{
                          setSelectedGroups([...selectedGroups,item])
                        }
                        
                    }}
                    />} 
                    label={item.groupName} />
        ))
      ):<p>You haven't added any groups</p>
    }
                </div>
            ):null
        }
        <FormGroup className="inputdiv">
      <FormControlLabel control={<Switch onChange={()=>setLimitSubs(!limitSubs)} />} label="Limit subscribers / attendee" />
    </FormGroup>
    {
      limitSubs?(
        <div className="inputdiv">
          <TextField 
          fullWidth
        {...register('maximumattendees',{required:true})}
        id="filled-basic" label="Enter maximum subscribers"  variant="filled"  />
        </div>
      ):null
    }

        <h1>Contact Info</h1>

        <div className="inputdiv">
        <TextField value={name} onChange={(e)=>setName(e.target.value)} fullWidth className="input" id="standard-basic" label="Name" variant="standard" />
        <TextField value={phone} onChange={(e)=>setPhone(e.target.value)} fullWidth className="input" id="standard-basic" label="Phone" variant="standard"  />
        <TextField value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth className="input" id="standard-basic" label="Email" variant="standard" />
        <TextField value={address} onChange={(e)=>setAddress(e.target.value)} fullWidth className="input" id="standard-basic" label="Address" variant="standard"  />
        </div>


        <h1>Add Services</h1>
        <div className="inputdiv">
            <FormControlLabel value={allowService} onChange={()=>setAllowService(!allowService)} control={<Checkbox defaultChecked />} label="Do You want services for your event" />

          {allowService&&<>
          <TextField onChange={(e)=>setNewService({...newService,name:e.target.value})} fullWidth className="input" variant="filled" id="filled-basic" label="Service Name" />
          <TextField onChange={(e)=>setNewService({...newService,quantity:e.target.value})} fullWidth className="input" variant="filled" id="filled-basic" label="Service Quantity" />
          <TextField onChange={(e)=>setNewService({...newService,price:e.target.value})} fullWidth className="input" variant="filled" id="filled-basic" label="Service Price" />
          <div>
          <Button onClick={()=>{
            if(newService.name.length>0 && newService.quantity.length>0 && newService.price.length>0){
              if(!newServices.filter(i=>i.name===newService.name).length>0){
                setTotalBudget(totalBudget+parseInt(newService.price))
                setNewServices([...newServices,newService])
              }
            }
            
          }}>Click to Add Service</Button>
          </div>
          {
            newServices.map((item,index)=><Chip key={index} className="m-3" label={`${item.quantity} ${item.name} - ${item.price}`} onDelete={()=>setNewServices(newServices.filter(i=>i.name!==item.name))} />)
          }
          <TextField onChange={(e)=>setTotalBudget(e.target.value)} value={totalBudget} fullWidth className="input" variant="filled" id="filled-basic" label="Total Budget of the Event" />
          <FormControlLabel 
        value={displayToVendor}
        control={<Checkbox value={displayToVendor} defaultChecked onChange={()=>setDisplayToVendor(!displayToVendor)} />}
        label="Display approximation on vendor side"
        />
        </>}
          <FormControlLabel 
        value={allowContact}
        control={<Checkbox value={allowContact} defaultChecked onChange={()=>setAllowContact(!allowContact)} />}
        label="Allow vendors and users to contact you"
        />
          </div>
        {/* <h1 className="service-tagh1">Service Tags</h1>
        <p style={{color:"#ccc"}}><i>service tags will help vendor put appropriate bid</i></p>
        <FormGroup 
        className="check-group"
        row>

        {
            tag.length>0?(
                tag.map((item,index)=>(
                    <FormControlLabel 
                    key={index}
                    control={<Checkbox 
                    value={tagList.includes(item.name)?true:false}
                    icon={<LocalOfferOutlinedIcon />}
                    checkedIcon={<LocalOfferRoundedIcon color="primary" />}
                    onChange={()=>{
                        if(tagList.includes(item.name)){
                            let filteredarray = tagList.filter(e=>e!==item.name)
                            let num = parseInt(item.approximation);
                          let val = currency[item.currency]
                          let total = num/val.value
                            setTagTotal(tagTotal-total)
                            setTagList(filteredarray)
                        }else{
                          let num = parseInt(item.approximation);
                          let val = currency[item.currency]
                          let total = num/val.value
                            setTagTotal(tagTotal+total)
                            setTagList([...tagList,item.name])
                        }
                    }}
                    />} 
                    label={item.name} />
                ))
            ):<p>No service tags</p>

        }
            </FormGroup>
         {tagTotal!==0?
         <div style={{margin:"2% 20%"}}>
         <p style={{fontWeight:"bold",fontSize:"1.2em"}}>Approximate cost : {Math.floor(tagTotal)} {props.user.userInfo.curr}</p>
         <p style={{color:"#ccc"}}><i>Note : approximate cost is on an average cost you'll require for your event if you have selected specific tags, this is not an actual cost, cost may vary from place to place</i></p>
         </div>
         :null} */}

          <div>
            <Button 
            className="submitbutton"
            type="submit"
            disabled={error.length>0?true:false}
            variant="contained">
            Create Event
            </Button>
            </div>

            {/* end of block */}
            </form>
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

export default connect(mapStateToProps)(CreateEvent2)


const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true,
    },
    {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61',
    },
    {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243',
    },
    {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236',
    },
    {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500',
    },
    {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869',
    },
    {
      code: 'KP',
      label: "Korea, Democratic People's Republic of",
      phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
      code: 'LA',
      label: "Lao People's Democratic Republic",
      phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
      code: 'MD',
      label: 'Moldova, Republic of',
      phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
      code: 'MF',
      label: 'Saint Martin (French part)',
      phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
      code: 'MK',
      label: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
      code: 'MP',
      label: 'Northern Mariana Islands',
      phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
      code: 'PM',
      label: 'Saint Pierre and Miquelon',
      phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
      code: 'PS',
      label: 'Palestine, State of',
      phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
      code: 'SJ',
      label: 'Svalbard and Jan Mayen',
      phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
      code: 'ST',
      label: 'Sao Tome and Principe',
      phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
      code: 'SX',
      label: 'Sint Maarten (Dutch part)',
      phone: '1-721',
    },
    {
      code: 'SY',
      label: 'Syrian Arab Republic',
      phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
      code: 'TC',
      label: 'Turks and Caicos Islands',
      phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
      code: 'TF',
      label: 'French Southern Territories',
      phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
      code: 'TT',
      label: 'Trinidad and Tobago',
      phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
      code: 'TW',
      label: 'Taiwan, Province of China',
      phone: '886',
    },
    {
      code: 'TZ',
      label: 'United Republic of Tanzania',
      phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
      code: 'US',
      label: 'United States',
      phone: '1',
      suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
      code: 'VA',
      label: 'Holy See (Vatican City State)',
      phone: '379',
    },
    {
      code: 'VC',
      label: 'Saint Vincent and the Grenadines',
      phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
      code: 'VG',
      label: 'British Virgin Islands',
      phone: '1-284',
    },
    {
      code: 'VI',
      label: 'US Virgin Islands',
      phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
  ];
