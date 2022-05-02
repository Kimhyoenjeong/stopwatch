/*
This is a JavaScript file. JavaScript (JS for short) is the programming
languagethat enables web pages to respond to user interaction beyond
the basic level provided by HTML links and forms.
 
You can learn more about JavaScript here:
https://developer.mozilla.org/learn/javascript
 
This is a JavaScript comment. Anything inside these comment symbols will be ignored
by the browser, which is handy for adding explanations to your code!
*/
 
"use strict";
// Set up the app once the DOM is loaded
window.addEventListener("DOMContentLoaded", setupStopwatch);
window.addEventListener("DOMContentLoaded", setupInstallButton);
 
// Sets up the stopwatch functionality for the app
function setupStopwatch() {
   
  var clock = document.getElementById("clock");
  var startStop = document.getElementById("start-stop");
  var reset = document.getElementById("reset");

  var labbutton = document.getElementById("lab");
  var labtimejs = document.getElementById("labtime");
  var counter = document.getElementById("counter");
  var startTime = 0;
  var stopTime = 0;
  var intervalID = 0;
   var labtimetemp =0;
  var a = new Array();
  var i = 0;
 
  labbutton.addEventListener("click", function(){
	  labtimetemp = formatTime(Date.now() - startTime);
	  a.push(labtimetemp);
	  labtimejs.textContent = labtimejs.textContent + a[i] + "\r\n" + (i+2)+')     ' ;
	  i++;
  });
   


   


  counter.addEventListener("click", function(){
  var inputminiute = prompt('ºÐ');
  var inputsecond = prompt('ÃÊ');
  alert(inputminiute);
  alert(inputsecond);
     inputminiute = parseInt(inputminiute);
     inputsecond = parseInt(inputsecond);
  clock.textContent =inputminiute + ":" +inputsecond; 
  intervalID= setInterval(function(){
		 if(inputsecond === 0 && inputminiute ===0){
			 clearInterval(intervalID);}
		 else if(inputminiute !== 0 && inputsecond ===0){
			 inputminiute --;
		 	 inputsecond = 59;}
		 else
			 inputsecond--;
		 
		 clock.textContent = inputminiute + ':' + inputsecond;
									   },1000);
     
  });
 
function sleep(num){	//[1/1000ì´?]
 
			 var now = new Date();
 
			   var stop = now.getTime() + num;
 
			   while(true){
 
				 now = new Date();
 
				 if(now.getTime() > stop)return;
 
			   }
 
}

  startStop.addEventListener("click", function() {
    if (intervalID) {
      // Keep track of the stop time in case we restart the clock
      stopTime = Date.now();
 
      // Clear the interval that updates the clock
      clearInterval(intervalID);
      intervalID = 0;
 
      // Update the button text
      startStop.textContent = "Start";
      return;
    }
 
    // If we're restarting the clock, account for the paused time
    if (startTime > 0) {
      var pauseTime = Date.now() - stopTime;
      startTime = startTime + pauseTime;
    } else {
      startTime = Date.now();
    }
 
    // Set an interval to update the clock 
    intervalID = setInterval(function() {
      var elapsedTime = Date.now() - startTime;
      clock.textContent = formatTime(elapsedTime);
    }, 100);
 
    // Update the button text
    startStop.textContent = "Stop";    
  });
   
 
  reset.addEventListener("click", function() {
    // If the timer is currently running, just reset the start time to now
    if(intervalID)
       clearInterval(intervalID);
    startTime = intervalID ? Date.now() : 0;
    stopTime = 0;
    clock.textContent = "00:00";

    labtimejs.textContent = "1)     ";

  });
 
  // Helper function that takes a UTC timestamp and returns a formatted time string
  function formatTime(timestamp) {
    var d = new Date(timestamp);
 
    var minutes = d.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
 
    var seconds = d.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
 
    return minutes + ":" + seconds;
  }
}
 
// Sets up a button to install the app if it isn't already installed
function setupInstallButton() {
  var request = window.navigator.mozApps.getSelf();
  request.onsuccess = function getSelfSuccess() {
    // Don't show the install button if the app is already installed
    if (request.result)
      return;
 
    var installButton = document.getElementById("install");
    installButton.classList.remove("hidden");
    installButton.addEventListener("click", install);
  };
  request.onerror = function getSelfError() {
    console.warn("error getting self: " + request.error.name);
  };
 
  function install() {
    var location = window.location.href;
    var manifestURL = location.substring(0, location.lastIndexOf("/")) + "/manifest.webapp";
 
    var request = navigator.mozApps.install(manifestURL);
    request.onsuccess = function installSuccess() {
      document.getElementById("install").classList.add("hidden");
    };
    request.onerror = function installError() {
      console.warn("error installing app: " + request.error.name);
    };
  }
}
