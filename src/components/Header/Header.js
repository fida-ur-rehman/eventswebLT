import React from 'react'
import "./Header.scss"
import {Link} from 'react-router-dom'
import iconImage from '../../Images/icon.png'
import {connect} from 'react-redux'
import Button from '@mui/material/Button'


const Header = (props) => {
	React.useEffect(()=>{

	},[props.user])
console.log(props);
	return (
        <div className="p-4 rounded" style={{margin:"auto 5%"}}>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark   navbarclass " >
	<div className="container-fluid">
        <Link to="/"><img src={iconImage} height={50} width={50} alt="eventfavicon" /></Link>
		{/* <Link className="navbar-brand"  style={{color:"black"}} to="/"><img style={{height:"6vh"}} src={Logo} /></Link> */}
	<button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
		<span className="navbar-toggler-icon" ></span>
	</button>
	<div className="collapse navbar-collapse" id="navbarResponsive">
		<ul className="navbar-nav ml-auto" id="nav">
			<li className="nav-item">
			{props.id==="2"?<Link  className="nav-link active" to="/privacypolicy">Privacy Policy</Link>:<Link  className="nav-link"  to="/privacypolicy">Privacy Policy</Link>}
			</li>
			<li className="nav-item">
			{props.id==="3"?<Link  className="nav-link active" to="/howitworks">How it works</Link>:<Link  className="nav-link"  to="/howitworks">How it works</Link>}
			</li>
			<li className="nav-item">
			{props.id==="4"?<Link  className="nav-link active" to="/terms">Terms</Link>:<Link  className="nav-link"  to="/terms">Terms</Link>}
			</li>
			<li className="nav-item">
			{props.userToken?
			<Link  className="nav-link active" to="/dashboard">
				<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large" className="btn-purple">dashboard</Button>
				</Link>:
			<Link  className="nav-link"  to="/signup">
				<Button sx={{fontSize:"1.1rem"}} variant="contained" size="large"  className="btn-purple">SignUp</Button>
				</Link>}
			</li>
			
			
		</ul>
	</div>
</div>
</nav>
</div>
    );

}
const mapStateToProps =({EventUser})=>{
	return {
		userToken:EventUser.user
	}
	}
export default connect(mapStateToProps)(Header);