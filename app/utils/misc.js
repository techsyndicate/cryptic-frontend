function getFrontendUrl() {
    if (process.env.NODE_ENV === 'production') {
        return "http://backend.encryptid.live/";
    } else {
        return 'http://localhost:4000/';
    }
}

module.exports = {
    getFrontendUrl
};