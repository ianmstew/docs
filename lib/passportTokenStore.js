var _ = require( 'underscore' );
var SERVICE_TOKENS = {
	'facebook': {
		clientID: '1435264953389408',
		clientSecret: 'a2e8fef3bd4897e2ac34d92cbebfa49a'
	},
	'twitter': {
		consumerKey: 'NMWWu6OYHQwS3SOTaN0UpYmPX',
		consumerSecret: 'xh0HbjlGeiZpQl7S1X5s8skSnO3PXvK9RaDFuC8zu7KqYsEFqr'
	},
	// Configured at https://code.google.com/apis/console/b/5/?noredirect#project:371368983797:access
	// as support@engine.co
	'gmail': {
		'clientID': '371368983797-nk4mo26lhnofif2quka3dieqq5m96vkl.apps.googleusercontent.com',
		'clientSecret': '4nTac-1wBcUcWR-8JtdFH__W'		
	}
};

function PassportTokenStore( req ) {
	this.request = req;
}
PassportTokenStore.prototype.getUserTokens = function( owner, source, done ) {
	try {
		var parsed = source.match( /acct:([A-Za-z0-9]+):([A-Za-z0-9]+)/ );
		var service = parsed[1];
		var id = parsed[2];
		var tokens = this.request.getAuthTokens( service );
		if( tokens )
		{
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