# Welcome to Engine Hosted APIs

## Install

1. Install latest Node.js
1. Install latest MongoDB
1. Ensure Mongo is running: `$ mongo` (Ctrl+C to quit)
1. Install grunt comand line app `$ sudo npm install -g grunt-cli`
1. Add the following to ``/etc/hosts``:
```
# To allow development of OAuth stuff locally.
127.0.0.1       local.apinetwork.co
```

## Run

1. `$ npm install`
1. `$ grunt`
1. `$ node server`
1. Access `http://local.apinetwork.co:3000`

## Developing App (front end)

1. Start Hosted APIs app (see **Run**)
1. Start watch command `$ grunt watch` (required to be running continually during front end development)
1. `app` folder is compiled to `dist`, which is also the web server root.  Accessing `http://local.apinetwork.co:3000` reaches `dist/index.html`.
1. Install [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to take advatage of automatic brower refreshing while editing .html and .less files (optional)
1. Before committing any front end code, run `$ grunt jshint` and solve Javascript syntax issues, then `$ grunt jscs` and solve any style issues.

**IMPORTANT**: `dist` and `temp` are transient folders and will be erased.

## Signing with your PGP key

Signing your commits with a PGP key is always appreciated. 

1. Generate a key: http://stackoverflow.com/a/16725717/364485 
2. Sign your commit: `git commit -S` (Works for merges too, don't need to sign every commit, just the last one before you push something up. 
3. Check the signature on your commit: `git log --show-signature`
4. You may not have all the contributor's public keys, to verify.  Most of them will be willing to send you either their key or its hash if you contact them (and contacting them is the best way to be sure you get the right one), then you can import it into your GPG client.  For example, to get mine (https://github.com/curtislacy), `gpg --recv-key 1c4176962f29735d'