// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

//reference codepen example: http://codepen.io/matt-west/pen/bGdEC?editors=001

// Crazy vendor compatibility stuff starts //
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Crazy vendor compatibility stuff ends //


(function(){
	
	//Start drawing the canvas
	var canvas = document.getElementById('canvas');		
	var ctx = canvas.getContext('2d');
			
    //Define the colour you want to use to fill the screen
    ctx.fillStyle="#fefefe"; //white

    var posX = 0;
	var boxHeight = 0;
	var pixelsPerFrame = 1;

	// Draw initial box:

	ctx.fillRect(0, 0, canvas.width, boxHeight);

	// Animate (fill the canvas gradually):
	function animate() {
		requestAnimationFrame(animate);
		if (boxHeight <= canvas.height) {
			ctx.clearRect(0, 0, boxHeight, canvas.width);
			ctx.fillRect(0, 0, canvas.width, boxHeight);
			boxHeight += pixelsPerFrame;
		} 
	  }


	// var page = document.getElementById('page');

	//Fade out the intro
	window.addEventListener('click', function(ev){
		ev.preventDefault();
		document.getElementById('intro').className += " fade";
	}, false);

	//Start the animation
	window.addEventListener('click', function(ev){
		ev.preventDefault();
		requestAnimationFrame(animate);
	}, false);
		
	}());
