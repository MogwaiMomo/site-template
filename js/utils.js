//cross-browser shim for requestAnimationFrame

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame || 
									window.mozRequestAnimationFrame ||
									window.oRequestAnimationFrame ||
									window.msRequestAnimationFrame ||
									function(callback) {
										return	window.setTimeout(callback, 1000/60);
										}
									);
								}

// create empty object to which I can add importable properties
var utils = {}

// Property 1: sets mouse coordinates relative to canvas (cross-browser implementation)
utils.captureMouse = function(element) {
	var mouse = {x: 0, y: 0};

	element.addEventListener('mousemove', function(){
		var x, y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		}	
		else {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		}
		
		x -= element.offsetLeft;
		y -= element.offsetTop;

		mouse.x = x;
		mouse.y = y;

	}, false);
	return mouse;
};

