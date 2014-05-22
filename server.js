var express = require('express'),
	passport = require( 'passport' ),
	FacebookStrategy = require( 'passport-facebook' ).Strategy,
	TwitterStrategy = require( 'passport-twitter' ).Strategy;

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

passport.use( new FacebookStrategy( 
	{
		clientID: '1435264953389408',
    	clientSecret: 'a2e8fef3bd4897e2ac34d92cbebfa49a',
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
passport.use( new TwitterStrategy(
	{
		consumerKey: 'NMWWu6OYHQwS3SOTaN0UpYmPX',
		consumerSecret: 'xh0HbjlGeiZpQl7S1X5s8skSnO3PXvK9RaDFuC8zu7KqYsEFqr',
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
 
var app = express();
 
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

app.get( '/auth/facebook',
	passport.authenticate( 'facebook' ));
app.get( 
	'/auth/facebook/callback',
	passport.authenticate( 'facebook', { failureRedirect: '/auth-failure' }),
	function( req, res ) {
		res.redirect( '/' );
	}
);
app.get( '/auth/twitter',
	passport.authenticate( 'twitter' ));
app.get( 
	'/auth/twitter/callback',
	passport.authenticate( 'twitter', { failureRedirect: '/auth-failure' }),
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
 
app.listen(3000);
console.log('Listening on port 3000...');
