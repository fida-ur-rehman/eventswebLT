
import React from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import {connect} from 'react-redux'
import {Button} from '@mui/material'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./EventDetail.scss"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
var val = Math.floor(1000 + Math.random() * 9000);
let rtc = {
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
};

    let options = {
        // Pass your app ID here.
        appId: "f5808036f38f4f46897775f9567caac5",
        // Set the channel name.
        channel: "testchannel",
        // Use a temp token
        token: "006f5808036f38f4f46897775f9567caac5IACRwndO+JKa0o58XKTrO3rKCzvl9WF0Nek073KwZRMrZOpuE8wAAAAAEACucvvFMkKHYgEAAQAzQodi",
        // Uid
        uid:val,
    };

let container = <div className="live-stream-div">
<h1>leive </h1>
</div>

function LiveStream(props) {

    const [liveStream,setLiveStream]=React.useState(false)
    const refContainer = React.useRef(null)
    console.log(refContainer)
    async function startBasicLiveStreaming() {
        rtc.client = AgoraRTC.createClient({mode: "live", codec: "vp8"});
    
        window.onload = function () {
            document.getElementById("host-join").onclick = async function () {
                setLiveStream(true)
                rtc.client.setClientRole("host");
                await rtc.client.join(options.appId, options.channel, options.token, options.uid);
                // Create an audio track from the audio sampled by a microphone.
                rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                // Create a video track from the video captured by a camera.
                rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
                // Publish the local audio and video tracks to the channel.
                await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
                // Dynamically create a container in the form of a DIV element for playing the remote video track.
                const localPlayerContainer = document.createElement("div");
                // Specify the ID of the DIV container. You can use the `uid` of the remote user.
                localPlayerContainer.id = options.uid;
                localPlayerContainer.textContent = "Local user " + options.uid;
                localPlayerContainer.style.width = "640px";
                localPlayerContainer.style.height = "480px";
                //document.body.append(localPlayerContainer);
                console.log(refContainer)
                rtc.localVideoTrack.play(refContainer.current);
    
                console.log("publish success!");
            };
    
            document.getElementById("audience-join").onclick = async function () {
                setLiveStream(true)
                rtc.client.setClientRole("audience");
                console.log('inside join')
                const joioinfo = await rtc.client.join(options.appId, options.channel, options.token, options.uid);
                console.log('inside join1---------------------------------------',joioinfo)
                rtc.client.on("user-published", async (user, mediaType) => {
                    console.log('inside join2---------------------------------------')
                    // Subscribe to a remote user.
                    await rtc.client.subscribe(user, mediaType);
                    console.log("subscribe success");
    
                    // If the subscribed track is video.
                    if (mediaType === "video") {
                        // Get `RemoteVideoTrack` in the `user` object.
                        console.log("useris----------------------",user)
                        const remoteVideoTrack = user.videoTrack;
                        // Dynamically create a container in the form of a DIV element for playing the remote video track.
                        const remotePlayerContainer = document.createElement("div");
                        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
                        remotePlayerContainer.id = user.uid.toString();
                        remotePlayerContainer.textContent = "Remote user " + user.uid.toString();
                        remotePlayerContainer.style.width = "640px";
                        remotePlayerContainer.style.height = "480px";
                        //document.body.append(remotePlayerContainer);
    
                        // Play the remote video track.
                        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                        remoteVideoTrack.play(refContainer.current);
    
                        // Or just pass the ID of the DIV container.
                        // remoteVideoTrack.play(playerContainer.id);
                    }
    
                    // If the subscribed track is audio.
                    if (mediaType === "audio") {
                        // Get `RemoteAudioTrack` in the `user` object.
                        const remoteAudioTrack = user.audioTrack;
                        // Play the audio track. No need to pass any DOM element.
                        remoteAudioTrack.play();
                    }
                });
    
                rtc.client.on("user-unpublished", user => {
                    // Get the dynamically created DIV container.
                    const remotePlayerContainer = document.getElementById(user.uid);
                    // Destroy the container.
                    remotePlayerContainer.remove();
                });
            };
    
            document.getElementById("leave").onclick = async function () {
                setLiveStream(false)
                // Close all the local tracks.
                rtc.localAudioTrack.close();
                rtc.localVideoTrack.close();
                // Traverse all remote users.
                rtc.client.remoteUsers.forEach(user => {
                    // Destroy the dynamically created DIV containers.
                    const playerContainer = document.getElementById(user.uid);
                    playerContainer && playerContainer.remove();
                });
    
                // Leave the channel.
                await rtc.client.leave();
            };
        };
    }
    
    startBasicLiveStreaming();

    console.log(document)
  return (
    <div>

        {liveStream&&<div className="live-stream-div" ref={refContainer} />}
         {props.eventOrganizerId===props.user.userInfo._id?
         <div>
         {liveStream?<h2 class="left-align">Hey, {props.name} You are Live !</h2>:<h2 class="left-align">Hey, {props.name} You can stream this event !</h2>}
         <p>Note : Starting a live stream will result in opening of cam. this stream will be visible to all your subscribers if they join as an audience to this event</p>
         <Button disabled={liveStream?true:false} startIcon={<VideoCallIcon />} id="host-join" variant="contained">Start Live Stream</Button>
         <Button sx={{display:"none"}} id="audience-join" variant="contained">Join</Button>
         <Button sx={{visibility:liveStream?"visible":"hidden"}}startIcon={<ExitToAppIcon />} id="leave" variant="outlined">Stop Live Stream</Button>
         </div>

         
         :

         <div>
         <div>
         {liveStream?<h2 class="left-align">Hey, {props.name} You are streaming, enjoy !</h2>:<h2 class="left-align">Hey, {props.name} You can stream this event !</h2>}
         <Button sx={{display:"none"}} id="host-join" variant="contained">Start Live Stream</Button>
         <Button disabled={liveStream?true:false} id="audience-join" variant="contained">Join</Button>
         <Button sx={{visibility:liveStream?"visible":"hidden"}}startIcon={<ExitToAppIcon />} id="leave" variant="outlined">Stop Live Stream</Button>
         </div>
        </div>}
         
        {/* <div class="row">
            <div>
                <button type="button" id="host-join">Join as host</button>
                <button type="button" id="audience-join">Join as audience</button>
                <button type="button" id="leave">Leave</button>
            </div>
        </div> */}
    </div>
  )
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(LiveStream)