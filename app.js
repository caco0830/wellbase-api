require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./src/config');
const usersRouter = require('./src/users/users-router');
const authRouter = require('./src/auth/auth-router');
const foodAPIRouter = require('./src/foodDataAPI/foodAPI-router');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/foodAPI', foodAPIRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});


module.exports = app;