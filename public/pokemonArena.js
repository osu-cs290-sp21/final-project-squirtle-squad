var pokeStats = document.querySelectorAll(".stat")

var pokeAttackUser = pokeStats[1].textContent
var userAttack = pokeAttackUser.replace('ATK:', '')

var pokeDefenseUser = pokeStats[2].textContent
var userDefense = pokeDefenseUser.replace('DEF:', '')

var pokeSpeedUser = pokeStats[5].textContent
var userSpeed = pokeSpeedUser.replace('SPD:', '')

var pokeAttackOppo = pokeStats[7].textContent
var oppoAttack = pokeAttackOppo.replace('ATK:', '')

var pokeDefenseOppo = pokeStats[8].textContent
var oppoDefense = pokeDefenseOppo.replace('DEF:', '')

var pokeSpeedOppo = pokeStats[11].textContent
var oppoSpeed = pokeSpeedOppo.replace('SPD:', '')

var textBoxUser = document.getElementById('user')
var textBoxOppo = document.getElementById('oppo')
var textEntryUser = textBoxUser.querySelector('.text-entry')
var textEntryOppo = textBoxOppo.querySelector('.text-entry')

var attackButton = document.querySelectorAll('.move')
attackButton[0].addEventListener('click', function(){textOutput(attackButton[0])})
attackButton[1].addEventListener('click', function(){textOutput(attackButton[1])})
attackButton[2].addEventListener('click', function(){textOutput(attackButton[2])})
attackButton[3].addEventListener('click', function(){textOutput(attackButton[3])})

var whichMoveUser
var whichMoveOppo
var turn

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

  
  if (whichMon == 1){
    if ((moveAccuracy * 100) >= Math.floor(Math.random() *100)){
      if(Math.floor(Math.random()*24) == 1){
        critical = 1.5
      }
      damage = ((((oppoAttack * movePower)/userDefense)/50)+2) * critical * 5
      movePP.textContent = movePP - 1
    }
	
    var newHealth = Math.round(userHealthA - damage)
    document.getElementById('userhealth').innerHTML = newHealth + "/" + userHealthB
	
	if(turn){
		var pokeName = document.getElementById('userPokemon')
		textEntryUser.textContent = pokeName.textContent + " used " + whichMoveUser.querySelector('.moveName').textContent + "..."
		textBoxUser.classList.remove('hidden')
		turn = false
	}
  }
	if (whichMon == 0){
		if ((moveAccuracy * 100) >= Math.floor(Math.random() *100)){
		  if(Math.floor(Math.random()*24) == 1){
			critical = 1.5
		  }
		  damage = ((((userAttack * movePower)/oppoDefense)/50)+2) * critical * 5
		  movePP.textContent = movePP - 1
		}
		
		var newHealth = Math.round(oppoHealthA - damage)
		document.getElementById('opponenthealth').innerHTML = newHealth + "/" + oppoHealthB
		if(turn){
			var pokeName = document.getElementById('opponentPokemon')
			textEntryOppo.textContent = pokeName.textContent + " used " + whichMoveOppo.querySelector('.moveName').textContent + "..."
			textBoxOppo.classList.remove('hidden')
			turn = false
		}
	  }
  if (0 >= newHealth ){
    if (whichMon == 0){
      alert("Your Opponent's Pokemon has fainted. You Win! (Restart page to retry)")
    }
    else{
      alert("Your Pokemon has fainted. You Lost! (Restart page to retry)")
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
	for(var i = 0; i < 3; i++){
		moveInfo[i].classList.toggle('hidden')
	}
}


function textOutput(userMove) {
	turn = true
	var rand = Math.floor(Math.random() * 4)
	var oppoMove = attackButton[rand+4]
	whichMoveUser = userMove
	whichMoveOppo = oppoMove
	if(userSpeed > oppoSpeed){
		var pokeName = document.getElementById('userPokemon')
		textEntryUser.textContent = pokeName.textContent + " used " + userMove.querySelector('.moveName').textContent + "..."
		textBoxUser.classList.remove('hidden')
	}
	else{
		var pokeName = document.getElementById('opponentPokemon')
		textEntryOppo.textContent = pokeName.textContent + " used " + oppoMove.querySelector('.moveName').textContent + "..."
		textBoxOppo.classList.remove('hidden')
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