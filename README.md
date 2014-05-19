# Welcome to Engine Hosted APIs

## Install

1. Install latest Node.js
1. Install latest MongoDB
1. Ensure Mongo is running: `$ mongo` (Ctrl+C to quit)
1. Install grunt comand line app `$ sudo npm install -g grunt-cli`

## Run

1. `$ npm install`
1. `$ grunt`
1. `$ node server`
1. Access `http://localhost:3000`

## Developing App (front end)

1. Start Hosted APIs app (see **Run**)
1. Start watch command `$ grunt watch` (required to be running continually during front end development)
1. `app` folder is compiled to `dist`, which is also the web server root.  Accessing `http://localhost:3000` reaches `dist/index.html`.
1. Install [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to take advatage of automatic brower refreshing while editing .html and .less files (optional)
1. Before committing any front end code, run `$ grunt jshint` and solve Javascript syntax issues, then `$ grunt jscs` and solve any style issues.

**IMPORTANT**: `dist` and `temp` are transient folders and will be erased.
