// Samples
var kick  	= "samples/kick.mp3";
var snare 	= "samples/snare.mp3";
var ride 	= "samples/ride.mp3";
var splash 	= "samples/splash.mp3";

// Web Audio API
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var source = null;

// Add Keyboard listener
window.onload = function() {
	document.addEventListener("keydown", checkKey, false);
}

// Playback
function playSound(buffer) {
  source = context.createBufferSource(); 	 
  source.buffer = buffer;                   
  source.connect(context.destination);       
  source.start(0);                           
}

function fetchSound(sound) {
    var request = new XMLHttpRequest();
    var url;
    
    switch (sound) {
	    case 1: url = kick; break;
	    case 2: url = snare; break;
	    case 3: url = ride; break;
	    case 4: url = splash; break;
	}    
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {	
    	playSound(context.createBuffer(request.response, false));
    }
    request.send();
}

function checkKey(event) {
    event = event || window.event;
	
	switch (event.keyCode) {
		// Left arrow
		case 37: fetchSound(1); break;
		// Up arrow
		case 38: fetchSound(2); break;
		// Right arrow
		case 39: fetchSound(3); break;
		// Down arrow
		case 40: fetchSound(4); break;
	}
	updateText();
}
