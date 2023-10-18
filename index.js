// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file

});

// hello world route
// req.query: return whatever the queries are at the end of the request
// Exampe the API request localhost:8080/api/tree/search?name=testName will return
// testName as the query
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database - working good 
// This  API is only configured to get request 
app.get('/api/v1/pets', (req, res) => {
    res.send(pets);
    // send the pets array as a response
});

// get pet by owner with query string - working on this ne aS it is giving error atm
// when adding v1 or v2 you are upgrading to a new version of your api

// This is getting the pet by its owner query  for example: ?owner=John
// with queries I am filtering > more of a search than find a single item
app.get('/api/v1/pets/search', (req, res) => {
    // get the owner from the request - extract from query parameters string
    const { owner } = req.query;
    // find the pet in the pets array
    // filter in case there are multiple owner names that are the same 
    const filteredPets = pets.filter (pet => pet.owner === owner);
    res.send(filteredPets);
    // send the pet as a response

});

// get pet by name - Getting the pet by ID 

app.get('/api/v1/pets/:id', (req, res) => {
    // get the name from the request
    const { id } = req.params;
    // find the pet (need to turn the string ID from the URL into a number)
    const pet = pets.find(pet => pet.id === Number(id));
    res.send(pet);

    // params are for things that are variables that are defined 
    // similar to function parameter

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;