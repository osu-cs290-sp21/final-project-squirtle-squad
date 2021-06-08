
var pokeStats = document.querySelectorAll(".stat")

var pokeAttackUser = pokeStats[1].textContent
var userAttack = pokeAttackUser.replace('ATK:', '')

var pokeDefenseUser = pokeStats[2].textContent
var userDefense = pokeDefenseUser.replace('DEF:', '')

var pokeAttackOppo = pokeStats[7].textContent
var oppoAttack = pokeAttackOppo.replace('ATK:', '')

var pokeDefenseOppo = pokeStats[8].textContent
var oppoDefense = pokeDefenseOppo.replace('DEF:', '')

var attackButton = document.querySelectorAll('.move')
if(window.location.href == "http://localhost:3000/battle"){
  attackButton[0].addEventListener('click', function(){attack(0, attackButton[0])})
  attackButton[1].addEventListener('click', function(){attack(0, attackButton[1])})
  attackButton[2].addEventListener('click', function(){attack(0, attackButton[2])})
  attackButton[3].addEventListener('click', function(){attack(0, attackButton[3])})
}

function attack(whichMon, move){
  var damage = 0
  var critical = 1
  var pokeHealthOppo = document.getElementById('opponenthealth').textContent
  var oppoHealthA = pokeHealthOppo.split('/')[0]
  var oppoHealthB = pokeHealthOppo.split('/')[1]
  var pokeHealthUser = document.getElementById('userhealth').textContent
  var userHealthA = pokeHealthUser.split('/')[0]
  var userHealthB = pokeHealthUser.split('/')[1]
  var moveAccuracyU = move.querySelector(".accuracy")
  var moveAccuracy = moveAccuracyU.textContent.replace('Accuracy:', '')
  var movePowerU = move.querySelector(".power")
  var movePower = movePowerU.textContent.replace('Power:', '')
  var movePPU = move.querySelector(".pp")
  var movePP = movePPU.textContent.replace('PP:', '')

  if (whichMon == 0){
    if ((moveAccuracy * 100) >= Math.floor(Math.random() *100)){
      if(Math.floor(Math.random()*24) == 1){
        critical = 1.5
      }
      damage = ((((userAttack * movePower)/oppoDefense)/50)+2) * critical
      movePP.textContent = movePP - 1
    }
    var newHealth = Math.round(oppoHealthA - damage)
    document.getElementById('opponenthealth').innerHTML = newHealth + "/" + oppoHealthB
  }
  if (whichMon == 1){
    if ((moveAccuracy * 100) >= Math.floor(Math.random() *100)){
      if(Math.floor(Math.random()*24) == 1){
        critical = 1.5
      }
      damage = ((((oppoAttack * movePower)/userDefense)/50)+2) * critical
      movePP.textContent = movePP - 1
    }
    var newHealth = Math.round(userHealthA - damage)
    document.getElementById('userhealth').innerHTML = newHealth + "/" + userHealthB
  }

  if (0 >= newHealth ){
    if (whichMon == 0){
      alert("Your Opponent's Pokemon has fainted. You Win! (Restart page to retry)")
    }
    else{
      alert("Your Pokemon has fainted. You Lost! (Restart page to retry)")
    }
  }

  if (whichMon == 0){
    var rand = Math.floor(Math.random() * 4)
    attack(1,attackButton[rand+4])
  }
}


var pokemonContainer = document.getElementsByClassName('pokemon-container')
var savedPokemon = []
var allPokemon = document.getElementsByClassName('pokemon flexItem')

for (var i=0; i<allPokemon.length; i++){
  savedPokemon[i]=allPokemon[i]
}

function showModal() {
    var modal = document.getElementById('create-pokemon-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
}

function hideModal() {
    var modal = document.getElementById('create-pokemon-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');

    modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');

    //Clean up
    var nameBox = document.getElementById('poke-name-input');
    var heightBox = document.getElementById('poke-height-input');
    var frontBox = document.getElementById('poke-frontSprite-input');
    var backBox = document.getElementById('poke-backSprite-input');

    nameBox.value = '';
    heightBox.value = '';
    frontBox.value = '';
    backBox.value = '';

    document.getElementById("defaultOption").selected = true;
}


function createPokemon() {
    //TODO: Sending the pokemon creation post request
    var pokeName = document.getElementById('poke-name-input').value.trim();
    var pokeType = document.getElementById('poke-type-input').value;
    var pokeHeight = document.getElementById('poke-height-input').value.trim();
    var frontSprite = document.getElementById('poke-frontSprite-input').value.trim();
    var backSprite = document.getElementById('poke-backSprite-input').value.trim();

    if(!pokeName || !pokeType || !pokeHeight || !frontSprite || !backSprite) {
        alert("Please populate all of the fields");
    } else {
        var req = new XMLHttpRequest();
        var reqURL = "/pokemon/createPokemon";
        req.open('POST', reqURL);

        var customPokemonShort = {
            "name": pokeName,
            "type": pokeType,
            "height": pokeHeight,
            "frontSprite": frontSprite,
            "backSprite": backSprite
        }

        var reqBody = JSON.stringify(customPokemonShort);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function (event) {
            console.log("HI")
            if (event.target.status == 200) {
                if(document.getElementsByClassName('battle-container')) {
                    return;
                }
                var pokeReq = new XMLHttpRequest();
                pokeReq.open('GET', '/pokemon/last');
                pokeReq.addEventListener('load', function (eventt) {
                    if (eventt.target.status == 200) {
                        console.log("Create Pokemon Succesful, trying to get details on new pokemon")
                        var res = pokeReq.responseText;
                        console.log(res)
                        var pokemonInfoCardTemplate = Handlebars.templates.pokemonInfoCard;
                        jres = JSON.parse(res);
                        var newPokemonInfoCardHTML = pokemonInfoCardTemplate(jres);
                        var pokemonContainer = document.getElementsByClassName("pokemon-container")[0];
                        pokemonContainer.insertAdjacentHTML('beforeend', newPokemonInfoCardHTML);

                        var customList = document.getElementsByClassName('custom-pokemon-list')[0];
                        customList.insertAdjacentHTML('beforeend', "<li><a href='/pokemon/" + res.pokedex_number + "'>" + jres.name + "</a>")
                    } else {
                        alert("Failed to get new pokemon. Refresh Page.\n error:\n" + event.target.response)
                    }
                });
                pokeReq.send();
            } else {
                alert("Failed to create pokemon. Try Again.\n error:\n" + event.target.response)
            }
        })

        req.send(reqBody);

        hideModal();
    }
}


