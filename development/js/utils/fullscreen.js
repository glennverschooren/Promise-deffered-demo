//
// FULLSCREEN --------------------------------------------------------------------
// Launch applications fullscreen with the HTML5 Fullscreen API
//
// BACKGROUND
// https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen
// http://css.dzone.com/articles/pragmatic-introduction-html5
// http://msdn.microsoft.com/en-us/library/ie/dn265028(v=vs.85).aspx
// http://davidwalsh.name/fullscreen
//
// IE11 supports the fullscreen API, however it's not compliant with emerging
// standards & IE11 specs aren't working well, so for now we add a .fullscreen
// class to the body to apply fullscreen specific CSS
// See sass/mixins/__fullscreen.scss
//
// USAGE
// Fullscreen.launch( @element As DOM );
// Fullscreen.exit();
// Fullscreen.isActive;
//

define(function() {

	'use strict';


	//
	// CORE ----------------------------------------------------------------------
	//

	var Fullscreen = {

		//
		// Launch fullscreen-mode
		// for any given element
		//

		launch: function(el) {

			if(!this.isSupported) return false;

			if(el.webkitRequestFullScreen) el.webkitRequestFullScreen();
			else if(el.mozRequestFullScreen) el.mozRequestFullScreen();
			else if(el.msRequestFullscreen) el.msRequestFullscreen();
			else if(el.requestFullScreen) el.requestFullScreen();

			// Add a .fullscreen class to the document
			// to target fullscreen specific styles/CSS
			document.documentElement.className += ' fullscreen';

		},

		//
		// Exit fullscreen-mode
		//

		exit: function() {

			if(!this.isSupported) return false;

			if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();
			else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
			else if(document.msFullscreenEnabled) document.msExitFullscreen();
			else if(document.cancelFullScreen) document.cancelFullScreen();

			// Remove .fullscreen class from document on exit
			var classNames = document.documentElement.className;
			document.documentElement.className = classNames.replace(' fullscreen', '');

		},

		//
		// Listen to change events
		// Dispatched when on launch/exit
		//

		onChange: function(callback) {

			if(!this.isSupported) return false;

			if(document.webkitFullscreenEnabled) document.addEventListener('webkitfullscreenchange', callback, false);
			else if(document.mozFullScreenEnabled) document.addEventListener('mozfullscreenchange', callback, false);
			else if(document.msFullscreenEnabled) document.addEventListener('MSFullscreenChange', callback, false);
			else if(document.fullscreenEnabled) document.addEventListener('fullscreenchange', callback, false);

		},

		//
		// Check if we're in fullscreen
		//

		isActive: function() {

			if(!this.isSupported) return false;

			if(document.webkitFullscreenEnabled) return document.webkitIsFullScreen;
			else if(document.mozFullScreenEnabled) return document.mozFullScreen;
			else if(document.msFullscreenEnabled) return document.msFullscreenElement;
			else if(document.fullscreenEnabled) return document.fullscreen;
			else return false;

		}

	};


	//
	// INITIALIZE ----------------------------------------------------------------
	// Detect Fullscreen API support & setup initial state
	// Note: Opera (12.16) on Mac is behaving rather strange,
	// so we opt for a different support-detection
	//

	// Fullscreen.isSupported = document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.fullscreenEnabled || false;
	Fullscreen.isSupported = document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msFullscreenEnabled || document.cancelFullScreen || false;


	//
	// PUBLIC API ----------------------------------------------------------------
	//

	return Fullscreen;


});