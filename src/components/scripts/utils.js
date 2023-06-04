if (screen.orientation.type === 'portrait-primary') {
    orientation = "portrait"
} else if (screen.orientation.type === 'landscape-primary') {
    orientation = "landscape"
}

screen.orientation.addEventListener('change', function() {
    if (screen.orientation.type === 'portrait-primary') {
        orientation = "portrait"
    } else if (screen.orientation.type === 'landscape-primary') {
        orientation = "landscape"
    }
});

export function hide(element) {
    document.getElementById(element).style.display = 'none'
}

export function show(element) {
    document.getElementById(element).style.display = 'block'
}

export var isOnMobile = /Mobile|Android/.test(navigator.userAgent) ? true : false

export var orientation

export function isVisible(element) {
    if (document.getElementById(element).style.display == 'block') {
        return true
    }
    else {
        return false
    }
}