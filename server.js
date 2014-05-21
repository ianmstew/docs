var express = require('express'),
	passport = require( 'passport' ),
	FacebookStrategy = require( 'passport-facebook' ).Strategy;

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
    	callbackURL: "http://localhost:3000/auth/facebook/callback",
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
app.get( '/logout', function( req, res ) {
	console.log( 'Logging out of all services, facebook was:' );
	console.log( req.getAuthTokens( 'facebook' ));
	req.logout();
	res.redirect( '/' );
});
 
app.listen(3000);
console.log('Listening on port 3000...');
