import React from 'react'
import Header from './Header/Header'
import {ReactComponent as MapLogo} from '../Images/connectedmap.svg'
import "./Home.scss"
import {ReactComponent as CreateEv} from '../Images/undraw_date_picker_gorr.svg'
import {ReactComponent as Subscribe} from '../Images/undraw_happy_feeling_slmw.svg'
import {ReactComponent as Vendor} from '../Images/undraw_under_construction_-46-pa.svg'
import {ReactComponent as Globe} from '../Images/undraw_world_re_768g.svg'
import {ReactComponent as Organizer} from '../Images/undraw_events_re_98ue.svg'
import {ReactComponent as VendorR} from '../Images/undraw_street_food_re_uwex.svg'
import {ReactComponent as Subscriber} from '../Images/undraw_having_fun_re_vj4h.svg'
import AppleIcon from '@mui/icons-material/Apple';
import Footer from './Footer/Footer'
import ShopIcon from '@mui/icons-material/Shop';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating'

const Home = () => {
    return (
        <div>
            <Header id="1"/>
            <div className="padded-container ">
            <div className="firstsection row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">

             <section>   
            <h1>Create, Subscribe, and Vendor any event </h1>
            <p>
                Events is a platform where you can create an event, subscribe a event and vendor a event. All three roles in just one platform, everything on just a single click without any lag. come join our community and explore the world of events
            </p>
            <div className="row">
            <Button  variant="contained" endIcon={<ShopIcon />}  >
            PlayStore
            </Button>
            <Button
            variant="outlined" startIcon={<AppleIcon />} >
            Appstore
            </Button>
               
            </div>
            </section>

            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <Globe className="maplogo" />
            </div>
            </div>

            {/* second section 2.1  */}
            <section className="s2">
                <h1 className="headingwithpad">Your roles</h1>
                <div className="row s2-parent-card justify-content-between">

                    <div className="s2-card shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <Organizer className="cardimage"/>
                    <h2>Organizer</h2>
                    <p>An organizer is a role which can create a event, hire vendors, manage subscribers.</p>
                    </div>

                    <div className="s2-card shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <VendorR className="cardimage"/>
                    <h2>Vendor</h2>
                    <p>A vendor is a role which can provide service to an event by placing bid on that particular event</p>
                    </div>

                    <div className="s2-card shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <Subscriber className="cardimage" />
                    <h2>Subscriber</h2>
                    <p>An event subscriber can also be called as an attendee who can get updates of that particular event</p>
                    </div>


                </div>
            </section>
            

            {/* second section 2.1  */}




            {/* start of the second section  */}
            <div className="secondsection">
            <h1 className="headingwithpad">Steps Involved</h1>
            <div className="row my-5">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <CreateEv className="svg" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <h2>Create an Event</h2>
                    <p>
                    This is event creation page which has various fields such as name of the event, start date and time,
end date and time, description, event address, public or private event, if private event then it asks
for the mobile numbers of users whom organizer want to invite to this particular, so they’ll be
automatically subscribed to this event. 

                    </p>
                </div>
            </div>
            <div className="row my-5">
                <div className="alignright col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <h2>Subscribe an Event</h2>
                    <p>
                    You can subscribe to events to get the latest notifications from those events. You can find a Subscribe button under any event you created. Once you subscribe to a event, any new notification it publishes will show up in your notification feed.
                    </p>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <Subscribe className="svg" />
                </div>
            </div>

            <div className="row my-5">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <Vendor className="svg" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <h2>Vendor an Event</h2>
                    <p>
                    You can vendor any event of your choice. you can provide various services to an event by looking at the service tags associated to the event. Service tags will help you place a bid on that event and similarly event organizer will accept your bid if he likes your proposal
                    </p>
                </div>
            </div>

            </div>
            {/* start of the second section  */}


            {/* start of third section */}

            <div className="thirdsection">
            <h1 className="headingwithpad">Why choose events?</h1>
            <p>
            An event is an effective channel for the streamlined delivery of effective and engaging communications. By adopting a single mobile solution for every meeting or event year round, event mangers are able to focus on driving attendance and engagement, rather than wasting paper and ink.
            </p>
            </div>

            {/* start of third section */}

            {/* fourth section ------------ */}
            <div className="fourthsection">
            <h1 className="headingwithpad">Our happy users</h1>
                <div className="row justify-content-between">
                    <div className="shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <h2>Gireesh</h2>
                        <Rating name="read-only" className="mb-4" value={5} readOnly />
                        <p>
                        This site definitely  appeals to the average person because the layout
is so  simple  but very  VERY  effective.  It is a clean  site  with a
flawless  look, and someone  without any  technical  background  would
definitely  appreciate  it.  The layout makes anyone feel  comfortable
because it is so well done and clean  looking.  You feel as if you are
in good hands and you know that you will be able to find  anything you
need on this site.
                        </p>
                    </div>
                    <div className="shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <h2>Vishnu</h2>
                        <Rating name="read-only" className="mb-4" value={5} readOnly />
                        <p>
                        The load time of the page is quite  fast,  even with the  moving  link
buttons.  I did not find any typos or broken  links,  just  very  well
written  information!  There are  sufficient  meta tags on the  pages.
The  CharityFocus  logo is present on the main page but not on the sub
pages.  Overall a great site with not only great design but  excellent
content as well.  Great job to everyone involved.
                        </p>
                    </div>
                    <div className="shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <h2>John Doe</h2>
                        <Rating name="read-only" className="mb-4" value={5} readOnly />
                        <p>
                        This site  would  appeal to the  average  person in the way that it is
very simply  done, and  everything  is very easy to find.  There is no
messing  around  here, just the  information  that they want to convey
presented in the simplest way possible.  People with no technical back
ground  would  definitely   appreciate  the  simplicity  and  ease  of
navigation in this site.
                        </p>
                    </div>
                </div>


            </div>
            {/* fourth section ------------ */}
            </div>
            <Footer footer="fullfooter" />

        </div>
    );
}

export default Home;