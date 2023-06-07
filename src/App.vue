<script setup>
import * as utils from './components/scripts/utils'
import Swal from 'sweetalert2'
import localforage from 'localforage'
import Game from './components/game/game.vue'
import Footer from './components/footer.vue'
import Changelog from './components/Changelog.vue'
import Description from './components/Description.vue'
import Tutorial from './components/Tutorial.vue'
import Chat from './components/Chat.vue'
</script>

<template>
<header>
    <div class="wrapper">
        <!--<HelloWorld msg="You did it!" />-->
    </div>
</header>

<main>
    <div class="drawer" id="navBar">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col" id="navBarContainer" style="height: 100vh;">
            <!-- Navbar -->
            <div class="w-full navbar bg-base-300">
                <div class="flex-none lg:hidden">
                    <label for="my-drawer-3" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div class="flex-1 px-2 mx-2" style="height: 10px;"><p id="navBarTitle">Play game</p><ul class="menu menu-horizontal"><li id="alternative-fullscreen-btn" v-on:click="openFullscreen('embedded-game')" style="border: 3px solid whitesmoke; border-radius: 1vh; margin-left: 20px;"><a><strong id="fullscreen-mobile">OPEN IN FULLSCREEN</strong></a></li></ul></div>
                <div class="flex-none hidden lg:block">
                    <ul class="menu menu-horizontal">
                        <!-- Navbar menu content here -->
                        <li style="margin-right: 50px;" onclick="tutorialModal.showModal(); document.getElementById('tutorial-modal-title').scrollIntoView()"><a id="btn-open-tutorial-pc">Open tutorial</a></li>
                        <li v-on:click="switchPage('game')"><a id="btn-play-game-pc">Play game</a></li>
                        <li v-on:click="switchPage('description')"><a id="btn-description-pc">Description</a></li>
                        <li v-on:click="switchPage('changelog')"><a id="btn-changelog-pc">Changelog</a></li>
                        <li id="chat-is-this-ryal" onclick="chatModal.showModal()" style="margin-left: 20px"><a><strong id="">Chat</strong></a></li>
                    </ul>
                </div>
            </div>
            <!-- Page content here -->
            <div id="pageContentContainer">
                <div id="pageContent-game">
                <div id="floatdiv" class="">
                    <div class="alert shadow-lg rounded-full" style="width: 300px;" id="FloatingActionDiv">
                        <button class="btn btn-sm" id="fullscreen-btn" v-on:click="openFullscreen('embedded-game')">Switch to fullscreen</button>
                        <button class="btn btn-sm ease-out" id="btn-fullscreen-dismiss" v-on:click="hide('floatdiv'); toast('You can switch to fullscreen using the navigation menu', 'info'); show('alternative-fullscreen-btn'); isFullScreenBtnDismissed = true">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <Game />
            </div>
            <div id="pageContent-changelog">
                <Changelog />
            </div>
            <div id="pageContent-description">
                <Description />
            </div>
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-3" class="drawer-overlay" id="drawer-side-overlay"></label>
            <ul class="menu p-4 w-80 h-full bg-base-200" id="drawer-side">
                <!-- Sidebar content here -->
                <li v-on:click="switchPage('game', true)"><a id="btn-play-game-mobile">Play game</a></li>
                <li v-on:click="switchPage('description', true)"><a id="btn-description-mobile">Description</a></li>
                <li v-on:click="switchPage('changelog', true)"><a id="btn-changelog-mobile">Changelog</a></li>
                <div class="divider"></div>
                <li onclick="document.getElementById('pageContentContainer').style.display = 'none'; tutorialModal.showModal(); document.getElementById('tutorial-modal-title').scrollIntoView();"><a id="btn-open-tutorial-mobile">Open tutorial</a></li>
                <div class="divider"></div>
                <li id="chat-is-this-ryal" onclick="chatModal.showModal()"><a><strong id="">Chat</strong></a></li>
            </ul>
        </div>
    </div>
    <Footer />
    <dialog id="tutorialModal" class="modal" style="overflow: hidden;">
        <form method="dialog" class="modal-box w-11/12 max-w-7xl">
            <h3 class="font-bold text-lg" id="tutorial-modal-title">Tutorial</h3>
            <div style="overflow-y: auto">
                <Tutorial />
            </div>
            <div class="modal-action">
                <button id="modal-tutorial-close" button class="btn btn-primary" @click="switchPage('game'); show('pageContentContainer')">Close</button>
            </div>
        </form>
    </dialog>

    <dialog id="chatModal" class="modal">
        <Chat />
    </dialog>
</main>
</template>

<script>

var isFullScreenBtnDismissed = false;
var isOnMobile = false;

if (/Mobile|Android/.test(navigator.userAgent)) {
  isOnMobile = true
}

function toast(text, icon, timer, showConfirmButton, showTimerProgressBar, toastPosition) {
    const Toast = Swal.mixin({
      toast: true,
      position: toastPosition == null ? 'top-end' : toastPosition,
      showConfirmButton: showConfirmButton == null ? false : showConfirmButton,
      timer: timer == null ? 3000 : timer,
      timerProgressBar: showTimerProgressBar == null ? true : showTimerProgressBar,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon == null ? 'success' : icon,
      title: text == null ? "Please insert text" : text
    })
}

utils.setup()

// Run on page load
document.addEventListener("DOMContentLoaded", function () {
  hide('pageContent-changelog')
  hide('pageContent-description')
  hide('alternative-fullscreen-btn')
  if (isOnMobile) {
    hide('floatdiv')
    show('alternative-fullscreen-btn')
    isFullScreenBtnDismissed = true;
  }
});


// Open full screen utiliy
function openFullscreen(elem) {
    elem = document.getElementById(elem)
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}

// Hide an element
function hide(element) {
  document.getElementById(element).style.display = "none"
}

function show(element) {
    document.getElementById(element).style.display = 'block'
}

// Switch between tabs
function switchPage(page, isOnMobile_sidebar) {
    if (isOnMobile_sidebar) {
        document.getElementById('drawer-side-overlay').click()
    }
    hide('pageContent-changelog')
    hide('pageContent-description')
    hide('pageContent-game')
    hide('alternative-fullscreen-btn')

  if (page === 'game') {
    if (isFullScreenBtnDismissed == true) {
        show('alternative-fullscreen-btn')
    }
    show('pageContent-game')
    document.getElementById('navBarTitle').innerText = "Play game"
  } 
  else if (page === 'changelog') {
    show('pageContent-changelog')
    document.getElementById('navBarTitle').innerText = "Changelog"
  } 
  else if (page === 'description') {
    show('pageContent-description')
    document.getElementById('navBarTitle').innerText = "Description"
  }
  else {
    console.error("The only ammitted values are 'game', 'changelog' and 'description', the value currently selected is '" + page + "'")
  }
}

localforage.getItem('firstTime', function (err, value) {
    if(err) {
        throw err
    }
    if (value == null) {
        tutorialModal.showModal()
        document.getElementById("tutorial-modal-title").scrollIntoView()
        hide('pageContent-game')
        localforage.setItem("firstTime", false)
    }
});

</script>
<style scoped>
</style>
