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

	app.get( '/genericUri/twitter/statussent', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/status/sent"
		});
	} );
	app.get( '/sampleUri/twitter/statussent', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/status/sent'
			} );
		}
	} );

	app.get( '/genericUri/twitter/following', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/relationship/outgoing/confirmed"
		});
	} );
	app.get( '/sampleUri/twitter/following', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/outgoing/confirmed'
			} );
		}
	} );

	app.get( '/genericUri/twitter/pendingfollowing', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/relationship/outgoing/pending"
		});
	} );
	app.get( '/sampleUri/twitter/pendingfollowing', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/outgoing/pending'
			} );
		}
	} );

	app.get( '/genericUri/twitter/mentions', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/status/mentions"
		});
	} );
	app.get( '/sampleUri/twitter/mentions', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/status/mentions'
			} );
		}
	} );

	app.get( '/genericUri/twitter/followers', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/relationship/incoming/confirmed"
		});
	} );
	app.get( '/sampleUri/twitter/followers', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/incoming/confirmed'
			} );
		}
	} );

	app.get( '/genericUri/twitter/pendingfollowers', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/relationship/incoming/pending"
		});
	} );
	app.get( '/sampleUri/twitter/pendingfollowers', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/incoming/pending'
			} );
		}
	} );

	app.get( '/genericUri/twitter/directsent', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/direct/sent"
		});
	} );
	app.get( '/sampleUri/twitter/directsent', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/direct/sent'
			} );
		}
	} );

	app.get( '/genericUri/twitter/directreceived', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:twitter:{accountID}/direct/received"
		});
	} );
	app.get( '/sampleUri/twitter/directreceived', function( req, res ) {
		var tokens = req.getAuthTokens( 'twitter' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 8 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/direct/received'
			} );
		}
	} );

}