var express = require('express');
var app = express();
var fs = require('fs');
var pokemonArray = require('./resources/pokemon.json');

port = 3000;

app.use(express.static('public'));

app.get('/pokemon/:id', function (req, res, next) {
    requestedPokemonID = req.params.id;
    if(requestedPokemonID < 387 && requestedPokemonID > 0 && requestedPokemonID != 201) {
        res.contentType("text");
        res.status(200).json(pokemonArray[requestedPokemonID-1])
    } else {
        res.status(404).send("Bad Pokemon")
    }
    
})


app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});