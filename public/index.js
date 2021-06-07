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
    console.log("Cards: ", cards)
    var match = cards.includes(searchQuery.value.toLowerCase());
    if(!match) {
      searchCard.parentNode.parentNode.remove();
    }
  })
}

var clickSearchButton = document.getElementById('navbar-search-button')
clickSearchButton.addEventListener('click', searchByClicking)

var liveSearch = document.getElementById('navbar-search-input')
liveSearch.addEventListener('input', searchByClicking)
