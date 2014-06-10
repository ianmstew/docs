module.exports = function( app ) {
	app.get( '/genericUri/imap/userprofile', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:imap:{accountID}/user/{userID}"
		});
	} );
	app.get( '/sampleUri/imap/userprofile', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

	app.get( '/genericUri/imap/mailboxes', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:imap:{accountID}/mailbox/_index"
		});
	} );
	app.get( '/sampleUri/imap/mailboxes', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

	app.get( '/genericUri/imap/boxindex', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:imap:{accountID}/mailbox/{mailboxName}"
		});
	} );
	app.get( '/sampleUri/imap/boxindex', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

	app.get( '/genericUri/imap/messageHeaderId', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:imap:{accountID}/message/{mailboxName}/message-id/{msgID}"
		});
	} );
	app.get( '/sampleUri/imap/messageHeaderId', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

	app.get( '/genericUri/imap/messageServerId', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:imap:{accountID}/message/{mailboxName}/uid/{msgID}"
		});
	} );
	app.get( '/sampleUri/imap/messageServerId', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

	app.get( '/genericUri/imap/messageSequenceNumber', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:imap:{accountID}/message/{mailboxName}/{seqNumber}"
		});
	} );
	app.get( '/sampleUri/imap/messageSequenceNumber', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

}