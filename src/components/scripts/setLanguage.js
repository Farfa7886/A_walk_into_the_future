import * as utils from './utils'

export default function setTexts(json_data, backup_data) {
    let keys = Object.keys(json_data)
    keys.forEach((key) => {
        try {
            if (key == null) {
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