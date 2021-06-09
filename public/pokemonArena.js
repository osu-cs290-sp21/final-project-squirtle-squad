var pokeStats = document.querySelectorAll(".stat")

var pokeAttackUser = pokeStats[1].textContent
var userAttack = pokeAttackUser.replace('ATK:', '')

var pokeDefenseUser = pokeStats[2].textContent
var userDefense = pokeDefenseUser.replace('DEF:', '')

var pokeAttackSpecialUser = pokeStats[3].textContent
var userAttackSpecial = pokeAttackSpecialUser.replace('SP_ATK:', '')

var pokeDefenseSpecialUser = pokeStats[4].textContent
var userDefenseSpecial = pokeDefenseSpecialUser.replace('SP_DEF:', '')

var pokeSpeedUser = pokeStats[5].textContent
var userSpeed = pokeSpeedUser.replace('SPD: ', '')

var pokeAttackOppo = pokeStats[7].textContent
var oppoAttack = pokeAttackOppo.replace('ATK:', '')

var pokeDefenseOppo = pokeStats[8].textContent
var oppoDefense = pokeDefenseOppo.replace('DEF:', '')

var pokeAttackSpecialOppo = pokeStats[9].textContent
var oppoAttackSpecial = pokeAttackSpecialOppo.replace('SP_ATK:', '')

var pokeDefenseOppo = pokeStats[10].textContent
var oppoDefenseSpecial = pokeDefenseOppo.replace('SP_DEF:', '')

var pokeSpeedOppo = pokeStats[11].textContent
var oppoSpeed = pokeSpeedOppo.replace('SPD: ', '')

console.log(userSpeed.length)
console.log(oppoSpeed.length)

var textBoxUser = document.getElementById('user')
var textBoxOppo = document.getElementById('oppo')
var textEntryUser = textBoxUser.querySelector('.text-entry')
var textEntryOppo = textBoxOppo.querySelector('.text-entry')

var resetButton = document.getElementById('reset-button')

var attackButton = document.querySelectorAll('.move')
attackButton[0].addEventListener('click', function(){textOutput(attackButton[0])})
attackButton[1].addEventListener('click', function(){textOutput(attackButton[1])})
attackButton[2].addEventListener('click', function(){textOutput(attackButton[2])})
attackButton[3].addEventListener('click', function(){textOutput(attackButton[3])})

var endBattle = 1;
var whichMoveUser
var whichMoveOppo
var turn
var userHit
var oppoHit

