var express = require('express');
var app = express();
var fs = require('fs');
var exphbs = require('express-handlebars');
var pokemonArray = require('./resources/pokemon.json');
var pokemonMoves = require('./resources/moves.json')
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
  var userVal = Math.floor(Math.random() * 252)
  var oppoVal = Math.floor(Math.random() * 252)

  var userPoke = pokemonArray[userVal]
  userPoke.hp = ((userPoke.hp * 2 + 8) * 50 / 100 + 50 + 10)
  userPoke.attack = ((userPoke.attack * 2 + 8) * 50 / 100 + 5)
  userPoke.defense = ((userPoke.defense * 2 + 8) * 50 / 100 + 5)
  var oppoPoke = pokemonArray[oppoVal]
  oppoPoke.hp = ((oppoPoke.hp * 2 + 8) * 50 / 100 + 50 + 10)
  oppoPoke.attack = ((oppoPoke.attack * 2 + 8) * 50 / 100 + 5)
  oppoPoke.defense = ((oppoPoke.defense * 2 + 8) * 50 / 100 + 5)
  var movesU = []
  var movesNumU = []
  var movesO = []
  var movesNumO = []
  for(var i = 0; i < 4; i++){
    do {
      var rand = Math.floor(Math.random() * 98)
      var numbers = movesNumU.includes(rand)
      if(!numbers){
        movesNumU.push(rand)
      }
    } while (numbers)
  }
  for(var i = 0; i < 4; i++){
    movesU.push(pokemonMoves[movesNumU[i]])
  }
  for(var i = 0; i < 4; i++){
    do {
      var rand = Math.floor(Math.random() * 98)
      var numbers = movesNumO.includes(rand)
      if(!numbers){
        movesNumO.push(rand)
      }
    } while (numbers)
  }
  for(var i = 0; i < 4; i++){
    movesO.push(pokemonMoves[movesNumO[i]])
  }

	res.status(200).render('pokemonArena', {
    userPoke: userPoke,
    oppoPoke: oppoPoke,
    movesU: movesU,
    movesO: movesO
  }
)
});

app.get('*', function (req, res, next) {
    res.status(404).render('404');
});

app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});
