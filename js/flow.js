// RequestAnimationFrame shim starts //
 
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

// RequestAnimationFrame shim ends //

//Start drawing the canvas
var canvas = document.getElementById('canvas');		
var ctx = canvas.getContext('2d');

function init(){
	
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
			document.getElementById('canvas').className += " white";
			document.getElementById('instruct').className = "appear col span_2_of_3 item";
			sound();

		}
		
	  }
	 requestAnimationFrame(animate);
};

// Animation stuff ends here // 



// Sound stuff starts here: //

var context;
var url ="data/07 In The Lost and Found (Honky Bach).mp3";

//starts music on page click:
function sound() {
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
					ctx.clearRect(0,0, canvas.width, canvas.height);	
					bars = 100;
					for (var i = 0; i < bars; i++) {
						bar_x = i * 3;
						bar_width = 2;
						bar_height = -(frequencyData[i]/10);
						ctx.fillStyle = '#D10700'; // red
						ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
						ctx.fillStyle='#EC4863'; // orange
						ctx.fillRect(bar_x,(canvas.height+bar_height),bar_width, bar_height);
						ctx.fillStyle='#FFDA66'; //banana yellow
						ctx.fillRect(bar_x,(canvas.height+bar_height*2),bar_width, bar_height);
						ctx.fillStyle='#1FCBC7'; //light green
						ctx.fillRect(bar_x,(canvas.height+bar_height*3),bar_width, bar_height);
						ctx.fillStyle='#2F89C2'; //blue
						ctx.fillRect(bar_x,(canvas.height+bar_height*4),bar_width, bar_height);				}
				}
				//connect to speakers
				soundSource.connect(context.destination);
				soundSource.start(0);
				setTimeout(function(){
					document.getElementById('canvas').className += " fade";
					document.getElementById('instruct').className += " fade";
					rollcredits();
					
				},274000);

				renderFrame();
				canvas.addEventListener('click', function(){
					//stop song
					soundSource.disconnect(0);
					//fade canvas and instructions
					document.getElementById('canvas').className += " fade";
					document.getElementById('instruct').className += " fade";
					//roll credits
					rollcredits();
					}, false);
					
					
 
			},
			//catch errors 
			function(e) {
				console.log(e)
			}
		);
	}

	request.send();
};



function trigger(ev){
	ev.preventDefault();
	document.getElementById('intro').className += " fade";
	init();

	setTimeout(function(){
		window.removeEventListener('click', trigger, false);
	}, 50);
}

function rollcredits() {
	setTimeout(function(){
		console.log("Roll Credits, bitch!")
		var container = document.getElementById("container");
		var intro = document.getElementById("intro");
		var canvas = document.getElementById("canvas");
		var instruct = document.getElementById("instruct");
		
		//remove existing elements
		container.removeChild(intro);
		container.removeChild(canvas);
		container.removeChild(instruct);

		//add in an element:
		document.getElementById('credits').className = "appear col span_2_of_3 item";
	}, 1500);
	
}


//Application starts on user click:
window.addEventListener('click', trigger, false);




		
	
