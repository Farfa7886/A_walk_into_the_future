import localforage from "localforage";
import langs from '../../translations/languagesExport'
import './setLanguage'
import setTexts from "./setLanguage";




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