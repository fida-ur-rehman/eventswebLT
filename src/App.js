import "./App.scss"
import {Route,Switch,Redirect} from 'react-router-dom'
import Home from './components/Home'
import SignUp from "./components/SignUp/SignUp";
import Otp from './components/SignUp/Otp'
import AddInfo from './components/SignUp/AddInfo'
import Dashboard from "./components/Dashboard/Dashboard";
import MyCreation from "./components/Dashboard/MyCreation/MyCreation";
import MySubscription from "./components/Dashboard/MySubscription/MySubscription";
import MyBids from "./components/Dashboard/MyBids/MyBids";
import Chats from "./components/Dashboard/Chats/Chats";
import MyAccount from "./components/Dashboard/MyAccount/MyAccount";
import EventDetail from './components/Dashboard/EventDetail'
import CreateEvent from "./components/Dashboard/CreateEventD/CreateEvent";
import CreateEvent2 from './components/Dashboard/CreateEventD/CreateEvent2'
import EditEvent from "./components/Dashboard/CreateEventD/EditEvent";
import MyServices from './components/Dashboard/MyAccount/MyServices/MyServices'
import AddServices from "./components/Dashboard/MyAccount/MyServices/AddServices";
import ChatsT from './components/Dashboard/testchats/ChatsT'
import BidsScreen from "./components/Dashboard/MyBids/BidsScreen";
import CreateBid from "./components/Dashboard/MyBids/CreateBid";
import OrganizerBid from "./components/Dashboard/MyBids/OrganizerBid";
import MyApprovals from "./components/Dashboard/MyAccount/MyApprovals/MyApprovals";
import Reminders from "./components/Dashboard/Reminders/Reminders";
import FeedBackForm from "./components/Dashboard/MyCreation/FeedBackForm";
import FindVendors from "./components/Dashboard/MyAccount/FindVendors/FindVendors";
import MyGroups from "./components/Dashboard/MyAccount/MyGroups/MyGroups";
import FillFeedbackForm from "./components/Dashboard/MySubscription/FillFeedbackForm";
import CrudGroup from './components/Dashboard/MyAccount/MyGroups/CrudGroup'
import Developers from "./components/Pages/Developers/Developers";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Terms from './components/Terms/Terms'
import EditEventMap from './components/Dashboard/CreateEventD/EditEventMap'
import EditBid from "./components/Dashboard/MyBids/EditBid";


function App() {
  return (
    <Switch>
      <Route exact path="/" render={()=><Redirect to="/home" />} />

      <Route exact path="/home" component={Home} />
      <Route path="/eventdetail" component={EventDetail} />
      <Route path="/signup" component={SignUp} />
      <Route path="/otp" component={Otp} />
      <Route path="/addInfo" component={AddInfo} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/mycreation" component={MyCreation} />
      <Route path="/mysubscription" component={MySubscription} />
      <Route path="/mybids" component={MyBids} />
      <Route path="/chats" component={Chats} />
      <Route path="/myaccount" component={MyAccount} />
      <Route path="/createevent" component={CreateEvent} />
      <Route path="/createevent2" component={CreateEvent2} />
      <Route path="/editevent" component={EditEvent} />
      <Route path="/myservices" component={MyServices} />
      <Route path="/addservices" component={AddServices} />
      <Route path="/testchats" component={ChatsT} />
      <Route path="/bidsscreen" component={BidsScreen} />
      <Route path="/createbid" component={CreateBid} />
      <Route path="/organizerbid" component={OrganizerBid} />
      <Route path="/myapprovals" component={MyApprovals} />
      <Route path="/reminders" component={Reminders} />
      <Route path="/feedbackform" component={FeedBackForm} />
      <Route path="/findvendors" component={FindVendors} />
      <Route path="/mygroups" component={MyGroups} />
      <Route path="/fillfeedbackform" component={FillFeedbackForm} />
      <Route path="/crudgroup" component={CrudGroup} />
      <Route path="/developers" component={Developers} />
      <Route path="/privacypolicy" component={PrivacyPolicy} />
      <Route path="/howitworks" component={HowItWorks} />
      <Route path="/terms" component={Terms} />
      <Route path="/editeventmap" component={EditEventMap} />
      <Route path="/editbid" component={EditBid} />
    </Switch>
  );
}

export default App;
