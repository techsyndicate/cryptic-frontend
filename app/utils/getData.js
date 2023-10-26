const { getFrontendUrl } = require("./misc");

async function getUser() {
    return fetch(getFrontendUrl() + "auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + document.cookie.split('VeinAuth=')[1].split(';')[0],
        }
    }).then(res => res.json());
}

async function getLevel() {
    return fetch(getFrontendUrl() + "level/current", {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + document.cookie.split('VeinAuth=')[1].split(';')[0],
        }
    }).then(res => res.json());
}

async function setUserLevel(id) {

    return fetch(getFrontendUrl() + "level/setlevel/"+id, {
        method: "GET",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + document.cookie.split('VeinAuth=')[1].split(';')[0],
        }
    }).then(res => res.json());
}

module.exports = {
    getUser, getLevel, setUserLevel
};