function assignEvents() {
    var createPokemonButton = document.getElementById("create-pokemon-button");
    createPokemonButton.addEventListener("click", showModal);

    var closeModalButton = document.getElementById("modal-cancel-button");
    var cancelModalButton = document.getElementById("modal-close-button");
    closeModalButton.addEventListener("click", hideModal);
    cancelModalButton.addEventListener("click", hideModal);

    var acceptButton = document.getElementById("modal-accept-button");
    acceptButton.addEventListener("click", createPokemon);
}

window.onload = assignEvents;


function searchByClicking() {
  if(allPokemon.length < savedPokemon.length){
    pokemonContainer[0].classList.remove('pokemon', 'flexItem')
    for(var i=0; i<savedPokemon.length; i++){
      pokemonContainer[0].appendChild(savedPokemon[i])
    }
  }
  var searchQuery = document.getElementById('navbar-search-input')
  document.querySelectorAll(".ghost").forEach(function(searchCard){
    var cards = searchCard.innerText.toLowerCase()
    var match = cards.includes(searchQuery.value.toLowerCase());
    if(!match) {
      searchCard.parentNode.parentNode.remove();
    }
    // var containerOfPokemon = document.getElementsByClassName('pokemon-container')
    // var test = containerOfPokemon[0].getElementsByClassName('flexItem')
    // var customPokemonCard = containerOfPokemon[0].getElementsByClassName('customPokemonViewer')
    // if(test[0]==customPokemonCard[0]){
    //   console.log("Hello")
    //   var temp = test[0]
    //   test[0] = test[1]
    //   test[1] = temp
    // }
    // console.log("pokemon container: ", test[0], test[1])
    // console.log(customPokemonCard[0])
  })
}

function searchByClickingBattle() {
  if(allPokemon.length < savedPokemon.length){
    pokemonContainer[0].classList.remove('pokemon', 'flexItem')
    for(var i=0; i<savedPokemon.length; i++){
      pokemonContainer[0].appendChild(savedPokemon[i])
    }
  }
  var searchQuery = document.getElementById('navbar-search-input')
  if(window.location.href != "http://localhost:3000/"){
      sessionStorage.setItem('navbar-search-input', searchQuery.value.toLowerCase())
  }
  if(window.location.href != "http://localhost:3000/"){
    window.location.href = "http://localhost:3000/"
  }
  document.querySelectorAll(".ghost").forEach(function(searchCard){
    var cards = searchCard.innerText.toLowerCase()
    var match = cards.includes(sessionStorage.getItem('navbar-search-input'));
    if(!match) {
      searchCard.parentNode.parentNode.remove();
    }
  })
}

if (window.location.href == "http://localhost:3000/") {
  if(sessionStorage.getItem('navbar-search-input')) {
    searchByClickingBattle()
    document.getElementById('navbar-search-input').value = sessionStorage.getItem('navbar-search-input')
    sessionStorage.clear()
  }

  var clickSearchButton = document.getElementById('navbar-search-button')
  clickSearchButton.addEventListener('click', searchByClicking)

  var liveSearch = document.getElementById('navbar-search-input')
  liveSearch.addEventListener('input', searchByClicking)
}
else{
  var pressEnterButton = document.getElementById('navbar-search-input')
  pressEnterButton.addEventListener('keyup', function(event) {
    if(event.keyCode == 13) {
      event.preventDefault()
      searchByClickingBattle()
    }
  })

  var clickSearchButton = document.getElementById('navbar-search-button')
  clickSearchButton.addEventListener('click', searchByClickingBattle)
}

console.log("Session Storage: ", sessionStorage.getItem('navbar-search-input'))

console.log("== URL: ", window.location.href)
