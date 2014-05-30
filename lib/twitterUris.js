module.exports = function( app ) {
	app.get( '/genericUri/twitter/userprofile', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/user/{userID}"
		});
	} );
	app.get( '/sampleUri/twitter/userprofile', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

}