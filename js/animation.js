window.onload = function() {
	var canvas = document.getElementById('graphic');
	// set cross-browser, canvas-specific positioning for mousemove
	mouse = utils.captureMouse(canvas);
	
	// add event Listener and handler to test:
	canvas.addEventListener('mousedown', function() {
				console.log("x: " + mouse.x + ", y: " + mouse.y);
			}, false);
	};