function attack(whichMon, move){
  var damage = 0
  var critical = 1
  var pokeHealthOppo = document.getElementById('opponenthealth').textContent
  var oppoHealthA = pokeHealthOppo.split('/')[0]
  var oppoHealthB = pokeHealthOppo.split('/')[1]
  var pokeHealthUser = document.getElementById('userhealth').textContent
  var userHealthA = pokeHealthUser.split('/')[0]
  var userHealthB = pokeHealthUser.split('/')[1]
  var movePowerU = move.querySelector(".power")
  var movePower = movePowerU.textContent.replace('Power:', '')
  var movePPU = move.querySelector(".pp")
  var movePP = movePPU.textContent.replace('PP:', '')
  var moveCatU = move.querySelector(".category")
  var moveCat = moveCatU.textContent.replace('Move Type:', '')

  if (whichMon == 1){
    if (oppoHit){
      if(Math.floor(Math.random()*24) == 1){
        critical = 1.5
      }
      if(moveCat == "physical"){
        damage = ((((oppoAttack * movePower)/userDefense)/50)+2) * critical * 5
      }
      else{
        damage = ((((oppoAttackSpecial * movePower)/userDefenseSpecial)/50)+2) * critical * 5
      }
      movePP.textContent = movePP - 1
    }


    var newHealth = Math.round(userHealthA - damage)
	healthbar(1, newHealth, userHealthB)
    document.getElementById('userhealth').innerHTML = newHealth + "/" + userHealthB
	if(turn){
		var pokeName = document.getElementById('userPokemon')
		var moveAccuracyUser = whichMoveUser.querySelector(".accuracy")
	var moveAccuracyU = moveAccuracyUser.textContent.replace('Accuracy:', '')
		if((moveAccuracyU * 100) >= Math.floor(Math.random() *100)){
				textEntryUser.textContent = pokeName.textContent + " used " + whichMoveUser.querySelector('.moveName').textContent + "..."
				userHit = 1
			}
		else{
				textEntryUser.textContent = pokeName.textContent + " used " + whichMoveUser.querySelector('.moveName').textContent + ", It missed..."
				userHit = 0
			}
		textBoxUser.classList.remove('hidden')
		turn = false
	}
  }
	if (whichMon == 0){
		if (userHit){
		  if(Math.floor(Math.random()*24) == 1){
			critical = 1.5
		  }
      if(moveCat == "physical"){
		    damage = ((((userAttack * movePower)/oppoDefense)/50)+2) * critical * 5
      }
      else{
        damage = ((((userAttackSpecial * movePower)/oppoDefenseSpecial)/50)+2) * critical * 5
      }
		  movePP.textContent = movePP - 1
		}
		else{
			console.log("attack missed")
			setTimeout(function(){
			}, 3000)
			var pokeName = document.getElementById('userPokemon')
				textEntryUser.textContent = ""
				textEntryUser.textContent = pokeName.textContent + "'s attack missed!"
		}

		var newHealth = Math.round(oppoHealthA - damage)
		healthbar(0, newHealth, oppoHealthB)
		document.getElementById('opponenthealth').innerHTML = newHealth + "/" + oppoHealthB
		if(turn){
			var moveAccuracyOppo = whichMoveOppo.querySelector(".accuracy")
			var moveAccuracyO = moveAccuracyOppo.textContent.replace('Accuracy:', '')
			var pokeName = document.getElementById('opponentPokemon')
			if((moveAccuracyO * 100) >= Math.floor(Math.random() *100)){
			textEntryOppo.textContent = pokeName.textContent + " used " + whichMoveOppo.querySelector('.moveName').textContent + "..."
			oppoHit = 1
			}
			else{
			textEntryOppo.textContent = pokeName.textContent + " used " + whichMoveOppo.querySelector('.moveName').textContent + ", It missed..."
			oppoHit = 0
			}
			textBoxOppo.classList.remove('hidden')
			turn = false
		}
	  }
  if (0 >= newHealth ){

	  resetButton.classList.toggle('hidden')
	  newHealth = 0;
    if (whichMon == 0){
		endBattle = 0;
		textBoxOppo.classList.add('hidden')
		document.getElementById('opponenthealth').innerHTML = newHealth + "/" + oppoHealthB
      alert("Your Opponent's Pokemon has fainted. You Win! (Press the reset button Below to play again with the same pokemon!)")
    }
    else{
		endBattle = 0;
		textBoxUser.classList.add('hidden')
		document.getElementById('userhealth').innerHTML = newHealth + "/" + userHealthB
      alert("Your Pokemon has fainted. You Lost! (Press the reset button Below to play again with the same pokemon!)")
    }
  }
}

function healthbar(whichMon, newHealth, healthB){
  var fraction = newHealth/healthB
  fraction = (fraction.toPrecision(1) * 10)
  if (whichMon == 0){
    var battlebox = document.getElementById("computer")
    var healthBar = battlebox.querySelectorAll(".green")
    for (var i = 0; i < 10; i++){
      healthBar[i].classList.add("hidden")
    }
    for (var i = 0; i < fraction; i++){
      healthBar[i].classList.remove("hidden")
    }
  }
  else{
    var battlebox = document.getElementById("player")
    var healthBar = battlebox.querySelectorAll(".green")
    for (var i = 0; i < 10; i++){
      healthBar[i].classList.add("hidden")
    }
    for (var i = 0; i < fraction; i++){
      healthBar[i].classList.remove("hidden")
    }
  }
}

var userMoves = document.getElementsByClassName('move')

