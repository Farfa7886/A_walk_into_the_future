<script setup>
    import Past_versions from './Past-versions-changelog.vue'
</script>

<template>
    <div id="main-container" class="grid grid-rows-3 grid-flow-col gap-4">
        <div id="center-div-cl-prev">
            <p class="text-3xl" style="margin-bottom: 50px">Previous versions</p>
            <div class="divider"></div>
            <Past_versions />
        </div>
        <div id="left-div-current">
            <p class="text-3xl" style="margin-bottom: 50px">Current version</p>
            <div class="divider"></div>
            <div class="collapse bg-base-200 collapse-arrow border border-base-300">
                <input type="checkbox" /> 
                <div class="collapse-title text-xl font-medium">
                    ALPHA 7
                </div>
                <div class="collapse-content eeee"> 
                    <pre>
[  RE-DONE  ] Game container site
[   ADDED   ] Rooms for the visitable house
[  IMPROVED ] Touch screen support
[  IMPROVED ] Mobile support
[  IMPROVED ] Invisible walls
[  IMPROVED ] Guidance signs
[   BUGFIX  ] Game not loading on some mobile devices
[  IMPROVED ] Solar panels are now not randomly placed
                    </pre>
                </div>
            </div>
        </div>
        <div id="right-div-future">
            <p class="text-3xl" style="margin-bottom: 50px">Incoming features for the next versions</p>
            <div class="divider"></div>
            <div class="collapse bg-base-200 collapse-arrow border border-base-300">
                <input type="checkbox" /> 
                <div class="collapse-title text-xl font-medium">
                    ALPHA 8
                </div>
                <div class="collapse-content eeee"> 
                    <pre>
[ CONFIRMED ] More details to the map
[ CONFIRMED ] New building
[  PROBABLY ] <strong>Android</strong> app
                    </pre>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import '../assets/changelog.css';
</style>

<script>

</script>