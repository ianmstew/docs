// Node 0.10.x adds additional cert checking, which could cause problems here.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var express = require('express'),
	passport = require( 'passport' ),
	FacebookStrategy = require( 'passport-facebook' ).Strategy,
	TwitterStrategy = require( 'passport-twitter' ).Strategy,
	ImapStrategy = require( './lib/ImapStrategy' ).Strategy,
	GoogleOAuth2Strategy = require( 'passport-google-oauth-offline' ).OAuth2Strategy,
	PDM = require( 'personal-data-module' ),
	TokenStore = require( './lib/passportTokenStore' ),
	_ = require( 'underscore' );

var datamodule = new PDM.DataModule( {
	services: [ 'facebook', 'twitter', 'imap', 'gmail' ]
});
// Configure the login mechanisms.

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function( req, user, done ) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var app = express();
 
passport.use( 'facebook', new FacebookStrategy( 
	{
		clientID: TokenStore.tokens.facebook.clientID,
		clientSecret: TokenStore.tokens.facebook.clientSecret,
    	callbackURL: "http://local.apinetwork.co:3000/auth/facebook/callback",
    	enableProof: false,
    	passReqToCallback: true
	},
	function( req, accessToken, refreshToken, profile, done ) {
		// Need to get the original user here, so we can add our new item to the session.
		var allUserData = req.user ? req.user : {};
		allUserData[ 'facebook' ] = {
			owner: 'facebook:' + profile.id,
			accessToken: accessToken
		};
		return done( null, allUserData );
	}
));
passport.use( 'twitter', new TwitterStrategy(
	{
		consumerKey: TokenStore.tokens.twitter.consumerKey,
		consumerSecret: TokenStore.tokens.twitter.consumerSecret,
		callbackUrl: 'http://local.apinetwork.co:3000/auth/twitter/callback',
		passReqToCallback: true
	},
	function( req, token, tokenSecret, profile, done ) {
		// Need to get the original user here, so we can add our new item to the session.
		var allUserData = req.user ? req.user : {};
		allUserData[ 'twitter' ] = {
			owner: 'twitter:' + profile.id,
			token: token,
			tokenSecret: tokenSecret
		};
		return done( null, allUserData );

	}
));
passport.use( 'imap', new ImapStrategy( 
	app,
	{
		'usePost': true,
		'loginPath': '/#imap',
		'callbackPath': '/auth/imap/callback',
		'failureRedirectUrl': '/#imap',
		'timeout': 15000
	},
	function( req, connectionData, done ) {
		// Need to get the original user here, so we can add our new item to the session.
		var allUserData = req.user ? req.user : {};

		var connectionData = {
			username: req.body.username,
  			password: req.body.password,
  			host: req.body.server,
  			port: req.body.port,
  			secure: ( req.body.secured == 'on' )
		}
		allUserData[ 'imap' ] = {
			owner: 'imap:' + connectionData.username.replace( /\./g, '&#46;' ),
			connectionData: connectionData
		};
		return done( null, allUserData );
	}
)); 
passport.use( 'gmail', new GoogleOAuth2Strategy(
	{
		'clientID': TokenStore.tokens.gmail.clientID,
		'clientSecret': TokenStore.tokens.gmail.clientSecret,
		"callbackURL": "http://local.apinetwork.co:3000/auth/gmail/callback",
		"callbackPath": "/auth/gmail/callback",
		'scope': [ 'https://www.googleapis.com/auth/userinfo.profile',
				   'https://www.googleapis.com/auth/userinfo.email',
				   'https://mail.google.com/' ],
   		// This one is required by passport strategies that extend OAuth.
		"passReqToCallback": true,			
		'accessType': 'offline',
		'approvalPrompt': 'force'
	},
	function( req, accessToken, refreshToken, profile, done ) {
		var allUserData = req.user ? req.user : {};
		allUserData[ 'gmail' ] = { 
			'owner': 'gmail:' + profile.id,
			'connectionData': {
				'username': profile._json.email,
				'accessToken': accessToken,
				'refreshToken': refreshToken,
				'host': 'imap.gmail.com',
				'port': 993,
				'secure': true				
			}
		};

		return done( null, allUserData );
 	}
));
 
app.configure(function () {
	app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'lkdfj86B1Haf4BI' }));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use( function( req, res, next ) {
		if( req.isAuthenticated() )
		{
			req.getAuthTokens = function( service ) {
				if( req.user.hasOwnProperty( service ))
					return req.user[ service ];
				else
					return false;
			};
		}
		else
		{
			req.getAuthTokens = function() { return false; };
		}
		next();
	} );
	app.use(express.static(__dirname+'/dist'));

});

// Return list of service keys for open connections
app.get('/auth/connections', function (req, res) {
	if (!req.isAuthenticated()) {
		res.json({
			connections: []
		});
	} else {
		res.json({
			connections: Object.keys(req.user)
		});
	}
});

app.get( '/auth/facebook',
	passport.authenticate( 'facebook' ));
app.get( 
	'/auth/facebook/callback',
	passport.authenticate( 'facebook', { failureRedirect: '#auth-failure' }),
	function( req, res ) {
		res.redirect( '/' );
	}
);
app.get( '/auth/twitter',
	passport.authenticate( 'twitter' ));
app.get( 
	'/auth/twitter/callback',
	passport.authenticate( 'twitter', { failureRedirect: '#auth-failure' }),
	function( req, res ) {
		res.redirect( '/' );
	}
);
app.get( '/auth/gmail',
	passport.authenticate( 'gmail' ));
app.get( 
	'/auth/gmail/callback',
	passport.authenticate( 'gmail', { failureRedirect: '#auth-failure' }),
	function( req, res ) {
		res.redirect( '/' );
	}
);
app.post( '/auth/imap/callback',
	passport.authenticate( 'imap', { failureRedirect: '#auth-failure' }),
	function( req, res ) {
		res.redirect( '/' );
	}
);

app.get( '/disconnect/:service', function( req, res ) {
	var toRemove = req.getAuthTokens( req.params.service );
	if( toRemove )
		delete req.session.passport.user[ req.params.service ];
	res.redirect( '/' );
});

app.get( '/getUri', function( req, res ) {
	datamodule.fetcher.fetch( 
		new TokenStore.UserStore( req ),
		req.query.uri,
		function( error, result ) {
			if( error )
			{
				res.json( error );
			}
			else
			{
				res.send( result );
			}
		}
	);
});
require( './lib/facebookUris' )( app );
require( './lib/twitterUris' )( app );
require( './lib/gmailUris' )( app );
require( './lib/imapUris' )( app, datamodule );

app.listen(3000);
console.log('Listening on port 3000...');
