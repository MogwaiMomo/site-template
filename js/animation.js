window.onload = function() {
	var canvas = document.getElementById('canvas');
	canvas.addEventListener('mousedown', function(event) {
		console.log("mouse down");
		}, false);

	canvas.addEventListener('mouseup', function(event) {
		console.log("mouse up");
		}, false);
};