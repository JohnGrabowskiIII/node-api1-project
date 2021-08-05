const {find, findById, insert, update, remove} = require('./users/model')

// BUILD YOUR SERVER HERE

const express = require('express');

// SERVER SETUP
const server = express();

console.log('test server')

server.use(express.json())

// ENDPOINTS

server.post('/api/users/', async (req, res) => {

    const body = req.body;

    const isBodyValid = body.name && body.bio;

    if (!isBodyValid) res.status(400).json({message: "Please provide name and bio for the user"})

    try {

        const postUser = await insert(body);
        res.status(201).json(postUser);

    } catch(err) {

        res.status(500).json({message: "There was an error while saving the user to the database"})

    }

})

server.get('/api/users/', async (req, res) => {

    try {

        const users = await find();
        res.status(200).json(users);

    } catch(err) {
        res.status(500).json({message: "The users information could not be retrieved"})
    }

})

server.get('/api/users/:id', (req, res) => {

    const userId = req.params.id;

    findById(userId)
        .then(then => {
            if (then) {
                res.status(200).json(then)
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "The user information could not be retrieved"})
        })

} )

server.use('*', (req, res) => {
    res.status(200).json({message: 'server is running'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
