//
// JQUERY NOCONFLICT ---------------------------------------------------
// Tell jQuery to use local instances in modules rather then
// using the global '$', this way we can use jQuery.noConflict()
// and make sure 3rd party plugins don't break our code
// http://requirejs.org/docs/jquery.html#noconflictmap
//
// Important: all modules will need to reference jQuery
// We're using '$' as a local instance now
//

define(['jquery'], function($) {

	return $.noConflict(true);

});