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



    hideModal();
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