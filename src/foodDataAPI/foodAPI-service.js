const config = require('../config');
const request = require('request');
const fetch = require('node-fetch');

const foodAPIService = {
    getFromAPI(searchTerm) {
        return fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${config.FOODDATA_KEY}&query=${searchTerm}`)
            .then(data => data.json())
    },
}

module.exports = foodAPIService;