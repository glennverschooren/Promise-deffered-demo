//
// LOCAL STORAGE -----------------------------------------------------------------
// LocalStorage is synchronous & render-blocking, so don't get/set to often
// To avoid render-blocking, get/set when you know the thread is iddle
// LocalStorage is not supported on IE7
//
// BACKGROUND
// Use it for scripts & CSS with http://addyosmani.github.io/basket.js
// http://localstorage-use-not-abuse.appspot.com/
// http://diveintohtml5.info/storage.html
//
// USAGE
// LocalStorage.get( @key As String );
// LocalStorage.set( @key As String, @value As String || Number || Object );
// LocalStorage.delete( @key As String );
// LocalStorage.flush();
// LocalStorage.remove( @previous-version-key As String );
// LocalStorage.image( @key As String, @source As String, @callback-with-response As Function );
//

define(function() {

	'use strict';


	//
	// CORE ----------------------------------------------------------------------
	//

	var LocalStorage = {

		//
		// Get stored data by key
		//

		get: function(key) {

			if(!this.isSupported) return false;
			return JSON.parse(localStorage.getItem(key));

		},

		//
		// Store data by key/value
		// Use strings as much as possible
		// JSON.stringify() takes up CPU
		//

		set: function(key, value) {
			
			if(!this.isSupported) return false;
			try {

				typeof value !== 'string' && (value = JSON.stringify(value));
				localStorage.setItem(key, value);

			} catch(e) {

				// Something went wrong (disk may be full)

			}

		},

		//
		// Delete data by key
		//

		remove: function(key) {

			if(!this.isSupported) return false;
			localStorage.removeItem(key);

		},

		//
		// Delete all data
		//

		flush: function() {

			if(!this.isSupported) return false;
			localStorage.clear();

		},

		//
		// Store & retrieve images from localStorage (not supported on IE7 & IE8)
		// Use wisely, as base64 encode images tend to add 33% to an image filesize
		// Note: no cachebusting included, you need to delete previous versions manually
		// Note: only works with images from the same domain
		//

		image: function(key, source, callback) {

			//
			// To store & retrieve images we need localStorage & Canvas
			// If not available, return the original image
			//

			if(!this.isSupported || !ctx) {

				callback.apply(this, [source]);
				return;

			}

			//
			// Check if the image was already stored
			// If so return the base64 encoded image
			//

			var stored = this.get(key);
			if(stored) {

				callback.apply(this, [stored]);
				return;

			}

			//
			// If the image is not previously stored, load the image & return it
			// then draw to canvas, convert to base64 & store the encoded image
			//

			var img = new Image();
			img.addEventListener('load', (function() {

				//
				// Prepare & draw to canvas
				//

				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);

				//
				// .toDataURL() doesn't work on images coming
				// from a different domain (CORS restriction)
				// so we need to check if the canvas is 'tainted'
				// http://abdiassoftware.com/blog/2013/11/tip-check-if-canvas-is-tainted/
				//

				try { ctx.getImageData(0, 0, 1, 1); }
				catch(e) {

					callback.apply(this, [source]);
					return;

				}

				//
				// Get correct mime-type &
				// convert the image
				//

				var type = source.match(/(jpg|jpeg|png|gif)/);
				type = type[0] === 'jpg' ? 'jpeg' : type[0];
				var base64 = canvas.toDataURL('image/'+ type);

				//
				// Store the base64 encode image
				// JSON.parse() can't handle base64
				// so we need to wrap it in double quotes
				//

				this.set(key, '"'+ base64 +'"');
				callback.apply(this, [base64]);

			}).bind(this), false);
			img.src = source;

		}

	};


	//
	// INITIALIZE ----------------------------------------------------------------
	// Detect localStorage support (taken from Modernizr)
	// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
	// Setup a canvas to convert images to base64 encoded images
	// using canvas.toDataUrl() after drawing the image to a canvas
	//

	try {

		localStorage.setItem('{{__localStorageTest__}}', '');
		localStorage.removeItem('{{__localStorageTest__}}');
		LocalStorage.isSupported = JSON ? true : false;		// IE7 has no JSON-support

	} catch(e) {

		LocalStorage.isSupported = false;

	}

	var canvas = document.createElement('canvas'),
	    ctx = canvas.getContext ? canvas.getContext('2d') : null;


	//
	// PUBLIC API ----------------------------------------------------------------
	//

	return LocalStorage;


});