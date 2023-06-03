export function hide(element) {
    document.getElementById(element).style.display = 'none'
}

export function show(element) {
    document.getElementById(element).style.display = 'block'
}

export var isOnMobile = /Mobile|Android/.test(navigator.userAgent) ? true : false