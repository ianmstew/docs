module.exports = function( app ) {
	app.get( '/genericUri/gmail/userprofile', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/user/{userID}"
		});
	} );
	app.get( '/sampleUri/gmail/userprofile', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );

	app.get( '/genericUri/gmail/mailboxes', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/mailbox/_index"
		});
	} );
	app.get( '/sampleUri/gmail/mailboxes', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index'
			} );
		}
	} );

	app.get( '/genericUri/gmail/boxindex', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/mailbox/{mailboxName}"
		});
	} );
	app.get( '/sampleUri/gmail/boxindex', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			var indexUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + indexUri );
			var mailboxName = 'UNKNOWN';
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName 
			} );
		}
	} );

	app.get( '/genericUri/gmail/messageGmailId', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/message/x-gm-msgid/{messageID}"
		});
	} );
	app.get( '/sampleUri/gmail/messageGmailId', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			var boxListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			var messageListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName;
			console.log( 'TODO: get message from ' + messageListUri );
			var messageId = 'could-be-anything';
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/x-gm-msgid/' + messageId
			} );
		}
	} );

	app.get( '/genericUri/gmail/messageHeaderId', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/message/{mailboxName}/message-id/{msgID}"
		});
	} );
	app.get( '/sampleUri/gmail/messageHeaderId', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			var boxListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			var messageListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName;
			console.log( 'TODO: get message from ' + messageListUri );
			var messageId = 'I-Dont-know';
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/message-id/' + messageId
			} );
		}
	} );

	app.get( '/genericUri/gmail/messageServerId', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/message/{mailboxName}/uid/{msgID}"
		});
	} );
	app.get( '/sampleUri/gmail/messageServerId', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			var boxListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			var messageListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName;
			console.log( 'TODO: get message from ' + messageListUri );
			var messageUid = '?ID?';
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/uid/' + messageUid
			} );
		}
	} );

	app.get( '/genericUri/gmail/messageSequenceNumber', function( req, res ) {
		res.json( {
			"uri": "ldengine://{owner}//@acct:gmail:{accountID}/message/{mailboxName}/{seqNumber}"
		});
	} );
	app.get( '/sampleUri/gmail/messageSequenceNumber', function( req, res ) {
		var tokens = req.getAuthTokens( 'gmail' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 6 );
			var boxListUri = 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			res.json( { 
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/0'
			} );
		}
	} );

}