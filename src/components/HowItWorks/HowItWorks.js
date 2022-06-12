import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./HowItWorks.scss"
function HowItWorks() {
  return (
    <div >
        <Header id="3" />
        <div className="privacypolicy">
       <h1>How it works</h1>
<p>
1
1.Introduction and Description
1.1 Introduction
Events play an important role in our society. Any happening or an activity can be referred as an
event. Individuals often find they lack the expertise and time to plan events themselves.
Independent planners are needed to step in and give these special events the attention they deserve.
In the current scenario, planning an event requires a lot of patience and hustle bustle right from
deciding the theme to deciding venue and events. Lots of factors need to be considered while
making each decision. Also, once the party is planned lot of on the day issues such as maintaining
low noise levels after a particular time, or neighbors complaining about the noise levels etc. take
the fun out of the party/event. To manage such issues, we require an easy-to-use app that will help
in effectively tracking such problems. In this research work, we are going to make use of the smart
phone through which the event management is made feasible with the help of a customized android
application.
1.1 Necessity
Nowadays event management is becoming more popular as there is less time for the people to
organize all the events on their own. Everybody needs extra hands to arrange their events. From
birth to death there are many events that you need to arrange and organizing it properly is a task
that needs lots of attention. To organize it properly you need to plan all the events. Not only
planning well is going to help, but you also need to execute all that on time and with the expertise
to make your event successful. In the process of execution, you need to coordinate with many
people.
If the events need to plan by experts so, that they can be executed properly, or else you are going
to lose your money and time over nothing. Event planners are becoming more and more popular
in our life. They have working procedures but if you add software to that then it will make them
more efficient and productive. The event planners can get the assistance of the software and it
makes their work easier. It will plan full events accordingly and you just need to follow the plans.
If there was an unfortunate occurrence, then it will also help you by suggesting the solutions to the
current situation.
2
1.2 Objective
The main goal of the project is to create an event app where event organizer can create events via
vendors or without vendors and people can Subscribe events, where vendor can provide services
to event or event organizer and create their own services, bid on event then organizer can approve
any of the bids which he/she likes, app provides easy way to chat with each other like vendor can
chat with organizer for negotiation for the prices of services or user can chat with organizer to get
more information about events
3
2.Literature review
2.1 Event App
2.1.1 Definition
A conference app, also known as an event app or meeting app, is a mobile app developed to help
attendees and meeting planners manage their conference experience. It typically includes
conference proceedings and venue information, allowing users to create personalized schedules
and engage with other users.
2.1.2 Problem
Currently Event Management system is manual and only accessible to staff. The client must travel
to the company offices to schedule, book and organize an event such as Birthday Party, Marriage,
Reception, Ring Ceremony. Clients pay cash to book for an event which is inconveniencing when
customers are many at the company. It takes lots of time of customer because they must search
such event organizer and contact them individually so an online event management system is
needed which will enable the customer make booking, schedule events online at any preferred
time.
2.1.3 Benefits of Event
The potential benefits of hosting major events from the perspective of the visitor economy include:
1. Structural expansion of the visitor economy: Visitors coming to a city or region for an event
will contribute to a more buoyant economy, with visitor expenditure having a multiplier effect on
incomes throughout related supply chains. With the multiplier effect the host destination shall
benefit in terms of employment, income, and better standards of living.
2. Alignment of tourism with other strategies: The requirements of hosting a major event can be
used to, promote an integrated whole-of government approach, and maximize synergies between
relevant development and growth infrastructures constructed for events are one of the most visible
lasting legacies for a host city or region and can have real impacts for tourism growth.
4
3. Marketing and promotion: Pre-event branding associated with the successful hosting of a major
event, can provide lasting recognition of destination branding in key tourism markets, encourage
return visitation of attendees or participants, and a better understanding of the focus of the event
such as sport, arts and culture, food etc.
4. Environmental impacts: The international focus often associated with major events can help to
prioritize work on an often under-developed or neglected built environment and therefore the
attractiveness and competitiveness of destinations. In addition, ensuring that events are managed
in an environmentally friendly manner is also becoming a high priority in terms of branding.
A positive legacy can encourage community and stakeholder support for an event, represent a
tangible return on investment, or justification for public expenditure. However, to achieve a
positive result requires strategic planning well in advance of the event, adoption of a long-term
perspective and evaluation throughout the event lifecycle, from inception through to the post-event
period. Any infrastructure
2.2 Technologies
2.2.1 MERN Stack and What is MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up
the stack.
• MongoDB - document database
• Express JS- Node.js web framework
• React JS- A client-side JavaScript framework
• Node JS - The premier JavaScript web server
Express and Node make up the middle (application) tier. Express.js is a server-side web
framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which
variant you choose ME(RVA)N is the ideal approach to working with JavaScript and JSON, all
the way through. [5]
5
2.2.2 How does MERN Stack Works?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend,
backend, database) entirely using JavaScript and JSON. [5]
Figure. 2.1 MERN stack Working [5]
2.2.3 React Native and React JS as Frontend
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating
dynamic client-side applications in HTML. React lets you build up complex interfaces through
simple Components, connect them to data on your backend server, and render them as HTML.
Reacts strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain,
and it has all the bells and whistles you’d expect from a modern web framework: great support for
forms, error handling, events, lists, and more. [1]
6
2.2.4 React JS Features
JSX:
JSX stands for JavaScript XML. It is a JavaScript syntax extension. It’s an XML or HTML like
syntax used by ReactJS. This syntax is processed into JavaScript calls of React Framework. It
extends the ES6 so that HTML like text can co-exist with JavaScript react code. It is not necessary
to use JSX, but it is recommended to use in ReactJS. [1]
Components:
ReactJS is all about components. ReactJS application is made up of multiple components, and each
component has its own logic and controls. These components can be reusable which help you to
maintain the code when working on larger scale projects. [1]
One-way Data Bin:
ReactJS is designed in such a manner that follows unidirectional data flow or one-way data
binding. The benefits of one-way data binding give you better control throughout the application.
If the data flow is in another direction, then it requires additional features. It is because components
are supposed to be immutable and the data within them cannot be changed. Flux is a pattern that
helps to keep your data unidirectional. This makes the application more flexible that leads to
increase efficiency. [1]
Virtual DOM:
A virtual DOM object is a representation of the original DOM object. It works like a one-way data
binding. Whenever any modifications happen in the web application, the entire UI is re-rendered
in virtual DOM representation. Then it checks the difference between the previous DOM
representation and new DOM. Once it has done, the real DOM will update only the things that
have changed. This makes the application faster, and there is no wastage of memory. [1]
Simplicity:
ReactJS uses JSX file which makes the application simple and to code as well as understand. We
know that ReactJS is a component-based approach which makes the code reusable as your need.
This makes it simple to use and learn. [1]
7
Performance:
ReactJS is known to be a great performer. This feature makes it much better than other frameworks
out there today. The reason behind this is that it manages a virtual DOM. The DOM is a crossplatform and programming API which deals with HTML, XML or XHTML. The DOM exists
entirely in memory. Due to this, when we create a component, we did not write directly to the
DOM. Instead, we are writing virtual components that will turn into the DOM leading to smoother
and faster performance. [1]
2.2.5 Express and Nodejs Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server.
Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that
is indeed exactly what it is. Express.js has powerful models for URL routing (matching an
incoming URL with a server function), and handling HTTP requests and responses. [4]
By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you
can connect to Express.js functions that power your application. Those functions in turn use
MongoDB’s Node.js drivers, either via call-backs for using Promises, to access and update data in
your MongoDB database. [4]
2.2.4 MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then
you’re going to want a database that’s just as easy to work with as React, Express, and Node. [5]
That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent
to the Express.js server, where they can be processed and (assuming they’re valid) stored directly
in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas.
If you’re looking to set up your own MERN stack, read on! [5]
8
2.2.5 Why MERN Stack?
Let’s start with MongoDB, the document database at the root of the MERN stack. MongoDB was
designed to store JSON data natively (it technically uses a binary version of JSON called BSON),
and everything from its command line interface to its query language (MQL, or MongoDB Query
Language) is built on JSON and JavaScript.[5]
MongoDB works extremely well with Node.js, and makes storing, manipulating, and representing
JSON data at every tier of your application incredibly easy. For cloud-native
applications, MongoDB Atlas makes it even easier, by giving you an auto-scaling MongoDB
cluster on the cloud provider of your choice, as easy as a few buttons clicks. [5]
Express.js (running on Node.js) and React.js make the JavaScript/JSON application MERN full
stack, well, full. Express.js is a server-side application framework that wraps HTTP requests and
responses and makes it easy to map URLs to server-side functions. React.js is a frontend JavaScript
framework for building interactive user interfaces in HTML and communicating with a remote
server. [4]
The combination means that JSON data flows naturally from front to back, making it fast to build
on and reasonably simple to debug. Plus, you only have to know one programming language, and
the JSON document structure, to understand the whole system! [5]
MERN is the stack of choice for today’s web developers looking to move quickly, particularly for
those with React.js experience.
2.2.6 MERN use case
Like any web stack, you can build whatever you want in MERN - though it’s ideally suited for
cases that are JSON-heavy, cloud-native, and that have dynamic web interfaces.
A few examples might be Workflow management - News aggregation - To-do apps and Calendars
- Interactive forums / social products – Management Apps -Dashboards [5]
9
3. System Development
3.1 Requirements
3.1.1 Event Organizer
The event organizer will have various roles as he will be the event creator. He can add an event,
edit an event, or even delete an event. The event organizer can do the following tasks / can have
following options i.e. (The Main Tasks)
1. Creating an event i.e., Event Name
2. Entering the location of event (Country / State / District / City / Building / Floor Number / Pin
etc. it will cover all the minute details, so it becomes easy for the event members to join the event
without wasting a single time to locate the event
3. Event Type – Public / Private
4. Private Event: Add mobile numbers, Emails, etc. so an SMS will be sent to mobile numbers to
register/subscribe real-time notifications for the event.
5. Public Event: Anyone can join this event and all the members who have registered will get the
notification
6. Event Organizer can change the events privacy from public to private and an
7. Notification will be sent to registered users about any minute change in the event i.e., time,
location, live stream etc.
8. Users can contact the event organizer via SMS, Notification, Alert, Call
9. User then can create a custom feedback form for the event
10.Another option of ‘Allow vendors to contact you’ will be given to the organizer where it will
be yes by default
11.A wizard will be given which will have tags regarding the main course of the event so that the
organizer will get suggestions based on that
10
12.If the organizer is satisfied with the service of the vendor or if he likes the service, then he can
directly pay the vendor and hire him with our integrated payment gateway.
Figure 3.1 Create Event
13.If the vendor sends a service request to the organizer, then the organizer can confirm that request
or he can bargain on that.
14.After the completion of event the organizer can give ratings to the vendor
11
15.Cost approximation will be shown before the and after the bid i.e., how much is the estimated
cost for the event
16.Billing Enable/Disable will be there if the organizer directly wants to pay the vendor through
the app.
17.If billing is enabled then multi-level billing option will be given i.e., it’ll have all the things
related to payments Pending payment, Final Settlement, Reports etc.
18.Past events and upcoming events will be shown in the app for organizer
19.There will be an option to create a group chat for event subscribers on the organizer dashboard
when he creates the event
20.Organizer can set maximum attendees / Maximum subscribers
21.Event has started or not will be shown in home screen
22.Contact list for private event

3.1.2 Vendors
The vendors are those people who will provide services to the event organizer. The vendors can
have following options
23.Type – Individual / Proprietorship / Partnership / Pvt. Ltd etc. another option will be given to
enter the type.
24.Entering the location of the vendor (Country / State / District / City / Building / Floor Number
/ Pin etc. it will cover all the minute details, so it becomes easy for the event organizer to contact
the vendor.
25.A form will be given which will consist of ‘contact number’, ‘email’, ‘services offered’ services
offered which will have ‘type’ and ‘sub type’, ‘price for the sub types and total price.
26.Dynamic discount option will be given to the vendor
12
27.Free Registration will be given, and currency will be shown as per the country added
28.Searching of vendors
Figure 3.2 Create Bid
3.1.3 Users / Event Subscribers
Users are those entities who will have access to the event i.e., event members The users can have
following options
1. Users will be given a form which will have name, mobile number and some other fields.
13
2. They can view all the other events which are taking place in their locality
3. They can search a particular location and events 4. Users can register for a particular event with
just one click and will get dynamic notifications
4. They can access live stream just like YouTube live streaming
5. They can view all the notifications for the registered event i.e.., change in time, location etc.
6. They could send a private message to the event organizer if its allowed by the organizer
7. After the end of the event users can provide the feedback for the event
8. Notifications will be provided for every change or update in the event, confirmation of services
etc.
9.If the event is public then the users can directly join the event. If the event is private, then they’ll
get an invitation to the event
14
3.2 User Interface Design
Following figures are included to showcase the user interface of Event Web App
Figure 3.3 Home page
This is the landing page which the user will see after authentication. This is called home page
which includes all nearby events under 3km radius and filter based on users’ choice. The left side
menu represents all the activities user can do such as event creation, subscription, handling bids,
chats and my account which is similar to my profile.
Talking about functions on home page, basically user can search event by name or filter event
based on some options like nearby events, new events, oldest event etc., In the bottom right corner
there is a button that can take user to create event form, the form first proceed with location of
event on the map then name, description, start time, end time, private or public options and some
15
service tags all these inputs should pe fill by organizer after submitting the form event will create
and can be visible to nearby by user to its location

Figure 3.4 Profile
This page is called as my account which has ‘my approvals’ which consist of all the bids which
are approved by this particular user, next comes my services this includes all the services which
are added by this particular user, he can also add services from there, next comes my groups which
has all the groups added by the user, this groups will be utilized or used inside event creation page
where we require a group while creating a private event because private event requires mobile
number so it’ll take all the mobile numbers which are present inside the group.
Next is find vendors tab which has all the nearest vendors. User can search for vendors based on
city name, after search vendors will be displayed on the screen with their services and rating so
16
user can figure out which vendor is best for a particular event or a service after that button in the
bottom right corner will make the profile page editable so user can update inform
Figure 3.5 Reminder
This is reminders tab which has all the reminder and notifications received by this user, Reminders
will be displayed with their heading and description text and time, so user can easily understand
what it says.
Reminder will be shown to user if a particular event updated or deleted by organizer or if a new
event is created than a notification will be send to all user inside a certain radius of area with
respect to event location and there is button to every notification if clicked then a particular
notification will be deleted for that user but that data will not be removed from the database on the
left side vertical menu bar the notification tab will be shown with badge with numbers these
numbers represents how many notification are there in the notification tab
17
 Figure 3.6 Create Event
This is event creation page which has various fields such as name of the event, start date and time,
end date and time, description, event address, public or private event, if private event then it asks
for the mobile numbers of users whom organizer want to invite to this particular, so they’ll be
automatically subscribed to this event. Next comes limit subscriber toggle which will limit the
subscriber to subscribe a public event. Last section is of the event organizer which includes name,
phone, address of the event organizer. Then comes service tags, service tags are associated to the
event which will help vendors identify which services are needed for this event.
Talking about form functionality on this page, firstly there is date picker for start and end date so
user can easily select date without typing and its also easy to handle at the backend without any
error handling, and for selecting services there select or unselect option for service and organizer
can easily restrict vendors to contact with single click
18
Following figures are included to showcase the user interface of Event Mobile App
Figure 3.7 Home Screen Figure 3.8 Profile
19
Figure 3.9 Events Figure 4.0 Reminders
20
3.3 Database Design / ER Diagrams
3.3.1 ER Diagram
Diagram 4.1 ER Diagram
Above entity-relationship diagram represent relationship between entity and their attribute
Entities: user, event, message, conversation, bid, services, report, reminders, user contact,
category, services, category, service tag, event form
for example: Entity user in the diagram has many relationships with other entity such as a single
user can create multiple events and the symbol represents that the relation between them is oneto-many, similarly Entity event and its relationship between entity conversation represents that a
single event can have only one conversation and it can be said to one-to-one
21
3.3.2 Data Flow Diagram DFD
Diagram 4.2 DFD
The Above diagram shows the way information flows through a process or system. It includes
data inputs and outputs, data stores, and the various subprocesses the data moves through.
Basically in our event app the main process is to create event so firstly event is to created by user,
then user can do some process like update, read, delete, all the outputs from these process are then
22
stored in the mongoDB database, as soon as event is created then a reminder is created and sent to
selected user and that reminder are also get stored in mongoDB database, after the second process
is that the vendor available on the system creates bids and similarly notification is created, send ,
and stored.
Vendor can update, delete or read their bids on a particular event, however user can also save a
group of contacts in our app so it will be easy for user to add or invite that group to an event, and
about vendors, they can add their services with description, prices, quantity these services then
stored in database after that vendor can update, read, or delete that service
3.3.3 Use Case Diagram
Diagram 4.3 Use Case Diagram
23
Above use case explains the user’s possible interaction with our system, Event app consist of
three main actors
The basic user can login, then subscribe an event, chat with other user or organizer and able to
search events or filter events, however the main role of organizer is to login, create event, chat,
approve bid, search event, search vendor, and for vendors is to login, bid services, chat, search
event
3.3.4 Classes and Objects
Diagram 4.4 Classes and Objects
24
4. PERFORMANCE EVALUATION
There are a lot of reasons we might want to evaluate a Software, checking out a competitor, or
comparing e-commerce platforms. No matter the reason, there are a few key metrics we need to
assess across the site.
We conduct performance testing to ensure that an application will run smoothly. Metrics are those
indicators that help to identify performance of our system
Uptime:
Events API’s downtime was 1 day since past 3 months. While one of the most basic metrics,
uptime or availability is the gold standard for measuring the availability of a service. Many
enterprise agreements include an SLA (Service Level Agreement), and uptime is usually rolled up
into that. Many times, you’ll hear terms like triple 9’s or four 9’s which is a measure of how much
uptime vs downtime there is per year.
API Response Time:
The time that passes from the moment a request goes to the server and until the last byte is received
from the server is called response time. This metric is measured in kilobytes per second (KB/sec).
Event App Average Response Time: 1.3KB/sec
Response time is the amount of time a system takes to react to a request once it has received one.
For example, the time between the instant we execute an API, and this API returns the result of its
computation, that’s the response time.
Latency
Events API has very low latency, in simplest terms this is Remote Response time. For instance,
you want to invoke a web service or access a web page. Apart from the processing time that is
needed on the server to process your request, there is a delay involved for your request to reach to
server. While referring to Latency, it’s that delay we are talking about. This becomes a big issue
for a remote data center which is hosting your service/page. Imagine your data center in US and
accessing it from India. If ignored, latency can trigger your SLA’s. Though it’s quite difficult to
improve latency it’s important to measure it.
25
CPU
CPU usage is one of the most classic performance metrics that can be a proxy to application
responsiveness. High Server CPU usage can mean the server or virtual machine is oversubscribed
and overloaded or it can mean a performance bug in your application such as too many spinlocks.
Infrastructure engineers use CPU usage (along with its sister metric, memory percentage) for
resource planning and measuring overall health. Certain types of applications like high bandwidth
proxy services and API gateways naturally have higher CPU usage than other metrics along with
workloads that involve heavy floating-point math such as video encoding and machine learning
workloads.
Server Request Per second:
A client application forms an HTTP request and sends it to a server. The server software processes
this request, generates a response, and sends it back to the client. The total number of consistent
requests per second is the metric we are interested in – requests per second (RPS). These can be
requests for any data source – HTML pages, multimedia files, JavaScript Libraries, XML,
documents, etc.
Event App Request per Second on Heroku: 10,000 requests/second
These requests can be scale based on our requirements
API Error rate:
This metric is calculated as the ratio of invalid to valid answers over a period. The results are
calculated in percentage. The errors usually occur when software load exceeds its capacity
Error rate on production: 99%
API usage
For many product managers, API usage (along with unique consumers) is the gold standard to
measure API adoption. An API should not be just error free but growing month over month. Unlike
requests per minute, API usage should be measured in longer intervals like days or months to
understand real trends. If measuring month-over-month API growth, we recommend choosing 28-
26
days instead as it removes any bias due to weekend vs weekday usage and differences in number
of days per month. For example, February may have only 28 days whereas the month before has a
full 31 days causing February to appear to have lower usage.
Nodejs as a Server
There are many benefits of using Node.js. While most of its users mention the advantages related
to the development process, such as increased developer productivity, improved developer
satisfaction, and reduced development cost. Half of the respondents of Node.js 2017 User
Survey noticed improved application performance in comparison to other solutions.
Figure 4.1 Nodejs Performance [7]
What's more, the perceivable benefits have been growing over time. The survey shows that Node.js
users that worked with the technology for more than two years appreciate its impact on app
performance ten percent more often than developers who have used it for a shorter time.
27
Figure 4.1 Nodejs Benefits [8]
Here are some reasons why the value of Node’s performance snowballs over time:
1. Node.js is good at multitasking. It is single-threaded, non-blocking, and asynchronous.
Therefore, it can process multiple tasks concurrently in one thread, instead of queueing
them.
2. Node.js works on the V8 engine that is used in Chrome. V8 is the fastest JavaScript engine.
Google develops Node.js, so it increases the chances it will be well supported in the
foreseeable future.
3. Node.js does not weight down the server when many requests are sent.
4. The technology enables the app to handle much more requests at the same time than other
another solution.
API
Should you spend more money on your product and engineering or put more money into growth?
Retention and churn (the opposite of retention) can tell you which path to take. A product with
high product retention is closer to product market fit than a product with a churn issue. Unlike
subscription retention, product retention tracks the actual usage of a product such as an API. While
the two are correlated, they are not the same. In general, product churn is a leading indicator of
subscription churn since customers who don’t find value in an API may be stuck with a yearly
28
contract while not actively using the API. API retention should be higher than web retention as
web retention will include customers who logged in but didn’t necessarily integrate the platform
yet. Whereas API retention looks at post-integrated customers.
UI/UX
As we previously discussed that our app is developed in React JS, this frontend technology is one
of the best, react have many features like fast rendering, state management etc.
So, user will not have any problem with UI/UX as we have followed best practice to design and
developed this application
Database
On database, we have divided it with many collections to get data immediately with low latency,
and for search and find query we have used Indexing for retrieving documents fast, however, we
have also made schema as simple as possible with maximum embedding and linking options
29
CONCLUSION
The Goal of our project was to develop Event management app, where organizer can organize an
event, vendors can bid their service to event and then organizer can allow vendors to provide
services at the event and lastly user can subscribe event, as a result we have achieved our goal and
developed a full stack system which included Web App, Mobile App and Admin Dashboard.
While developing this system we have learned great concepts as developing Secured API, good
coding practices, database design, low Latency database query, hosting, google APIs, etc.
Purpose was to overcome existing problem in event management such as cost optimizing, services
managing, planning, and scheduling for multiple location, we have overcome current problems in
the system and developed these apps with amazing technologies
On the basis of customer or users’ requirement/feedbacks and trends in the technologies we will
keep updating the system, to give users a good smooth flow and experience
30
References

1. https://reactjs.org/docs/getting-started.html
2. https://www.npmjs.com/
3. https://nodejs.org/en/docs/
4. https://expressjs.com/en/starter/installing.html
5. https://docs.mongodb.com/
6. https://docs.expo.dev/
7. https://openjsf.org/
8. https://www.netguru.com/blog/nodejs-performance-web-application-benefit
9. https://www.npmjs.com/
10. https://reactnative.dev/docs/getting-started
</p>
</div>
<Footer footer="fullfooter" />

    </div>
  )
}

export default HowItWorks