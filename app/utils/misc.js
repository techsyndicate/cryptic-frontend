function getFrontendUrl() {
    if (process.env.NODE_ENV === 'production') {
        return process.env.PROD_URL;
    } else {
        return 'http://localhost:4000/';
    }
}

module.exports = {
    getFrontendUrl
};