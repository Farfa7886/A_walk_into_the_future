<script setup>
    import * as utils from './scripts/utils'
    import PastVersions from './changelog/PastVersion.vue'
    import CurrentVersion from './changelog/CurrentVersion.vue'
    import FutureVersion from './changelog/FutureVersion.vue'
</script>

<template>
    <div id="main-container" class="grid grid-rows-3 grid-flow-col gap-4">
        <div id="center-div-cl-prev">
            <p class="text-3xl" style="margin-bottom: 50px" id="changelog-prev-ver-pc">Previous versions</p>
            <div class="divider"></div>
            <PastVersions />
        </div>
        <div id="left-div-current">
            <p class="text-3xl" style="margin-bottom: 50px" id="changelog-current-ver-pc">Current version</p>
            <div class="divider"></div>
            <CurrentVersion />
        </div>
        <div id="right-div-future">
            <p class="text-3xl" style="margin-bottom: 50px" id="changelog-future-ver-pc">Incoming features for the next versions</p>
            <div class="divider"></div>
            <FutureVersion />
        </div>
    </div>
    <div id="mobile-layout">
        <p class="text-3xl changelog-card-mobile" style="margin-bottom: 50px" id="changelog-current-ver-mobile">Current version</p>
        <div class="divider"></div>
        <div class="changelog-card-mobile"><CurrentVersion /></div>
        <p class="text-3xl changelog-card-mobile" style="margin-bottom: 50px" id="changelog-future-ver-mobile">Incoming features for the next versions</p>
        <div class="divider"></div>
        <div class="changelog-card-mobile"><FutureVersion /></div>
        <p class="text-3xl changelog-card-mobile" style="margin-bottom: 50px" id="changelog-prev-ver-mobile">Previous versions</p>
        <div class="divider"></div>
        <div class="changelog-card-mobile"><PastVersions /></div>
    </div>
</template>

<style>
@import '../assets/changelog.css';
</style>

<script>

document.addEventListener("DOMContentLoaded", function () {
    if (utils.isOnMobile) {
        utils.hide('main-container')
    }
    else {
        utils.hide('mobile-layout')
    }
});

</script>