import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {connect} from 'react-redux'
import {hideReport} from '../../redux/report/ReportActions'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Reports(props) {
  const [value, setValue] = React.useState('Scam or fraud');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
console.log(props,value)
const handleReport=()=>{
  axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/report/create-report`,{itemId:props.report.id,collectionName:props.report.type,reason:value},{headers:{token:props.user}})
  .then(res=>{
    console.log(res)
      if(res.data.msg==="Success"){
        props.hideReport()
      }
  })
  .catch(err=>{
      console.log(err);
  })
}
  return (
    <div>
      <Modal
        open={props.report!==false?true:false}
        onClose={()=>props.hideReport(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Report
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Select Report Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="Scam or fraud" control={<Radio />} label="Scam or fraud" />
            <FormControlLabel value="It's spam" control={<Radio />} label="It's spam" />
            <FormControlLabel value="Intellectual property violation" control={<Radio />} label="Intellectual property violation" />
            <FormControlLabel value="Sale of illegal or regulated goods" control={<Radio />} label="Sale of illegal or regulated goods" />
            <FormControlLabel value="Hate speech or symbols" control={<Radio />} label="Hate speech or symbols" />
            <FormControlLabel value="False information" control={<Radio />} label="False information" />
            <FormControlLabel value="Violence or dangerous organizations" control={<Radio />} label="Violence or dangerous organizations" />
          </RadioGroup>
        </FormControl>
        <div style={{textAlign:"right"}}> 
        <Button variant="contained" onClick={()=>handleReport()}>Submit</Button>
        </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
const mapStateToProps = ({report,EventUser})=>{
return {
    report,
    user:EventUser.user
}
}

const mapDispatchToProps = (dispatch)=>{
    return {
        hideReport:()=>dispatch(hideReport())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Reports)