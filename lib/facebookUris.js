module.exports = function( app ) {
	app.get( '/sampleUri/userprofile', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( '{ "uri": "ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId + '" }' );
		}
	} );
};