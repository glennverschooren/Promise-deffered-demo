define([

	'jquery',
    'impress'

], function($, Impress ) {

	'use strict';

    impress().init();
    var api = impress();



    $('#js-previous').click(function(e){
        e.preventDefault();
        api.prev();

    });

     $('#js-next').click(function(e){
        e.preventDefault();
        api.next();

    });






});






