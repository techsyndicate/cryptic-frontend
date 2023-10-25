function getFrontendUrl() {
    if (process.env.NODE_ENV === 'production') {
        return "http://20.219.168.138/";
    } else {
        return 'http://localhost:4000/';
    }
}

module.exports = {
    getFrontendUrl
};