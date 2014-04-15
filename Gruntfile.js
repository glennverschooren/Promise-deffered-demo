//
// GRUNT SETUP -------------------------------------------------------------
// Install the following globally (needs to be done only once):
// - install NodeJS globally
// - install Sass & Compass gem: (sudo) gem update --system && gem install compass
//
// Drag the Web-client folder on to the Terminal
// and install following stuff:
// - install CLI locally: (sudo) npm install -g grunt-cli
// - install Grunt locally: (sudo) npm install grunt
// - install all dependencies: (sudo) npm install
//
// All done!
// - Run the 'grunt server'-command to start development
// - Run the 'grunt'-command to build a deploy version
//

'use strict';


//
// -------------------------------------------------------------------------
// LIVE RELOAD
// Injects the live-reloading script (via a piece of Connect middleware)
// Then mounts the middleware folder from within the Grunt config
// https://github.com/intesso/connect-livereload
//

var LIVERELOAD_PORT = 35725;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};


//
// -------------------------------------------------------------------------
// GRUNT CONFIG
// http://gruntjs.com/api/grunt.config
//

module.exports = function(grunt) {


	var config = {
		development: 'development',
		production: 'deploy'
	};


	//
	// ---------------------------------------------------------------------
	// LOAD GRUNT TASKS & INIT CONFIG
	// https://github.com/sindresorhus/load-grunt-tasks
	// http://gruntjs.com/api/grunt.config
	//

	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		config: config,

		// Watch changes & update
		// via live-reload
		watch: {
			compass: {
				files: ['<%= config.development %>/sass/{,*/}{,*/}{,*/}{,*/}{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			styles: {
				files: ['<%= config.development %>/css/{,*/}{,*/}{,*/}{,*/}{,*/}*.css'],
				tasks: ['copy:styles', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= config.development %>/*.html',
					'<%= config.development %>/templates/{,*/}{,*/}{,*/}{,*/}{,*/}*.html',
					'<%= config.development %>/img/{,*/}{,*/}{,*/}{,*/}{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= config.development %>/icons/*.{png,jpg,jpeg,gif,ico}',
					'<%= config.development %>/fonts/*.{ttf,otf,woff,svg}',
					'{.tmp,<%= config.development %>}/js/{,*/}{,*/}{,*/}{,*/}{,*/}*.js',
					'.tmp/css/{,*/}{,*/}{,*/}{,*/}{,*/}*.css'
				]
			}
		},


		//
		// -----------------------------------------------------------------
		// SETUP A SERVER & OPEN BROWSER
		// https://github.com/gruntjs/grunt-contrib-connect
		// https://github.com/jsoverson/grunt-open
		//

		connect: {
			options: {
				port: 9090,
				// change this to '0.0.0.0' to access the server from outside
				// change this to 'localhost' to access only from localhost
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, config.development)
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function(connect) {
						return [
							mountFolder(connect, config.production)
						];
					}
				}
			}
		},

		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},


		//
		// -----------------------------------------------------------------
		// CLEAN PREVIOUS BUILDS
		// https://github.com/gruntjs/grunt-contrib-clean
		// http://gruntjs.com/configuring-tasks#files
		//

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.production %>/*',
						'!<%= config.production %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},


		//
		// -----------------------------------------------------------------
		// USE MINIFICATION
		// https://github.com/yeoman/grunt-usemin
		//

		useminPrepare: {
			html: '<%= config.development %>/index.html',
			options: { 
				dest: '<%= config.production %>'
			}
		},

		usemin: {
			css: ['<%= config.production %>/css/{,*/}{,*/}{,*/}{,*/}{,*/}*.css'],
			html: ['<%= config.production %>/{,*/}{,*/}{,*/}{,*/}{,*/}*.html'],
			options: { 
				dirs: ['<%= config.production %>']
			}
		},

		//
		// -----------------------------------------------------------------
		// JSHINT
		// See .jshintrc for confguration options
		// https://github.com/gruntjs/grunt-contrib-jshint
		// http://www.jshint.com/docs/options/
		//

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'<%= config.development %>/js/{,*/}{,*/}{,*/}{,*/}{,*/}*.js',
				'!<%= config.development %>/js/libs/*'
			]
		},


		//
		// -----------------------------------------------------------------
		// IMPROVE BUILDING TIME BY RUNNING TASKS PARALLEL
		// https://github.com/sindresorhus/grunt-concurrent
		//

		concurrent: {
			server: [
				'compass',
				'copy:styles'
			],
			dist: [
				'compass',
				'copy:styles',
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		},


		//
		// -----------------------------------------------------------------
		// COPY ASSETS
		// https://github.com/gruntjs/grunt-contrib-copy
		//

		copy: {
			dist: {
				files: [{
					dot: true,
					expand: true,
					cwd: '<%= config.development %>',
					dest: '<%= config.production %>',
					src: [
						'.htaccess',
						'icons/*.ico',
						'*.{ico,png,txt}',
						'img/{,*/}{,*/}{,*/}{,*/}{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'fonts/*',
						'js/libs/*',
						'!js/libs/require-text-2.0.10.min.js'
					]
				},
				// Copy javascript modules & templates as
				// preparation for the requirejs optimizer
				{
					dot: true,
					expand: true,
					cwd: '<%= config.development %>',
					dest: '.tmp',
					src: [
						'js/**/*.js',
						'templates/{,*/}{,*/}{,*/}{,*/}{,*/}*.html'
					]
				}]
			},
			styles: {
				dot: true,
				expand: true,
				cwd: '<%= config.development %>/css',
				src: '{,*/}{,*/}{,*/}{,*/}{,*/}*.css',
				dest: '.tmp/css/'
			}
		},


		//
		// -----------------------------------------------------------------
		// COMPILE SASS & CLEAN-UP VENDOR PREFIXES
		// https://github.com/gruntjs/grunt-contrib-compass
		// https://github.com/nDmitry/grunt-autoprefixer
		// http://css-tricks.com/autoprefixer/
		//

		compass: {
			options: {
				sassDir: '<%= config.development %>/sass',
				cssDir: '.tmp/css'
			},
			server: {
				options: {
					// Important: debug-info doesn't
					// play well with Respond.js
					debugInfo: false
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/css/',
					src: '{,*/}{,*/}{,*/}{,*/}{,*/}*.css',
					dest: '.tmp/css/'
				}]
			}
		},


		//
		// -----------------------------------------------------------------
		// REQUIREJS OPTIMIZER
		// https://github.com/jrburke/r.js/blob/master/build/example.build.js
		//

		requirejs: {
			compile: {
				options: {
					baseUrl: '.tmp/js',
					preserveLicenseComments: false,
					mainConfigFile: '.tmp/js/config.js',
					out: '<%= config.production %>/js/config.js',
					name: 'config',
					// When serving 3rd party libs from a CDN you need to
					// exclude them from the build by adding 'paths:{ referrence: empty: }'
					// See development/js/config.js for more info
					paths: {
						'io': 'empty:',
						'jquery': 'empty:',
						'underscore': 'empty:',
						'backbone': 'empty:',
						'handlebars': 'empty:'
					}
				}
			}
		},


		//
		// -----------------------------------------------------------------
		// PREFIX WITH VERSIONING
		// https://github.com/cbas/grunt-rev
		//

		rev: {
			dist: {
				files: {
					src: [
						'<%= config.production %>/css/{,*/}{,*/}{,*/}{,*/}{,*/}*.css',
						'<%= config.production %>/js/{,*/}{,*/}{,*/}{,*/}{,*/}*.js',
						'!<%= config.production %>/js/libs/*.js'
					]
				}
			}
		},


		//
		// -----------------------------------------------------------------
		// MINIFY
		// http://gruntjs.com/configuring-tasks#files
		// https://github.com/gruntjs/grunt-contrib-htmlmin
		// https://github.com/gruntjs/grunt-contrib-cssmin
		// https://github.com/gruntjs/grunt-contrib-imagemin
		// https://github.com/sindresorhus/grunt-svgmin
		//

		cssmin: {
			dist: {
				files: {
					'<%= config.production %>/css/styles.css': [
						'.tmp/css/styles.css', '<%= config.development %>/css/styles.css'
					]
				}
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					removeComments: true
				},
				files: [{
					expand: true,
					src: '*.html',
					cwd: '<%= config.development %>',
					dest: '<%= config.production %>'
				}]
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.development %>/img',
					src: '{,*/}{,*/}{,*/}{,*/}{,*/}*.{gif,png,jpg,jpeg}',
					dest: '<%= config.production %>/img'
				},
				{
					expand: true,
					cwd: '<%= config.development %>/icons',
					src: '*.{gif,png,jpg,jpeg}',
					dest: '<%= config.production %>/icons'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.development %>/img',
					src: '{,*/}{,*/}{,*/}{,*/}{,*/}*.svg',
					dest: '<%= config.production %>/img'
				}]
			}
		}


	});


	//
	// DEFINE TASKS --------------------------------------------------------
	//

	grunt.registerTask('server', function(target) {
		if(target === 'dist') return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'compass',
		'cssmin',
		'copy:dist',
		'requirejs',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'build'
	]);

};
