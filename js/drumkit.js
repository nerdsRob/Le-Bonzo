// Samples freesound.org
var kick  	= "samples/kick.mp3";
var snare 	= "samples/snare.mp3";
var ride 	= "samples/hihat.wav";
var splash 	= "samples/splash.mp3";

// Web Audio API
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var source = null;
var oscillator = context.createOscillator();
var amp = context.createGain();

// Add Keyboard listener
window.onload = function() {
	document.addEventListener("keydown", checkKey, false);
	document.addEventListener("keyup", stopNote, false);
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

function playNote(frequency) {
	oscillator.frequency.value = frequency;
    amp.gain.value = 0;
    
    oscillator.connect(amp);
    amp.connect(context.destination);
    oscillator.start(0);
    
    var now = context.currentTime;
    oscillator.frequency.setValueAtTime(frequency, now);
    
    amp.gain.cancelScheduledValues(now);
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.8, context.currentTime + 0.1);
}

function stopNote() {
    var now = context.currentTime;
	amp.gain.cancelScheduledValues(now);
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.0, context.currentTime + 1.0);
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
		// W
		case 87: playNote(262); break; // C4
		// A
		case 65: playNote(294); break; // D4
		// S
		case 83: playNote(330); break; // E4
		// D
		case 68: playNote(349); break; // F4
		// F
		case 70: playNote(392); break; // G4
		// G
		case 71: playNote(440); break; // A4
	}
}
