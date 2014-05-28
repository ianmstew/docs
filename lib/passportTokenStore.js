var _ = require( 'underscore' );
var SERVICE_TOKENS = {
	'facebook': {
		clientID: '1435264953389408',
		clientSecret: 'a2e8fef3bd4897e2ac34d92cbebfa49a'
	},
	'twitter': {
		consumerKey: 'NMWWu6OYHQwS3SOTaN0UpYmPX',
		consumerSecret: 'xh0HbjlGeiZpQl7S1X5s8skSnO3PXvK9RaDFuC8zu7KqYsEFqr'
	}
};

function PassportTokenStore( req ) {
	this.request = req;
}
PassportTokenStore.prototype.getUserTokens = function( owner, source, done ) {
	try {
		console.log( 'getUserTokens for ' + owner + ', ' + source );
		var parsed = source.match( /acct:([A-Za-z0-9]+):([A-Za-z0-9]+)/ );
		var service = parsed[1];
		var id = parsed[2];
		var tokens = this.request.getAuthTokens( service );
		if( tokens )
		{
			console.log( tokens );
			if( tokens.owner == owner )
			{
				done( null, _.extend( {}, tokens, SERVICE_TOKENS[ service ] ));
			}
			else
			{
				done( 'You are not the owner of that URI' );
			}
		}
		else
		{
			done( 'Not Authenticated to ' + service );
		}
	} catch( e )
	{
		done( e );
	}
};

module.exports = {
	tokens: SERVICE_TOKENS,
	UserStore: PassportTokenStore
};