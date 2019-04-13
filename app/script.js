document.addEventListener('DOMContentLoaded', function(event) {

	document.getElementById('gameContainer').onclick = function() {
	  	xpos = window.event.clientX;
    	ypos = window.event.clientY;
    	document.getElementById('waiter').style.top = ypos - 30 + 'px';
    	document.getElementById('waiter').style.left = xpos - 20 + 'px';
	};

});