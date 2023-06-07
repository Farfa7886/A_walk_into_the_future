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

const agent = new https.Agent({  
  rejectUnauthorized: false
});

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
                getChatReply(content, uid);
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

    axios.get(`http://api.brainshop.ai/get?bid=175868&key=sBLSCbBmENDqgBTE&uid=${conversationID}&msg=${text}`, {
        rejectUnauthorized: false
    })
    .then(response => {
        console.log(response.data)
        // return { success: true, response: response.data['cnt'] }
    })
    .catch(error => {
        console.log(response.data)
        // return { success: false, error: error}
    })
}

/* async function chat(text, conversationID) {
    let response =
} */



</script>