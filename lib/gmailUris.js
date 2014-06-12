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
	app.get( '/genericOutput/gmail/userprofile', function( req, res ) {
		res.json( 
			{
				"id": "{Original URI used to recover this data}",
				"displayName": {
					"formatted": "{user login name}/{server hostname}"
				},
				"preferredUsername": "{User login name}",
				"thumbnailUrl": "/images/generic_user_image.jpeg",
				"appData": {
					"serviceName": "IMAP",
					"serviceImgUrl": "/images/512x512-logos/email.png"
				}
			}
		)
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
	app.get( '/genericOutput/gmail/mailboxes', function( req, res ) {
		res.json( 
			[
				"{Array of mailbox names}"
			]
		)
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
	app.get( '/genericOutput/gmail/boxindex', function( req, res ) {
		res.json( 
			[
				"{Array of mail message URIs}"
			]
		)
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
	app.get( '/genericOutput/gmail/messageGmailId', function( req, res ) {
		res.json( 
		  {
			  "id": "{Original URI used to recover this data}",
			  "appData": {
			    "serviceName": "imap"
			  },
			  "itemtype": "email",
			  "body": "{Plain text version of email}",
			  "bodyhtml": "{HTML version of email (if provided)}",
			  "senderId": "{URI of contact who sent the message}",
			  "title": "{Subject line of message}",
			  "messageid": "{The email message-id header}",
			  "gmthrid": "{GMail thread ID}",
			  "gmmsgid": "{Gmail Message ID}",
			  "gmlabels": [
			    "{Array of labels applied by gmail (if any).}"
			  ],
			  "recipients": [
			  	"{Array of recipient URIs}"
			  ],
			  "torecipients": [
			  	"{Array of names & addresses of people in the 'to' field}"
			  ],
			  "ccrecipients": [
			  	"{Array of names & addresses of people in the 'cc' field}"
			  ],
			  "bccrecipients": [
  			  	"{Array of names & addresses of people in the 'bcc' field}"
			  ],
			  "timeSent": "numeric timestamp"
			}
		)
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
	app.get( '/genericOutput/gmail/messageHeaderId', function( req, res ) {
		res.json( 
		  {
			  "id": "{Original URI used to recover this data}",
			  "appData": {
			    "serviceName": "imap"
			  },
			  "itemtype": "email",
			  "body": "{Plain text version of email}",
			  "bodyhtml": "{HTML version of email (if provided)}",
			  "senderId": "{URI of contact who sent the message}",
			  "title": "{Subject line of message}",
			  "messageid": "{The email message-id header}",
			  "gmthrid": "{GMail thread ID}",
			  "gmmsgid": "{Gmail Message ID}",
			  "gmlabels": [
			    "{Array of labels applied by gmail (if any).}"
			  ],
			  "recipients": [
			  	"{Array of recipient URIs}"
			  ],
			  "torecipients": [
			  	"{Array of names & addresses of people in the 'to' field}"
			  ],
			  "ccrecipients": [
			  	"{Array of names & addresses of people in the 'cc' field}"
			  ],
			  "bccrecipients": [
  			  	"{Array of names & addresses of people in the 'bcc' field}"
			  ],
			  "timeSent": "numeric timestamp"
			}
		)
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
	app.get( '/genericOutput/gmail/messageServerId', function( req, res ) {
		res.json( 
		  {
			  "id": "{Original URI used to recover this data}",
			  "appData": {
			    "serviceName": "imap"
			  },
			  "itemtype": "email",
			  "body": "{Plain text version of email}",
			  "bodyhtml": "{HTML version of email (if provided)}",
			  "senderId": "{URI of contact who sent the message}",
			  "title": "{Subject line of message}",
			  "messageid": "{The email message-id header}",
			  "gmthrid": "{GMail thread ID}",
			  "gmmsgid": "{Gmail Message ID}",
			  "gmlabels": [
			    "{Array of labels applied by gmail (if any).}"
			  ],
			  "recipients": [
			  	"{Array of recipient URIs}"
			  ],
			  "torecipients": [
			  	"{Array of names & addresses of people in the 'to' field}"
			  ],
			  "ccrecipients": [
			  	"{Array of names & addresses of people in the 'cc' field}"
			  ],
			  "bccrecipients": [
  			  	"{Array of names & addresses of people in the 'bcc' field}"
			  ],
			  "timeSent": "numeric timestamp"
			}
		)
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
	app.get( '/genericOutput/gmail/messageSequenceNumber', function( req, res ) {
		res.json( 
		  {
			  "id": "{Original URI used to recover this data}",
			  "appData": {
			    "serviceName": "imap"
			  },
			  "itemtype": "email",
			  "body": "{Plain text version of email}",
			  "bodyhtml": "{HTML version of email (if provided)}",
			  "senderId": "{URI of contact who sent the message}",
			  "title": "{Subject line of message}",
			  "messageid": "{The email message-id header}",
			  "gmthrid": "{GMail thread ID}",
			  "gmmsgid": "{Gmail Message ID}",
			  "gmlabels": [
			    "{Array of labels applied by gmail (if any).}"
			  ],
			  "recipients": [
			  	"{Array of recipient URIs}"
			  ],
			  "torecipients": [
			  	"{Array of names & addresses of people in the 'to' field}"
			  ],
			  "ccrecipients": [
			  	"{Array of names & addresses of people in the 'cc' field}"
			  ],
			  "bccrecipients": [
  			  	"{Array of names & addresses of people in the 'bcc' field}"
			  ],
			  "timeSent": "numeric timestamp"
			}
		)
	} );

}