Grunt front-end boilerplat
===================

Repository for frontend development with RequireJS, including Javascript, RespondJS, HTML, 
Handlebars, SASS, Compass and assets. The frontend can be automatically built and optimized 
with [grunt](http://gruntjs.com/) tasks.


Principle
---------
* The development/ directory contains application code and assets
* The deploy/ directory contains the built application
* Gruntfile.js configures the tasks to build and optimize the assets
* package.json contains all NPM dependencies
* Gemfile + Gemfile.lock contains configuration settings for Compass


Installing
----------
Prerequisites for installing the build tools are

* [nodejs](http://nodejs.org) (for grunt build environment)
* [ruby](http://ruby-lang.org) (for compiling SASS into CSS)

Ruby is present by default on Mac OS X. On most linux distros, it is either installed or 
available as a package. Check 'ruby -v' to see if it is installed (version 1.8.7 or 1.9.3 
should work fine). Once ruby is installed, run the following command to install the dependencies:
'gem install bundler && bundle install'


Setting up GruntJS
------------------
* Install NodeJS globally
* Install Sass & Compass gem: (sudo) gem update --system && gem install compass
* Drag project folder in terminal and
* Install Grunt locally (project folder): (sudo) npm install grunt
* Install Grunt-CLI locally (project folder): (sudo) npm install -g grunt-cli
* Install dependencies locally (project folder): (sudo) npm install


Common tasks
------------

* Drag project folder in terminal and use
* 'grunt server' to start a web server that automatically compiles on the fly (runs on port 9000)
* 'grunt build' to build a production-ready application in the deploy/ folder   
