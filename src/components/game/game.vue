<template>
    <head>
    </head>
    <div id="game-container">
        <iframe id="embedded-game" src="https://progetto-enea.netlify.app/" title="Progetto enea"></iframe>
    </div>
    <div id="rotate-screen" class="centerItems" style="height: 100%; position: relative;">
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_Yr5Ndi.json"  background="transparent"  speed="1" style="width: 100%; height: 300px;"  loop  autoplay></lottie-player>
        <div style="display: flex; justify-content: center; margin-top: 20px">
            <p><strong>Please rotate your phone</strong></p>
        </div>
    </div>
</template>

<style>
   @import '../../assets/game-container.css';
</style>

<script>
import * as utils from '../scripts/utils'

export default {
    data: () => ({
    }),
    mounted() {
      let lottieScript = document.createElement('script')
      lottieScript.setAttribute('src', 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js')
      document.head.appendChild(lottieScript)
    },
    methods: {
    }
  }

document.addEventListener("DOMContentLoaded", function () {
    utils.hide('rotate-screen');
    if (screen.orientation.type === 'portrait-primary') {
        utils.hide('game-container')
        utils.show('rotate-screen')
    } else if (screen.orientation.type === 'landscape-primary') {
        utils.show('game-container')
        utils.hide('rotate-screen')
    }
    screen.orientation.addEventListener('change', function() {
        if (screen.orientation.type === 'portrait-primary') {
            utils.hide('game-container')
            utils.show('rotate-screen')
        } else if (screen.orientation.type === 'landscape-primary') {
            utils.show('game-container')
            utils.hide('rotate-screen')
        }
    });
});
</script>