userMoves[0].addEventListener('mouseover',  function(){unHiddenMove(0)})
userMoves[0].addEventListener('mouseout',  function(){unHiddenMove(0)})

userMoves[1].addEventListener('mouseover',  function(){unHiddenMove(1)})
userMoves[1].addEventListener('mouseout',  function(){unHiddenMove(1)})

userMoves[2].addEventListener('mouseover',  function(){unHiddenMove(2)})
userMoves[2].addEventListener('mouseout',  function(){unHiddenMove(2)})

userMoves[3].addEventListener('mouseover',  function(){unHiddenMove(3)})
userMoves[3].addEventListener('mouseout',  function(){unHiddenMove(3)})

function unHiddenMove(index){
	var moveInfo = []
	moveInfo.push(userMoves[index].querySelector('.power'))
	moveInfo.push(userMoves[index].querySelector('.pp'))
	moveInfo.push(userMoves[index].querySelector('.accuracy'))
  moveInfo.push(userMoves[index].querySelector('.category'))
	for(var i = 0; i < 4; i++){
		moveInfo[i].classList.toggle('hidden')
	}
}


function textOutput(userMove) {
	var moveAccuracyUser = userMove.querySelector(".accuracy")
	var moveAccuracyU = moveAccuracyUser.textContent.replace('Accuracy:', '')
	turn = true
	var rand = Math.floor(Math.random() * 4)
	var oppoMove = attackButton[rand+4]
	var moveAccuracyOppo = oppoMove.querySelector(".accuracy")
	var moveAccuracyO = moveAccuracyOppo.textContent.replace('Accuracy:', '')
	whichMoveUser = userMove
	whichMoveOppo = oppoMove
	if(userSpeed > oppoSpeed){
		if(endBattle){

			var pokeName = document.getElementById('userPokemon')

			if((moveAccuracyU * 100) >= Math.floor(Math.random() *100)){
				textEntryUser.textContent = pokeName.textContent + " used " + userMove.querySelector('.moveName').textContent + "..."
				userHit = 1
			}
			else{
				textEntryUser.textContent = pokeName.textContent + " used " + userMove.querySelector('.moveName').textContent + ", It missed..."
				userHit = 0
			}
			textBoxUser.classList.remove('hidden')
		}
	}
	else{
		if(endBattle){
		var pokeName = document.getElementById('opponentPokemon')

		if((moveAccuracyO * 100) >= Math.floor(Math.random() *100)){
			textEntryOppo.textContent = pokeName.textContent + " used " + oppoMove.querySelector('.moveName').textContent + "..."
			oppoHit = 1
		}
		else{
			textEntryOppo.textContent = pokeName.textContent + " used " + oppoMove.querySelector('.moveName').textContent + ", It missed..."
			oppoHit = 0
		}
		textBoxOppo.classList.remove('hidden')
		}
	}
}

textBoxUser.addEventListener('click', function(){

		textBoxUser.classList.add('hidden')
		attack(0, whichMoveUser)

})

textBoxOppo.addEventListener('click', function(){

		textBoxOppo.classList.add('hidden')
		attack(1, whichMoveOppo)

})

resetButton.addEventListener('click', function(){
	var pokeHealthOppo = document.getElementById('opponenthealth').textContent
	var oppoHealthA = pokeHealthOppo.split('/')[0]
	var oppoHealthB = pokeHealthOppo.split('/')[1]
	var pokeHealthUser = document.getElementById('userhealth').textContent
	var userHealthA = pokeHealthUser.split('/')[0]
	var userHealthB = pokeHealthUser.split('/')[1]
	oppoHealthA = oppoHealthB
	userHealthA = userHealthB
	document.getElementById('opponenthealth').innerHTML = oppoHealthA + "/" + oppoHealthB
	document.getElementById('userhealth').innerHTML = userHealthA + "/" + userHealthB
	endBattle = 1;
	healthbar(0, userHealthA, userHealthB)
	healthbar(1, oppoHealthA, oppoHealthB)
	resetButton.classList.toggle('hidden')
})
