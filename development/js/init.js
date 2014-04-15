define([

	'jquery',
    'draggabilly'

], function($, Draggabilly) {

	'use strict';


    //
    // HEADER - TOGGLE USER PROFILE & APPLICATION SETTINGS -------------------
    //

    var $panel = $('#settings'),
        $settings = {},
        $context;

    $('.navigation-settings a').each(function() {
        $(this).on('click', function(e) {

            e.preventDefault();
            //var $toggle = $(e.target), isActive = $toggle.hasClass('active');
            //toggleSettingsPanel(!isActive ? $toggle: null);

        });
    });


    function toggleSettingsPanel($toggle) {

        $context && $context.removeClass('active');
        $context = $toggle;
        $context && $context.addClass('active');
        $context && $panel.addClass('is-open').slideDown('fast');
        $context || $panel.removeClass('is-open').slideUp('fast');

    }


    //
    // HEADER - TOGGLE SEARCH AUTOCOMPLETE LIST ------------------------------
    //

    var $autocomplete = $('#header input');

    $autocomplete.on('input', function() { $(this).next().fadeIn(100); });
    $autocomplete.on('blur', function() { $(this).next().delay(100).fadeOut(100); });
    $autocomplete.next().on('mouseleave', function() {
        $autocomplete.trigger('blur');
    });


    //
    // SETS - TOGGLE SET LIST OVERVIEW ---------------------------------------
    //

    $('.js-sets-dropdown').each(function() {
        $(this).on('click', function(e) {

            e.preventDefault();
            $(this).toggleClass('is-open');
            $('.set-list-overview').slideToggle('fast');
            $('.set-list .empty-item').fadeToggle();

            // Models overview
            $(this).parent().hasClass('underline') && $(this).next().slideToggle('fast');
            $(this).parent().hasClass('underline') && $(this).parent().toggleClass('is-open');

        });
    });

    // Drag & drop (quick demo)
    $('.set-list-overview .draggable').each(function() {
        
        var $item = new Draggabilly(this, { containment: '#sets' });
        $item.once('dragEnd', function(el) {
            $(el.element).css({
                'left': 0,
                'right': 0,
                'top': 0
            }).insertBefore('.set-list.selected .empty-item');
        });

        // Bind remove handler
        $('.icon-delete').on('click', function(e) {

            e.preventDefault();
            $('.set-list-overview .set-list').prepend($(this).parent());

        });

    });



    
            





    //
    // MAIN - TOGGLE VIEWS ---------------------------------------------------
    //

    var $viewToggles = $('.toggles-main li a'),
        $views = $('.view');

    $viewToggles.each(function() {
        $(this).on('click', function(e) {

            e.preventDefault();
            $viewToggles.removeClass('active');
            $views.hide();

            $('.'+ $(this).data('id')).fadeIn('fast');
            $(this).addClass('active');

        });
    });


    $('.section .toggles a').on('click', function(e) {
        e.preventDefault();
    });

    














    //
    // SIDEBAR ---------------------------------------------------------------
    // Sort sidebar-list with slide-toggle
    // Toggle visibility of child-lists
    //

    var $variables = $('.variable-view .sidebar-list > li'),
        $dna = $('.dna-view .sidebar-list > li'),
        $interactions = $('.interaction-view .sidebar-list > li'),
        $preferences = $('.preferences-view .sidebar-list > li');

    $('.button--checkbox-slider input').on('click', function() {
        var $container = $(this).parent().parent(),
            $list = $container.find('.sidebar-list'),
            $children = $container.find('.sidebar-list > li'),
            $sortedChildren = [];

        if(this.checked) {

            // if this has class toggle
            if($(this).hasClass("input-toggle")){
                $(".show-cat-pref").hide();
                $(".hide-cat-pref").fadeIn("fast");
            }

            // Quick-sort based on selected items
            // TODO: fins a way to use .sort()
            $children.each(function() {
                $(this).find('input').attr('checked') && $(this).find('input').hasClass('full') && $sortedChildren.push($(this));
            });

            $children.each(function() {
                $(this).find('input').attr('checked') && $(this).find('input').hasClass('half') && $sortedChildren.push($(this));
            });

            $children.each(function() {
                $(this).find('input').attr('checked') || $sortedChildren.push($(this));
            });

        } else { 

            if($(this).hasClass("input-toggle")){
                $(".hide-cat-pref").hide();
                $(".show-cat-pref").fadeIn("fast");
            }

            $container.hasClass('variable-view') && ($sortedChildren = $variables);
            $container.hasClass('dna-view') && ($sortedChildren = $dna);
            $container.hasClass('interaction-view') && ($sortedChildren = $interactions);
            $container.hasClass('preferences-view') && ($sortedChildren = $preferences);

        }

        // Update DOM
        $list.html($sortedChildren);
        bindSidebarEvents($container);

    });


    function bindSidebarEvents($view) {

        $view.find('.js-sidebar-dropdown').each(function() {
            $(this).on('click', function(e) {

                e.preventDefault();
                $(this).toggleClass('is-open');
                $(this).next('ul').fadeToggle('fast');

            });
        });

        // Toggle favorites
        $view.find('.js-favorite').each(function() {
            $(this).on('click', function(e) {

                e.preventDefault();
                $(this).toggleClass('active');

            });
        });

    } 

    bindSidebarEvents($('.variable-view'));
    bindSidebarEvents($('.dna-view'));
    bindSidebarEvents($('.interaction-view'));
    bindSidebarEvents($('.preferences-view'));








    //
    // DNA - ROSAS VIEW ------------------------------------------------------
    //

    var $slices = $('.pie'), 
        $rolloverBackground = $('.rosas .background'),
        $activeBackground = $('.rosas .background-active'),
        $activePieView;

    $slices.on('mouseenter', function() {
        var slice = $(this).parent().attr('class').split('-')[1];
        $rolloverBackground.css('background', 'url(img/dna-'+ slice +'.png)');
    });

    $slices.on('mouseout', function() {
        var slice = $(this).parent().attr('class').split('-')[1];
        $rolloverBackground.css('background', 'none');
    });

    $slices.on('click', function() { 
        if(!$(this).data('id') || $activePieView.hasClass($(this).data('id'))) return;
        activatePieContent($(this).data('id'));

        var slice = $(this).parent().attr('class').split('-')[1];
        $activeBackground.css('background', 'url(img/dna-'+ slice +'.png)');
    });

    function activatePieContent(content) {
        if($activePieView) $activePieView.hide();
        $activePieView = $('.rosas-content.'+ content);
        $activePieView.fadeIn();
    }

    activatePieContent('customer-life-time-value');
    $activeBackground.css('background', 'url(img/dna-16.png)');



    /**
    *
    * Strenght value bar 
    * : Preferences view 
    * for each td in the table that lives in the preference view
    * loop trough each td with a child span that has a data-value
    * get is value
    * animate the spans from 0% -> value
    *
    **/
    var $bar = $(".preferences-view table td span").each(function(i){
       
        var thiss = $(this);
        var value = thiss.data("value"); // get the value of the span

        thiss.css("width", value + "%");
    });


    /**
    *
    * TOGGLE TABLE
    *
    **/
    
    $('.show-table').click(function () {
        var thiss = $(this);

        var parentEls = thiss.parents();
        $('.mainContent').slideUp();

        //
        // search for parent tr 
        // find the next tr
        // find the .maincontent div
        // slide toggle this div 
        //
        $(parentEls[1])
            .next('tr')
            .find('.mainContent')
            .stop()
            .slideToggle('fast');
      
    });



});






