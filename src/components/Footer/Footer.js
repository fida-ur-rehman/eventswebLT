import React from 'react'
import "./Footer.scss"
import {Link} from 'react-router-dom'
import Chip from '@mui/material/Chip';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
import ContactlessIcon from '@mui/icons-material/Contactless';
function Footer(props) {
    return (
        <div className={`row mx-auto ${props.footer}`} >

            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footercol">
            <h2 style={{fontSize:"3.5em"}}>EventPickl</h2>
            <p>Make sure to read our terms and policy before use</p>
            <p>© 2022</p>
            <p>Designed and developed by <a style={{color:"#5a1e96"}} href="https://tgsharjeel.vercel.app/">techgeeks</a></p>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footercol">
            <h2>Links <LinkIcon sx={{fontSize:"1.5em"}}/></h2>
            <p><Link className="link" to="/privacypolicy">Privacy Policy</Link></p>
            <p><Link className="link" to="/terms">Terms of use</Link></p>
            <p><Link className="link" to="/howitworks">How it works</Link></p>
            <p><Link className="link" to="/privacypolicy">FAQ's</Link></p>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 footercol">
            <h2><ContactlessIcon sx={{fontSize:"1.5em"}}/> Contact</h2>
            <div className="row">
                
            <div>
            <p><Chip label="Contact Us" className="p-2" icon={<CallRoundedIcon />} clickable   /></p>
            <p><Link to="/developers"><Chip label="Developers" className="p-2" icon={<GroupsRoundedIcon />} clickable   /></Link></p>
            <p><Chip label="LinkedIn" className="p-2" icon={<LinkedInIcon />} clickable   /></p>
            </div>
            
            <div className="mx-3">
            <p><Chip label="Instagram" className="p-2" icon={<InstagramIcon />} clickable  /></p>
            <p><Chip label="Facebook"  className="p-2" icon={<FacebookIcon />} clickable /></p>
            <p><Chip label="Whats app" className="p-2" icon={<WhatsAppIcon />} clickable   /></p>
            </div>

            </div>
            </div>
        </div>
    )
}

export default Footer
