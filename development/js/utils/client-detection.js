//
// CLIENT DETECTION ----------------------------------------------------
// Browser detection (using UA sniffing) & feature detection
// Since UA sniffing is far from accurate, try to use this
// on a need-to-detect-base (only uncomment what you need)
//
// BACKGROUND
// https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent/
// http://www.quirksmode.org/js/detect.html
// http://modernizr.com/
//
// USAGE
// Client.checkCSSSupport( @property As String );
// Client.searchUserAgent( @string As String );
// Client.checkRetinaSupport();
// Client.property;
//

define(function() {

	'use strict';


	//
	// CORE ------------------------------------------------------------
	//

	var Client = {
		/*
		//
		// Check support for CSS properties
		// See all supported CSS in your browser with:
		// console.log(document.body.style)
		//

		checkCSSSupport: function(prop) {

			var vendors = ['', 'ms', 'O', 'Moz', 'webkit'], i = vendors.length;
			var doc = document.body.style;
			while(i--) {
				var css = vendors[i] + prop;
				if(css in doc) return css;
			}

			return false;

		},

		//
		// UA Sniffing
		//

		searchUserAgent: function(string) {

			return navigator.userAgent.toLowerCase().indexOf(string) > -1;

		},

		//
		// Detect Retina support
		//

		checkRetinaSupport: function() {

			var mediaQuery = '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)';
			if(window.devicePixelRatio && window.devicePixelRatio > 1) return true;
			if(window.matchMedia && window.matchMedia(mediaQuery).matches) return true;

			return false;

		}
		*/
	};


	//
	// DEFAULTS --------------------------------------------------------
	//

	//Client.isIE          = !('__proto__' in {});
	//Client.isIE10        = Client.searchUserAgent('msie 10');
	//Client.isIE11        = Client.isIE ? false : Client.searchUserAgent('trident/');
	//Client.isChrome      = Client.searchUserAgent('chrome');
	//Client.isSafari      = Client.searchUserAgent('safari') && !client.isChrome;
	//Client.isFireFox     = Client.searchUserAgent('firefox');
	//Client.isOpera       = Client.searchUserAgent('opera');

	//Client.isIEMobile    = Client.searchUserAgent('windows phone');
	//Client.isAndroid     = Client.searchUserAgent('android');
	//Client.isIpad        = Client.searchUserAgent('ipad');
	//Client.isIphone      = Client.searchUserAgent('iphone');

	//
	// Note: Windows 8 uses navigator.msPointerEnabled to detect pointer events
	// Still need to determine the best approach to handle this since Window 8 
	// can have touch-enabled screens with mouse input
	//

	//Client.isTouch       = 'ontouchstart' in document || false;
	//Client.isRetina      = Client.checkRetinaSupport();

	//
	// We detect smartphones with the assumption the device
	// supports touch-events and screenWidth < 768 (based on iPad)
	// Depending on your project you might want to use 650px
	// as a breakpoint, which will detect phablets as tablets 
	//

	//Client.isSmartPhone  = Client.isTouch && window.innerWidth < 768;
	//Client.isTablet      = Client.isTouch && !Client.isPhone;
	//Client.isDesktop     = !Client.isTablet && !Client.isPhone;
	//Client.isStandalone  = navigator.standalone || false;

	//Client.cssTransition = Client.checkCSSSupport('Transition');
	//Client.cssTransform  = Client.checkCSSSupport('Transform');
	//Client.cssBGSize     = Client.checkCSSSupport('backgroundSize');
	//Client.cssLineClamp  = Client.checkCSSSupport('LineClamp');


	//
	// INITIALIZE ------------------------------------------------------
	// If we're not on a touch-device, add 'no-touch' class to the HTML-tag
	// JS is enabled, so we can remove the noscript-tag
	// http://remysharp.com/2013/04/19/i-know-jquery-now-what/
	//

	//Client.isTouch || (document.documentElement.className = 'no-touch');
	
	//var noscript = document.querySelector('noscript'); // Doesn't work in IE7
	var noscript = document.getElementsByTagName('noscript')[0];
	noscript.parentNode.removeChild(noscript);


	//
	// PUBLIC API ------------------------------------------------------
	//

	return Client;


});