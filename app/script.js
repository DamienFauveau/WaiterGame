//document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('DOMContentLoaded', function(event) {

	document.getElementById('gameContainer').onclick = function() {
		xpos = window.event.clientX;
		ypos = window.event.clientY;
		document.getElementById('waiter').style.top = ypos - 30 + 'px';
		document.getElementById('waiter').style.left = xpos - 25 + 'px';
	};

	document.getElementById("myBtn").onclick = function() {
		document.getElementById('modalChoice').style.display = "block";
	}
	document.getElementById("myBtn2").onclick = function() {
		document.getElementById('modalCocktail').style.display = "block";
	}

	document.getElementById('buttonAccept').onclick = function() {
		document.getElementById('modalChoice').style.display = "none";
	};
	document.getElementById('buttonDeny').onclick = function() {
		document.getElementById('modalChoice').style.display = "none";
	};

    document.getElementById('buttonCocktail').onclick = function() {
    	var chosenIng = [];
    	var correctIng = cocktailMojito();
		
		Array.prototype.forEach.call(document.getElementsByClassName("ingredient"), function(element, index) {
			if(element.checked)
		    	chosenIng.push(element['value']);
		});
		
		var nbPoints = document.getElementById('numberPoints').innerHTML;
		if(JSON.stringify(chosenIng) === JSON.stringify(correctIng)) {
			document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) + 1;
		} else {
			document.getElementById('numberPoints').innerHTML = parseInt(nbPoints, 10) - 1;
		}
		
		document.getElementById('modalCocktail').style.display = "none";
	};

});

function cocktailMojito() {
	return ["mint","sugar","rhum"];
}