//document.addEventListener('contextmenu', event => event.preventDefault())

document.addEventListener('DOMContentLoaded', function(event) {

	/* move character to cursor */
	document.getElementById('gameContainer').onclick = function() {
		xpos = window.event.clientX
		ypos = window.event.clientY
		document.getElementById('waiter').style.top = ypos - 30 + 'px'
		document.getElementById('waiter').style.left = xpos - 25 + 'px'
	}

	/* test btns toggle modals */
	document.getElementById("myBtn").onclick = function() {
		this.style.display = "none"
		document.getElementById('modalChoice').style.display = "block"
	}
	document.getElementById("myBtn2").onclick = function() {
		this.style.display = "none"
		document.getElementById('modalCocktail').style.display = "block"
	}

	/* accept or deny request */
	document.getElementById('buttonAccept').onclick = function() {
		document.getElementById('modalChoice').style.display = "none"
	}
	document.getElementById('buttonDeny').onclick = function() {
		document.getElementById('modalChoice').style.display = "none"
	}

	/* Check if cocktail is correct */
    document.getElementById('buttonCocktail').onclick = function() {
    	checkCocktail(this.value)
	}

})

function checkCocktail(cocktailName) {
	var chosenIng = []
	var correctIng

	switch(cocktailName) {
		case 'mojito':
			correctIng = cocktailMojito()
			break
		case 'punch':
			correctIng = cocktailPunch()
			break
	}
	
	Array.prototype.forEach.call(document.getElementsByClassName("ingredient"), function(element, index) {
		if(element.checked)
	    	chosenIng.push(element['value'])
	})

	var nbPoints = document.getElementById('numberPoints').innerHTML;
	if(JSON.stringify(chosenIng) === JSON.stringify(correctIng)) {
		document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) + 1
	} else {
		document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) - 1
	}
	
	document.getElementById('modalCocktail').style.display = "none"
}

function cocktailMojito() {
	return ["mint","sugar","rhum"]
}
function cocktailPunch() {
	return ["orange","sugar","rhum"]
}

function triggerEvent() {
	if(Math.random() > 0.5) {
		document.getElementById('buttonCocktail').value = 'mojito'
		document.getElementById('myBtn2').style.display = "inline-block"
	}
	else {
		//document.getElementById('modalChoice').style.display = "block"
		//add quest choice type
	}
}

/* call randomly function (wait between 5s and 10s) */
(function loop() {
    var rand = Math.round(Math.random() * (10000 - 5000)) + 5000 // nb between 500 and 3000
    setTimeout(function() {
        triggerEvent()
        loop()
    }, rand)
}())