import * as utils from './utils'

export default function setTexts(json_data, backup_data) {
    let keys = Object.keys(json_data)
    keys.forEach((key) => {
        try {
            if (json_data[key].specialFunctions) {
                let functionPropertyName = Object.keys(json_data[key]['specialFunctions'][String(Object.keys(json_data[key].specialFunctions)[0])])[0] // setAttribute(PLACEHOLDER, "content")
                let functionPropertyValue = json_data[key]['specialFunctions'][String(Object.keys(json_data[key].specialFunctions)[0])][Object.keys(json_data[key]['specialFunctions'][Object.keys(json_data[key].specialFunctions)[0]])[0]] // setAttribute(placeholder, "CONTENT")
                let finalFunction = String(Object.keys(json_data[key].specialFunctions)[0] + '(' + '"' + functionPropertyName + '"' + ',' + '"' + functionPropertyValue + '"' +  ')')
                eval(`document.getElementById("${key}").${finalFunction}`)
            }
            else if (json_data[key].content == null) {
                if (!String(key).startsWith('COMMENT')) {
                    if (backup_data[key]['innerHTML']) {
                        document.getElementById(key).innerHTML = backup_data[key]['content'];
                    }
                    else {
                        document.getElementById(key).innerText = backup_data[key]['content'];
                    }
                }
            }
            else {
                if (!String(key).startsWith('COMMENT')) {
                    if (json_data[key]['innerHTML']) {
                        document.getElementById(key).innerHTML = json_data[key]['content'];
                    }
                    else {
                        document.getElementById(key).innerText = json_data[key]['content'];
                    }
                }
            }
        }
        catch (error) {
            utils.toast('Unable to set the value of a key while applying translations, please check console for more info', 'warning', 2000)
            throw "Unable to set value of '" + key + "'; " + error
        }
    })
}