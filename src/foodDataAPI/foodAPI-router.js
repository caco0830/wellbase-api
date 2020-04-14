const express = require('express');
const foodAPIService = require('./foodAPI-service');

const foodAPIRouter = express.Router();

foodAPIRouter
    .route('/:searchTerm')
    .get((req, res, next) => {
        foodAPIService.getFromAPI(req.params.searchTerm)
            .then(data => {
                res.json(data);
            })
            .catch(next);
    });

module.exports = foodAPIRouter;