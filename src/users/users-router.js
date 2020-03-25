const express = require('express');
const path = require('path');
const UserService = require('./users-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
    .route('/')
    .post(jsonBodyParser, (req, res, next) => {
        const {password, username, fullname} = req.body;

        //Check requires fields are present
        for(const field of ['fullname', 'username', 'password'])
            if(!req.body[field]){
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                });
            }
        
        //Validate password, it it fails, display an error
        const passwordError = UserService.validatePassword(password);

        if(passwordError){
            return res.status(400).json({error: passwordError});
        }

        //Check if username already exists
        UserService.hasUserWithUserName(
            req.app.get('db'),
            username
        )
        .then(hasUserWithUserName => {
            if(hasUserWithUserName){
                return res.status(400).json({error: `Username already taken`});
            }

            return UserService.hashPassword(password)
                .then(hashedPassword => {
                    const newUser = {
                        username,
                        password: hashedPassword,
                        fullname,
                        date_created: 'now()',
                    }

                    return UserService.insertUser(
                        req.app.get('db'),
                        newUser
                    )
                    .then(user => {
                        res
                            .status(201)
                            .location(path.posix.join(req.originalUrl, `/${user.id}`))
                            .json(UserService.serializeUser(user));
                    });
            });
        })
        .catch(next);
    });

module.exports = usersRouter;