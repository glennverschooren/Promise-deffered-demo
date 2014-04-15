//
// COOKIES --------------------------------------------------------------
// Using persistent cookies, which have an expire date set to 1 year from now
// Session cookies have no expire date & are deleted when the browser is closed
//
// USAGE
// Cookies.get( @key As String );
// Cookies.set( @key As String, @value As String || Number );
// Cookies.remove( @key As String );
// Cookies.flush();
//

define(function() {

	'use strict';


	//
	// CORE ------------------------------------------------------------
	//

	var Cookies = {

		//
		// Get cookie by key
		//

		get: function(key) {

			var exp = new RegExp(encodeURI(key) +'=([^;]+)');
			if(exp.test(document.cookie +';')) {
				exp.exec(document.cookie +';');
				return decodeURI(RegExp.$1);
			}

			return false;

		},

		//
		// Set cookie by key with optional
		// param to delete the cookie
		//

		set: function(key, value, remove) {

			var d = new Date();
			remove ? d.setTime(0) : d.setFullYear(d.getFullYear() + 1);
			document.cookie = key +'='+ value + '; expires='+ d.toUTCString() +'; path=/';

		},

		//
		// Delete cookie by key by calling set()
		// with the additional delete param
		//
		
		remove: function(key) {

			this.set(key, '', -1);

		},

		//
		// Delete all cookies (bound to a specific domain)
		// by iterating through the list & delete each
		//

		flush: function() {

			var keys = document.cookie.match(/\w+(?==)/g), i = keys.length;
			while(i--) this.remove(keys[i]);

		}
	};


	//
	// PUBLIC API ------------------------------------------------------
	//

	return Cookies;


});