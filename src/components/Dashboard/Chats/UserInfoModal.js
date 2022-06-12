import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function BasicModal(props) {
let details;
let detailsEvents;
if(Object.keys(props.organizerInfo).length>0){
  details = props.organizerInfo
detailsEvents = details.myEvents.filter((item)=>item.type.toLowerCase()!=="private")
}


  return (
    <div>
      <Modal
        open={props.open}
        onClose={()=>props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {Object.keys(props.organizerInfo).length>0&&<div>
            <h2>{details.name}</h2>
            <p>{details.email}</p>
            <h3>{details.name}'s Events</h3>
            {
              detailsEvents.length>0&&(
                detailsEvents.map((item,index)=>(
                  <section className='chat-events' key={index}>
                    <h4>{item.name}</h4>
                    <p className="description">Description: {item.description}</p>
                    <p className="address">Address: {item.address}</p>
                  </section>
                ))
              )
            }
          </div>}
        </Box>
      </Modal>
    </div>
  );
}