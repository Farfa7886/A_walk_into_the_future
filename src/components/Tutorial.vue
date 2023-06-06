<script setup>
    import * as utils from './scripts/utils'
</script>
<template>
    <div id="main-container">
        <div class="align-middle">
            <div class="mockup-window border bg-base-300 border-primary" id="pc-tutorial">
                <div class="flex justify-center px-4 py-16 bg-base-200">
                    <div class="align-middle">
                        <img src="../assets/images/controls-it.png">
                        <div style="display: flex; justify-content: center; margin-top: 20px" id="1-tuto">
                            <p style="margin-right: 50px;" id="tutorial-pc-1"><strong style="color:red">Red: </strong>movement</p>
                            <p style="margin-right: 50px;" id="tutorial-pc-2"><strong style="color:#32BAFF">Blue: </strong>jump</p>
                            <p style="margin-right: 50px;" id="tutorial-pc-3"><strong style="color:#FFCC14">Yellow: </strong>sprint</p>
                            <p style="margin-right: 50px;" id="tutorial-pc-4"><strong style="color:#FF3DCB">Fuchisa (ESC): </strong>unlock mouse</p>
                        </div>
                        <div style="display: flex; justify-content: center; margin-top: 20px">
                            <p><strong id="tutorial-lol">Use the mouse to control the camera</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="mobile-tutorial">
            <img id="tutorial-phone" src="../assets/images/controls-mobile.png">
            <div style="display: flex; justify-content: center; margin-top: 20px" id="1-tuto">
                <p style="margin-right: 50px;" id="tutorial-mobile-1"><strong style="color:red">Red: </strong>movement</p>
                <p style="margin-right: 50px;" id="tutorial-mobile-2"><strong style="color:#FF3DCB">Fuchisa: </strong>camera controls</p>
                <p style="margin-right: 50px;" id="tutorial-mobile-3"><strong style="color:#32BAFF">Blue: </strong>jump</p>
                <p style="margin-right: 50px;" id="tutorial-mobile-4"><strong style="color:#FFCC14">Yellow: </strong>sprint</p>
            </div>
        </div>
    </div>
</template>

<script>
    var isOnMobile = false;

    if (/Mobile|Android/.test(navigator.userAgent)) {
      isOnMobile = true
    }

    if (screen.orientation.type === 'portrait-primary') {
        console.log('Portrait orientation');
    } else if (screen.orientation.type === 'landscape-primary') {
        console.log('Landscape orientation');
    }

// On page load
document.addEventListener("DOMContentLoaded", function () {
    if (isOnMobile) {
        utils.hide('pc-tutorial')
        document.getElementById('mobile-tutorial').style.height = screen.width
    }
    else {
        utils.hide('mobile-tutorial')
    }

});


</script>

<style>
    #mobile-tutorial {
        height: 100%;
        width: auto;
    }

    #tutorial-phone {
        height: auto;
        width: 100%;
    }
</style>