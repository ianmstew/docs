TokenStore = require( './passportTokenStore' );

module.exports = function( app, datamodule ) {
	app.get( '/genericUri/imap/userprofile', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:imap:{accountID}/user/{userID}"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );
	app.get( '/genericOutput/imap/userprofile', function( req, res ) {
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

	app.get( '/genericUri/imap/mailboxes', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:imap:{accountID}/mailbox/_index"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index'
			} );
		}
	} );
	app.get( '/genericOutput/imap/mailboxes', function( req, res ) {
		res.json( 
			[
				"{Array of mailbox names}"
			]
		)
	} );

	app.get( '/genericUri/imap/boxindex', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:imap:{accountID}/mailbox/{mailboxName}"
		});
	} );
	app.get( '/sampleUri/imap/boxindex', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			var indexUri = 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			var tokenStore = new TokenStore.UserStore( req );
			datamodule.fetcher.fetch( 
				tokenStore,
				indexUri,
				function( error, boxList ) {
					var mailboxName;

					if( error )
					{
						mailboxName = 'UNKNOWN';
					}
					else
					{
						if( boxList.length > 0 )
							mailboxName = boxList[ 0 ];
						else
							mailboxName = 'UNKNOWN';

						res.json( { 
							"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName 
						} );
					}
				}
			);
		}
	} );
	app.get( '/genericOutput/imap/boxindex', function( req, res ) {
		res.json( 
			[
				"{Array of mail message URIs}"
			]
		)
	} );

	app.get( '/genericUri/imap/messageHeaderId', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:imap:{accountID}/message/{mailboxName}/message-id/{msgID}"
		});
	} );
	app.get( '/sampleUri/imap/messageHeaderId', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			var boxListUri = 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			var messageListUri = 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName;
			console.log( 'TODO: get message from ' + messageListUri );
			var messageId = 'I-Dont-know';
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/message-id/' + messageId
			} );
		}
	} );
	app.get( '/genericOutput/imap/messageHeaderId', function( req, res ) {
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
			  "gmthrid": "{GMail thread ID, if present}",
			  "gmmsgid": "{Gmail Message ID, if present}",
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


	app.get( '/genericUri/imap/messageServerId', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:imap:{accountID}/message/{mailboxName}/uid/{msgID}"
		});
	} );
	app.get( '/sampleUri/imap/messageServerId', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			var boxListUri = 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			var messageListUri = 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/' + mailboxName;
			console.log( 'TODO: get message from ' + messageListUri );
			var messageUid = '?ID?';
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/uid/' + messageUid
			} );
		}
	} );
	app.get( '/genericOutput/imap/messageServerId', function( req, res ) {
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
			  "gmthrid": "{GMail thread ID, if present}",
			  "gmmsgid": "{Gmail Message ID, if present}",
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

	app.get( '/genericUri/imap/messageSequenceNumber', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:imap:{accountID}/message/{mailboxName}/{seqNumber}"
		});
	} );
	app.get( '/sampleUri/imap/messageSequenceNumber', function( req, res ) {
		var tokens = req.getAuthTokens( 'imap' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 5 );
			var boxListUri = 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/mailbox/_index';
			console.log( 'TODO: get mailbox from ' + boxListUri );
			var mailboxName = 'UNKNOWN';
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/message/' + mailboxName + '/0'
			} );
		}
	} );
	app.get( '/genericOutput/imap/messageSequenceNumber', function( req, res ) {
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
			  "gmthrid": "{GMail thread ID, if present}",
			  "gmmsgid": "{Gmail Message ID, if present}",
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