//document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('DOMContentLoaded', function(event) {

	document.getElementById('gameContainer').onclick = function() {
		xpos = window.event.clientX;
		ypos = window.event.clientY;
		document.getElementById('waiter').style.top = ypos - 30 + 'px';
		document.getElementById('waiter').style.left = xpos - 20 + 'px';
	};

	document.getElementById("myBtn").onclick = function() {
		document.getElementById('modalChoice').style.display = "block";
	}
	
	Array.from(document.getElementsByClassName("close")).forEach(function(element) {
      	element.addEventListener('click', function() {
			document.getElementById('modalChoice').style.display = "none";
		});
    });

});