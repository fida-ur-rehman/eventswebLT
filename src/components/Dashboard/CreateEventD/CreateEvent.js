import React from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead/Dashhead'
import Marker from '../../utils/Marker/Marker'
import GoogleMapReact from 'google-map-react';
import {regionFrom} from '../../utils/deltaCalculator'
import "./CreateEvent.scss"
import Alert from '@mui/material/Alert'
import OwnMarker from '../../utils/Marker/OwnMarker';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import axios from 'axios'
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
function CreateEvent(props) {
    const [display,setDisplay]=React.useState(false)
    const [location,setLocation]=React.useState({center:{lat:59.95,lng:30.33},zoom:11})
    const [eventLocation,setEventLocation]=React.useState({})
    const [eventCenter,setEventCenter]=React.useState({})
    const [loc,setLoc]=React.useState([])
    const [error,setError]=React.useState("")
    const [address,setAddress]=React.useState("")
    const [addressSuggestion,setAddressSuggestion]=React.useState("")

 

    const handlePress = (ar)=>{
      //let point = {lat:ar.lat,lng:ar.lng,accuracy:99.999}
      setEventLocation(regionFrom(ar.lat,ar.lng,99.999))
      //console.log(regionFrom(ar.lat,ar.lng,99.999))
    }
    const getGeo = async ()=>{
      window.navigator.geolocation.getCurrentPosition((loca)=>{
        setLocation({center:{lat:loca.coords.latitude,lng:loca.coords.longitude},zoom:18})
      },(err)=>setError(err.message));
    }
    React.useEffect(()=>{
      //console.log(navigator);
      getGeo()
      // var config = {
      //   method: 'get',
      //   url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyBOzAkOqCVMjP4hXIkabfHi40vJ8afKKZ4',
      //   headers: { }
      // };
      
      // axios(config)
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    
    },[])

    
  const handleChange = address => {
    setAddress(address);
  };


    const handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          console.log('Success', latLng)
          let {lat,lng}=latLng
          setEventCenter({center:{lat,lng},zoom:18})
        })
        .catch(error => console.error('Error', error));
    };

    
    
    return (
        <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={1} display={display} />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container">
            <span className="iconbutton">
        <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
         </IconButton>
         </span>

        <div onClick={()=>setDisplay(false)} className="createEventDiv">
        <div style={{ height: '90vh', width: '100%' }} >
          <h1 >Click to select event location</h1>
         
        {/* auto compelte html */}

        <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='autocomplete-container'>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span onClick={()=>{
                console.log(suggestion)

                setAddressSuggestion(suggestion.description)

                    }}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {/* auto complete html end */}









    <GoogleMapReact
    onClick={(ar)=>handlePress(ar)}
      bootstrapURLKeys={{ key: 'AIzaSyC4e6FM7KdtXRbtgqe0mMtMoKDRgkn3nik'}}
      defaultCenter={location.center}
      defaultZoom={location.zoom}
      center={Object.keys(eventCenter).length>0&&eventCenter.center}
    >
      <OwnMarker 
      lat = {location.center.lat}
      lng={location.center.lng}
      text="My Location"
      />
      {Object.keys(eventLocation).length>0?<Marker
        lat={eventLocation.latitude}
        lng={eventLocation.longitude}
        text="Event Location"
      />:null}
    </GoogleMapReact>
  </div>
        
  <div 
  
  style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Create Event">
              <Fab  disabled={Object.keys(eventLocation).length>0?false:true} variant="extended" onClick={()=>{console.log("h");props.history.push("/createevent2",{eventLocation,addressSuggestion})}} color="primary" aria-label="add">
              Next
                <ArrowForwardIosRoundedIcon  sx={{ marginLeft:1,fontSize:"1.2em"}} />  
              </Fab>
              </Tooltip>
              </div>

            {/* end of block */}
        </div>
        </div>
        {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
    </div>
    )
}

export default CreateEvent
