import localforage from "localforage";
import langs from '../../translations/languagesExport'
import './setLanguage'
import setTexts from "./setLanguage";
import Swal from "sweetalert2";




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

export async function setup() {
    let language;
    if (await localforage.getItem('language') == null) {
        language = (navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage)).split("-")[0];
        console.log(language);
        await localforage.setItem("language", language);
    }
    else {
        try {
            language = await localforage.getItem('language')
        }
        catch (e) {
            throw [e, "; using default language english"]
        }
    }
    console.log(langs)
    setTexts(langs[language], langs.en)
}

export async function setLanguage(language, apply) {
    let validKeys = Object.keys(langs);
    console.log(language)
    let islangValid = validKeys.includes(language);
    if (islangValid) {
        await localforage.setItem("language", language)
    }
    else {
        throw "Language not valid" + "Allowed values: [" + validKeys + "]"
    }

    if (apply) {
        setTexts(langs[language], langs.en)
    }
}

export async function getCurrentLanguage() {
    return await localforage.getItem('language')
} 

export function onLoad(function_run) {
    document.addEventListener("DOMContentLoaded", function () {
        function_run();
    });
}

export function toast(text, icon, timer, showConfirmButton, showTimerProgressBar, toastPosition) {
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

export function isEmpty(text) {
    if (text == '' || text == null) return true
    let splittedText = text.split('');
    let isEmpty = true;
    splittedText.forEach(element => {
        if (isEmpty) {
            if (element != ' ') {
                isEmpty = false
            }
        }
    });

    return isEmpty;
}

export function mathRandomInt(a, b) {
    if (a > b) {
      // Swap a and b to ensure a is smaller.
      var c = a;
      a = b;
      b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  