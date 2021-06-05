var express = require('express');
var app = express();
var fs = require('fs');
var exphbs = require('express-handlebars');
var pokemonArray = require('./resources/pokemon.json');
pokemonArray.length=251; //changed the length of array to include all pokemon up to gen 2

app.engine('handlebars', exphbs({defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

port = 3000;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.status(200).render('pokemonSelect', {
      data: pokemonArray,
      displayAll: 1
    })
})

app.get('/pokemon/:id', function (req, res, next) {
    requestedPokemonID = req.params.id;
    if(requestedPokemonID < 253 && requestedPokemonID > 0 && requestedPokemonID != 201) {
        var acceptsHTML = req.accepts("html");
        if(acceptsHTML.length > 0) {
            res.status(200).render('pokemonSelect', pokemonArray[requestedPokemonID-1])
        } else {
            res.contentType("text");
            res.status(200).json(pokemonArray[requestedPokemonID-1]);
        }
    } else {
        res.status(404).send("Bad Pokemon");
    }
});

app.get('/battle', function (req, res, next) {
	res.status(200).render('pokemonArena')
});

app.get('*', function (req, res, next) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});
