//
// STRING MANIPULATION --------------------------------------------------
// Non-destructive utilities for string manipulation
//
// MORE UTILITIES
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
// https://github.com/STAR-ZERO/jquery-ellipsis/blob/master/src/jquery.ellipsis.js
// http://stackoverflow.com/questions/9860814/stringutils-in-javascript
// https://github.com/epeli/underscore.string
//
// USAGE
// Strings.ellipsis( @input As String, @limit As Number );
//

define(function() {

	'use strict';


	//
	// CORE ------------------------------------------------------------
	//

	var Strings = {

		//
		// Simple (multi-line) ellipsis-method
		// Note: Use as fallback for older browsers
		// Chrome, Safari & recent Opera support 
		// CSS multiline-clamping
		//

		ellipsis: function(input, limit) {

			var string = input;
			if(string.length > limit) {

				string = string.substring(0, limit - 3);
				string += '...';
			
			}

			return string;

		}


	};


	//
	// PUBLIC API ------------------------------------------------------
	//

	return Strings;


});