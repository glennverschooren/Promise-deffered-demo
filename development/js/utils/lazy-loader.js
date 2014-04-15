//
// LAZY LOADER -------------------------------------------------------------------
// Lazy-loads assets & dispatches a callback when done
//
// USAGE
// LazyLoad.script( @url As String, @callback As Function );
// LazyLoad.image( @url As String, @callback As Function );
//

define(function() {

	'use strict';


	//
	// CORE ----------------------------------------------------------------------
	//

	var LazyLoader = {

		//
		// Lazy-load scripts
		//

		script: function(url, callback) {

			var script = document.createElement('script'),
			    ready = false;

			script.type = 'text/javascript';
			script.async = true;
			script.src = url;

			script.onload = script.onreadystatechange = function() {
				if(!ready && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {

					ready = true;
					callback();

				}
			}

			document.body.appendChild(script);

		},

		//
		// Lazy-load images
		//

		image: function(url, callback) {

			var img = new Image();
			img.onload = function() { callback(url, img.width, img.height); };
			img.src = url;

		}

	};


	//
	// PUBLIC API ----------------------------------------------------------------
	//

	return LazyLoader;


});