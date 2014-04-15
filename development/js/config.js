require.config({

	//
	// MAIN ENTRY POINT OF THE APPLICATION -----------------------------------
	//

	deps: ['init'],

	//
	// PATH MAPPINGS FOR MODULES ---------------------------------------------
	// Don't forget to exclude 3rd party libs from the final build
	// when using CDN (see Gruntfile.js > requirejs.compile.options)
	// Always monitor download speed vs http-requests before
	// deciding wether or not to use CDN (with local fallback!)
	//
	// Note: Require-text needs to be available locally
	// http://stackoverflow.com/questions/11266808/require-js-backbone-optimization
	//

	paths: {
		'jquery': ['//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min', 'libs/jquery-1.10.2.min']
	}

});