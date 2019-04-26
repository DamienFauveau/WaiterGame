document.addEventListener('contextmenu', event => event.preventDefault())

/* EVENTS */
document.addEventListener('DOMContentLoaded', function(event) {

	/* play random song */
	PlayRandomSong()
	Array.prototype.forEach.call(document.getElementsByClassName("player"), function(element, index) {
		element.onended = function() {
			PlayRandomSong()
		}
	})

	/* move character to cursor */
	document.getElementById('gameContainer').onclick = function() {
		xpos = window.event.clientX
		ypos = window.event.clientY
		document.getElementById('waiter').style.top = ypos - 40 + 'px'
		document.getElementById('waiter').style.left = xpos - 35 + 'px'
	}

	/* characters random places */
	MovePeople()

	/* toggle modals */
	Array.prototype.forEach.call(document.getElementsByClassName("infosQuest"), function(element, index) {
		element.onclick = function() {
			switch(this.children[1].innerHTML) {
				case 'cocktail':
				if(Math.random() > 0.5) {
					document.getElementById('buttonCocktail').value = 'mojito'
					document.getElementById('modalCocktailName').innerHTML = 'Mojito'
				}
				else {
					document.getElementById('buttonCocktail').value = 'punch'
					document.getElementById('modalCocktailName').innerHTML = 'Punch'
				}
				document.getElementById('modalCocktail').style.display = "block"
				DeleteQuest(this)
				break
				case 'choice':
				if(Math.random() > 0.5) {
					document.getElementById('buttonAccept').value = 'drunk'
					document.getElementById('buttonDeny').value = 'drunk'
					DrunkEvent()
				}
				else {
					document.getElementById('buttonAccept').value = 'pants'
					document.getElementById('buttonDeny').value = 'pants'
					UnzippedEvent()
				}
				document.getElementById('modalChoice').style.display = "block"
				DeleteQuest(this)
				break
			}
		}
	})

	/* accept or deny request */
	document.getElementById('buttonAccept').onclick = function() {
		CheckChoice(true, this.value)
	}
	document.getElementById('buttonDeny').onclick = function() {
		CheckChoice(false, this.value)
	}

	/* Check if cocktail is correct */
	document.getElementById('buttonCocktail').onclick = function() {
		CheckCocktail(this.value)
	}

})

function CheckCocktail(cocktailName) {
	var chosenIng = []
	var correctIng

	switch(cocktailName) {
		case 'mojito':
		correctIng = CocktailMojito()
		break
		case 'punch':
		correctIng = CocktailPunch()
		break
	}
	
	Array.prototype.forEach.call(document.getElementsByClassName("ingredient"), function(element, index) {
		if(element.checked)
			chosenIng.push(element['value'])
		element.checked = false
	})

	if(JSON.stringify(chosenIng) === JSON.stringify(correctIng)) {
		AddPoint()
	} else {
		RemovePoint()
	}
	
	document.getElementById('modalCocktail').style.display = "none"
}

function CocktailMojito() {
	return ["mint","sugar","rhum"]
}
function CocktailPunch() {
	return ["orange","sugar","rhum"]
}

function CheckChoice(userChoice, type) {
	var valid = false
	switch(type) {
		case 'drunk':
		if(!userChoice) {
			valid = true
		}
		break
		case 'pants':
		if(userChoice) {
			valid = true
		}
		break
	}
	if(valid) {
		AddPoint()
	}
	else {
		RemovePoint()
	}
	document.getElementById('modalChoice').style.display = "none"
}

function TriggerEvent() {
	if(Math.random() > 0.33) {
		AddQuest('cocktail')
	}
	else {
		AddQuest('choice')
	}
}

function AddQuest(questType) {
	questAffected = false
	Array.prototype.forEach.call(document.getElementsByClassName("infosQuest"), function(element, index) {
		if(element.children[0].innerHTML == "None" && !questAffected) {
			switch(questType) {
				case 'cocktail':
				element.children[0].innerHTML = 'Make a cocktail'
				element.children[1].innerHTML = questType
				break
				case 'choice':
				element.children[0].innerHTML = 'Take care of a client'
				element.children[1].innerHTML = questType
				break
			}
			questAffected = true
		}
	})
	if(!questAffected) {
		RemovePoint()
	}
}

function DeleteQuest(questId) {
	document.getElementById(questId.id).children[0].innerHTML = "None"
	document.getElementById(questId.id).children[1].innerHTML = ""
}

/* call randomly function (wait between 5s and 10s) */
(function Loop() {
    var rand = Math.round(Math.random() * (10000 - 5000)) + 5000
    setTimeout(function() {
    	TriggerEvent()
    	MovePeople()
    	Loop()
    }, rand)
}())

function AddPoint() {
	var nbPoints = document.getElementById('numberPoints').innerHTML
	document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) + 1
}

function RemovePoint() {
	var nbPoints = document.getElementById('numberPoints').innerHTML
	document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) - 1
}

function DrunkEvent() {
	document.getElementById('bodyChoiceContent').innerHTML = "This guy is wasted and ask for another drink. What do you do ?"
}
function UnzippedEvent() {
	document.getElementById('bodyChoiceContent').innerHTML = "This guy came back from the bathroom with his pants unzipped. Do you tell him ?"
}

function MovePeople() {
	Array.prototype.forEach.call(document.getElementsByClassName("person"), function(element, index) {
		document.getElementsByClassName("person")[index].style.top = Math.random() * 250 + 50 + 'px'
		document.getElementsByClassName("person")[index].style.left = Math.random() * 400 + 'px'
	})
}

function PlayRandomSong() {
	nb = Math.floor(Math.random()*4)
	document.getElementsByClassName("player")[nb].play()
}