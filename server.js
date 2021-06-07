var express = require('express');
var app = express();
var fs = require('fs');
var exphbs = require('express-handlebars');
var pokemonArray = require('./resources/pokemon.json');
var customPokemonArray = require('./resources/customPokemon.json');
var pokemonTypes = require('./resources/types.json');
pokemonArray.length=251; //changed the length of array to include all pokemon up to gen 2

app.engine('handlebars', exphbs({defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

port = 3000;

app.use(express.json())
app.use(express.static('public'));

app.post('/pokemon/createPokemon', function (req, res) {
    if(req.body && req.body.type && req.body.height && req.body.name && req.body.frontSprite && req.body.backSprite) {
        console.log("Creating new pokemon")
        //Create our Pokemon Object
        var customPokemon = {
            "abilities": "[]",
            ...pokemonTypes[req.body.type],
            "attack": Math.round(0+randn()*160).toString(),
            "base_egg_steps": Math.round(5000+randn()*5000).toString(),
            "base_happiness": "70",
            "base_total": "0",
            "capture_rate": Math.round(0+randn()*255).toString(),
            "classfication": "Custom Pokémon",
            "defense": Math.round(0+randn()*140).toString(),
            "experience_growth": "1250000",
            "height_m": req.body.height,
            "hp": Math.round(25+randn()*125).toString(),
            "japanese_name": "例のポケモン",
            "name": req.body.name,
            "percentage_male": "50",//TODO: Has some specific things it can be. Use those? or just keep 50%?
            "pokedex_number": (252+customPokemonArray.length).toString(),
            "sp_attack": Math.round(0+randn()*142).toString(),
            "sp_defense": Math.round(0+randn()*140).toString(),
            "speed": Math.round(0+randn()*140).toString(),
            "type1": req.body.type,
            "type2": "",
            "weight_kg": Math.abs(Math.round(-200+randn(10)*400)).toString(),//TODO: This be a rand dist? or ask user
            "generation": "Custom",
            "is_legendary": "0",
            "front-sprite": req.body.frontSprite,
            "back-sprite": req.body.backSprite
        };

        customPokemon.base_total = customPokemon.attack + customPokemon.defense + customPokemon.hp + customPokemon.sp_attack + customPokemon.sp_defense;

        customPokemonArray.push(customPokemon);

        fs.writeFile(
            __dirname + '/resources/customPokemon.json',
            JSON.stringify(customPokemonArray, null, 2),
            function (err) {
              if (err) {
                res.status(500).send("Error writing new data.  Try again later.");
              } else {
                res.status(200).send();
              }
            }
          );


    } else {
        res.status(400).send("Request needs a proper body");
    }
});

app.get('/', function (req, res) {
    res.status(200).render('pokemonSelect', {
      data: [...pokemonArray, ...customPokemonArray],
      displayAll: 1
    })
});

app.get('/pokemon/:id', function (req, res, next) {
    requestedPokemonID = req.params.id;
    if(requestedPokemonID < 252 && requestedPokemonID > 0) {
        var acceptsHTML = req.accepts("html");
        if(acceptsHTML.length > 0) {
            res.status(200).render('pokemonSelect', pokemonArray[requestedPokemonID-1])
        } else {
            res.contentType("text");
            res.status(200).json(pokemonArray[requestedPokemonID-1]);
        }
    } else if(requestedPokemonID > 0 && requestedPokemonID <= 251 + customPokemonArray.length){
        var acceptsHTML = req.accepts("html");
        if(acceptsHTML.length > 0) {
            res.status(200).render('pokemonSelect', customPokemonArray[requestedPokemonID-252])
        } else {
            res.contentType("text");
            res.status(200).json(customPokemonArray[requestedPokemonID-252]);
        }
    } else {
        res.status(404).render("404");
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




//Taken from stack overflow
function randn(v=5) {
    var r = 0;
    for(var i = v; i > 0; i --){
        r += Math.random();
    }
    return r / v;
}