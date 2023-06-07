<script setup>
import * as utils from './scripts/utils'
import axios from 'axios';

</script>

<template>
   <!-- Open the modal using ID.showModal() method -->
      <form method="dialog" class="modal-box">
        <button for="chatModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 class="font-bold text-lg" style="margin-bottom: 50px">Chat</h3>
        <div id="chat-content" style="overflow-y: auto; height: 50vh;">
          <div class="chat chat-start"></div>
          <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-accent">Hi! I am a simple chatbot that can answer some of your questions!</div>
          </div>
          <div class="chat chat-start">
            <div class="chat-bubble chat-bubble-accent">Every conversation is with a new random id so nothing will be stored</div>
          </div>
        </div>
        <div clasS="divider"></div>
        <div id="text-send" style="width: 100%; margin-top: 50px; display: flex; justify-content: center;">
            <input type="input" id="chat-text-input" placeholder="Write something" class="input input-bordered input-accent w-full" />
            <button class="btn btn-outline btn-accent" @click="addMessage(true)" type="button" style="margin-left: 20px;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path style="fill: white" d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></button>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button></button>
      </form>
</template>

<script>

var chatDiv;
var textBox;
const uid = Math.random(10) * 8758723659782346;

utils.onLoad(() => {
    chatDiv = document.getElementById('chat-content');
    textBox = document.getElementById('chat-text-input');

    textBox.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            addMessage(true)
            event.preventDefault();
        }
    });
})

async function addMessage(sender, content) {
    let customId = Math.floor(Math.random(5) * 75782560);
    if (content) {
        if (!utils.isEmpty(content)) {
            if (sender) {
                chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-end"><div id="${customId}" class="chat-bubble chat-bubble-info">${content}</div></div>`
                chat(content, uid);
            } 
            else {
                chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-start"><div id="${customId}" class="chat-bubble chat-bubble-accent">${content}</div></div>`
            }
            textBox.value = '';
            document.getElementById(customId).scrollIntoView()
        }
    }
    else {
        content = document.getElementById('chat-text-input').value
        if (!utils.isEmpty(content)) {
            if (sender) {
                chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-end"><div id="${customId}" class="chat-bubble chat-bubble-info">${content}</div></div>`
                chat(content, uid);
            } 
            else {
                chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-start"><div id="${customId}" class="chat-bubble chat-bubble-accent">${content}</div></div>`
            }
            textBox.value = '';
            document.getElementById(customId).scrollIntoView()
        }
    }
    textBox.value = '';
}
async function getChatReply(text, conversationID) {

    return await axios.get(`http://api.brainshop.ai/get?bid=175868&key=sBLSCbBmENDqgBTE&uid=${conversationID}&msg=${text}`, {
        rejectUnauthorized: false
    })
}

async function chat(text, conversationID) {

    let reply = await getChatReply(text, conversationID)
    addMessage(false, reply.data.cnt)
}


(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();


</script>