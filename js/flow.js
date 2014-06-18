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
		requestID = requestAnimationFrame(animate);
		if (boxHeight <= canvas.height) {
			ctx.clearRect(0, 0, boxHeight, canvas.width);
			ctx.fillRect(0, 0, canvas.width, boxHeight);
			boxHeight += pixelsPerFrame;
		} 
		else {
			cancelAnimationFrame(requestID);
			ctx.clearRect((canvas.width)/4, (canvas.height)/4, (canvas.width)/2, (canvas.height)/2);
			// ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
		
	  }

	  //Start the animation
	window.addEventListener('click', function(ev){
		ev.preventDefault();
		requestAnimationFrame(animate);
	}, false);

	

}());

// Animation stuff ends here // 


// Sound stuff starts here: //

var context;
var url ="data/07 In The Lost and Found (Honky Bach).mp3";

//executes on page click:
function init() {
	try {
		// fix up for prefixing
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
		loadSound(context, url);
		}
	// catch non-supported browsers
	catch(error) {
		alert(error)
	}
};

function loadSound(context, url) {

	// Creating the XHTTP object
	var request = new XMLHttpRequest();

	// Open this URL 
	request.open('GET', url, true);

	// This is what format is going to be 
	request.responseType = 'arraybuffer';

	// .onload is an event which fires when the request data has fully loaded
	request.onload = function() {
		// create the sound source:
		var soundSource = context.createBufferSource();
		var analyser = context.createAnalyser();

		// import callback function that provides decoded PCM audio data 
		context.decodeAudioData(request.response, 
			function(buffer) {
				//transfer decoded audio data ("buffer") to sound source object
				soundSource.buffer = buffer;
				soundSource.connect(analyser);
				var frequencyData = new Uint8Array(analyser.frequencyBinCount);

				function renderFrame() {
					requestAnimationFrame(renderFrame);
					analyser.getByteFrequencyData(frequencyData);
					console.log(frequencyData)
	}
				//connect to speakers
				soundSource.connect(context.destination);
				soundSource.start(0);
				renderFrame(); 
			},
			//catch errors 
			function(e) {
				console.log(e)
			}
		);
	}

	request.send();
};





// Trigger events: 


	//Fade out the intro
	window.addEventListener('click', function(ev){
		ev.preventDefault();
		document.getElementById('intro').className += " fade";
	}, false);

	// Start the music

	window.addEventListener("click", function(ev){
		ev.preventDefault();
		init();
	}, false); 
		
	
