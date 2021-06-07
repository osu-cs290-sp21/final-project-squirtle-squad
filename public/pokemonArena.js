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
attackButton[0].addEventListener('click', function(){attack(0, attackButton[0])})
attackButton[1].addEventListener('click', function(){attack(0, attackButton[1])})
attackButton[2].addEventListener('click', function(){attack(0, attackButton[2])})
attackButton[3].addEventListener('click', function(){attack(0, attackButton[3])})

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
      damage = ((((userAttack * movePower)/oppoDefense)/50)+2) * critical * 5
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
      damage = ((((oppoAttack * movePower)/userDefense)/50)+2) * critical * 5
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
