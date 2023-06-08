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
          <div class="chat chat-start" id="g">
            <div class="chat-bubble chat-bubble-accent"><img src="../assets/g.jpg" style="width: 300px; height: auto;"><p style="margin-top: 10px;">There is a 2% chance of getting this message</p></div>
          </div>
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
const uid = utils.mathRandomInt(1, 8753489059976320)

utils.onLoad(() => {
    chatDiv = document.getElementById('chat-content');
    textBox = document.getElementById('chat-text-input');

    textBox.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            addMessage(true)
            event.preventDefault();
        }
    });

    utils.hide('g')

    if (utils.mathRandomInt(1, 100) < 3) {
        utils.show('g')
    }

})

function addMessage(sender, content, loading, messageId) {
    console.log(messageId == undefined)
    if (messageId == undefined) {
            let customId = utils.mathRandomInt(1, 8759423);
            if (content) {
            if (!utils.isEmpty(content)) {
                if (sender) {
                    textBoxEnabled()
                    chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-end"><div id="${customId}" class="chat-bubble chat-bubble-info">${content}</div></div>`;
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
                    textBoxEnabled()
                    chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-end"><div id="${customId}" class="chat-bubble chat-bubble-info">${content}</div></div>`;
                    chat(content, uid);
                } 
                else {
                    if (loading) {
                        chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-start"><div id="${customId}" class="chat-bubble chat-bubble-accent"><progress class="progress w-56"></progress></div></div>`
                    }
                    else {
                        chatDiv.innerHTML = chatDiv.innerHTML + `<div class="chat chat-start"><div id="${customId}" class="chat-bubble chat-bubble-accent">${content}</div></div>`
                    }
                }
                textBox.value = '';
                document.getElementById(customId).scrollIntoView()
            }
        }
        return customId
    }
    else {
        document.getElementById(String(messageId)).innerHTML = content
        document.getElementById(messageId).scrollIntoView()
    }
    textBox.value = '';
}
async function getChatReply(text, conversationID) {

    const api = `http://api.brainshop.ai/get?bid=175868&key=sBLSCbBmENDqgBTE&uid=${conversationID}&msg=${text}`;
    const url = 'https://corsproxy.io/?' + encodeURIComponent(api);

    return await axios.get(url)
    .catch((error) => {
        addMessage(false, "⚠️ Error while making the request, you can find more info in the console")
    })
    .finally(() => {
        textBoxEnabled(true)
    })
}

async function chat(text, conversationID) {
    const id = addMessage(false, null, true)
    let reply = await getChatReply(text, conversationID)
    addMessage(false, reply.data.cnt, false, id)
}

function textBoxEnabled(enabled) {
    if (enabled) {
        document.getElementById('chat-text-input').removeAttribute('disabled')
    }
    else {
        document.getElementById('chat-text-input').setAttribute('disabled', '')
    }
}


</script>