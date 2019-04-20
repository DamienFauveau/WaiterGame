//document.addEventListener('contextmenu', event => event.preventDefault())

/* EVENTS */
document.addEventListener('DOMContentLoaded', function(event) {

	/* move character to cursor */
	document.getElementById('gameContainer').onclick = function() {
		xpos = window.event.clientX
		ypos = window.event.clientY
		document.getElementById('waiter').style.top = ypos - 30 + 'px'
		document.getElementById('waiter').style.left = xpos - 25 + 'px'
	}

	/* toggle modals */
	Array.prototype.forEach.call(document.getElementsByClassName("infosQuest"), function(element, index) {
		element.onclick = function() {
			switch(this.children[1].innerHTML) {
				case 'cocktail':
					document.getElementById('modalCocktail').style.display = "block"
					DeleteQuest(this)
					break
				case 'choice':
					document.getElementById('modalChoice').style.display = "block"
					DeleteQuest(this)
					break
			}
		}
	})

	/* accept or deny request */
	document.getElementById('buttonAccept').onclick = function() {
		document.getElementById('modalChoice').style.display = "none"
	}
	document.getElementById('buttonDeny').onclick = function() {
		document.getElementById('modalChoice').style.display = "none"
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

	var nbPoints = document.getElementById('numberPoints').innerHTML;
	if(JSON.stringify(chosenIng) === JSON.stringify(correctIng)) {
		document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) + 1
	} else {
		document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) - 1
	}
	
	document.getElementById('modalCocktail').style.display = "none"
}

function CocktailMojito() {
	return ["mint","sugar","rhum"]
}
function CocktailPunch() {
	return ["orange","sugar","rhum"]
}

function TriggerEvent() {
	if(Math.random() > 0.33) {
		if(Math.random() > 0.5) {
			document.getElementById('buttonCocktail').value = 'mojito'
			document.getElementById('modalCocktailName').innerHTML = 'Mojito'
		}
		else {
			document.getElementById('buttonCocktail').value = 'punch'
			document.getElementById('modalCocktailName').innerHTML = 'Punch'
		}
		AddQuest('cocktail')
	}
	else {
		AddQuest('choice')
	}
}

function AddQuest(questType) {
	questAffected = false
	Array.prototype.forEach.call(document.getElementsByClassName("infosQuest"), function(element, index) {
		if(element.children[0].innerHTML == "Empty Quest" && !questAffected) {
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
		var nbPoints = document.getElementById('numberPoints').innerHTML;
		document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) - 1
	}
}

function DeleteQuest(questId) {
	document.getElementById(questId.id).children[0].innerHTML = "Empty Quest"
	document.getElementById(questId.id).children[1].innerHTML = "="
}


/* call randomly function (wait between 5s and 10s) */
(function Loop() {
    var rand = Math.round(Math.random() * (10000 - 5000)) + 5000 // nb between 500 and 3000
    setTimeout(function() {
        TriggerEvent()
        Loop()
    }, rand)
}())