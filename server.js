var express = require('express');
var app = express();
var fs = require('fs');

port = 3000;
var pokemonArray;

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

//This function turns the csv storing our data for stats into a json
function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");

    //Get our sprites
    var rawSpritesTable = fs.readFileSync("resources/spriteSheets_Links").toString().split("\n");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        //The abilities array is redundant, so we remove it since the commas inside make it harder to use
        var charactersToRemove = lines[i].indexOf("\"", 1)+1;
        var data = lines[i].slice(charactersToRemove);
        var currentline=data.split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        if(i < rawSpritesTable.length+1) {
            var sprite = rawSpritesTable[i-1].slice(0,-1);
            obj.sprite = sprite.split(" ")[2];
        }
        
        result.push(obj);
  
    }
    
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
}

function setup() {
    var csv = fs.readFileSync("resources/pokemon.csv").toString();
    pokemonArray = csvJSON(csv);
    console.log(pokemonArray[0]);
}

setup();

app.listen(port, function () {
    console.log("Server has begun listening on port " + port);
});