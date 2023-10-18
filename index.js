import { ApiClient } from "twitch";
import { ClientCredentialsAuthProvider } from "twitch";
import OBSWebSocket from 'obs-websocket-js';
import { connect } from "http2";

import dotenv from 'dotenv';
dotenv.config();

var clientID = process.env.TWITCH_CLIENTID;
var clientSecrets = process.env.TWITCH_SECRET;
var username = process.env.TWITCH_USERNAME;
var userIdi = process.env.TWITCH_USERID;

const clientId = clientID;
const clientSecret = clientSecrets;
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });


const userIDs = userIdi;
var viewers = document.getElementById("viewers");

const profilePictureElement = document.getElementById("profilePicture");
const displayNameElement = document.getElementById("displayName");

apiClient.helix.users.getUserByName(username).then((user) => {
    const username = user.displayName;
  const profilePictureUrl = user.profilePictureUrl;
  displayNameElement.innerHTML = username;
  const imgElement = document.createElement("img");
  imgElement.src = profilePictureUrl;
  imgElement.alt = "Twitch Profile Picture";
  profilePictureElement.appendChild(imgElement);

  console.log(user.id);

  apiClient.helix.streams.getStreamByUserId(user.id).then((stream) => {
    if (stream) {
      console.log(`${user.displayName} est en live !`);
      console.log("Kora a " + stream.viewers + " viewers");
      viewers.innerHTML = " | "+ stream.viewers + " viewers";
    } else {
      console.log(`${user.displayName} n'est pas en live !`);
    }
  });
});

setInterval(function () {
  apiClient.helix.users.getUserByName("korabinks").then((user) => {
    apiClient.helix.streams.getStreamByUserId(userIDs).then((stream) => {
      if (stream) {
        viewers.innerHTML = stream.viewers;
      } else {
      }
    });
  });
}, 15000);

async function startStream() {
    const obs = new OBSWebSocket();

    try {
        await obs.connect('ws://localhost:4455');

        await obs.call('StartStream');
    } catch (error) {
        console.error('Failed to connect to OBS WebSocket:', error);
    }
}

async function StopStream() {
    const obs = new OBSWebSocket();

    try {
        await obs.connect('ws://localhost:4455');

        await obs.call('StopStream');
    } catch (error) {
        console.error('Failed to connect to OBS WebSocket:', error);
    }
}


document.getElementById("start").addEventListener("click", function () {

    const text = document.getElementById("start");

    if(text.innerHTML == "Start stream") {
        startStream();
        text.innerHTML = "Stop stream";
        text.disabled = true;
        setTimeout(function () {
            text.disabled = false;
        }, 2000);
    } else {
        StopStream();
        text.innerHTML = "Start stream";
    }


});

document.addEventListener("DOMContentLoaded", function () {

    console.log("test");
    async function GetSceneList() {
        const obs = new OBSWebSocket();
        console.log("test2");
        try {
            await obs.connect('ws://localhost:4455');
    
            return await obs.call('GetSceneList');
    
        } catch (error) {
            console.error('Failed to connect to OBS WebSocket:', error);
        }
    }

    GetSceneList().then((data) => {
        var sceneSelect = document.getElementById("select");
        console.log(data["scenes"]);
        data["scenes"].forEach(element => {
            console.log(element["sceneName"]);
            var newOption = document.createElement("option");
            const optionText = document.createTextNode(element["sceneName"]);
            newOption.appendChild(optionText);
            newOption.setAttribute('value', element["sceneName"]);
            sceneSelect.appendChild(newOption);

        });
    });
});

document.getElementById("select").addEventListener("change", function () {

    async function SetCurrentScene(sceneName) {
        const obs = new OBSWebSocket();
    
        try {
            await obs.connect('ws://localhost:4455');

            await obs.call('SetCurrentProgramScene', {sceneName: sceneName});


        } catch (error) {
            console.error('Failed to connect to OBS WebSocket:', error);
        }
    }

    SetCurrentScene(document.getElementById("select").value);
});