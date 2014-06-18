module.exports = function( app ) {
	app.get( '/genericUri/twitter/userprofile', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/user/{userID}"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );
	app.get( '/genericOutput/twitter/userprofile', function( req, res ) {
		res.json( 
			{
			  "id": "{Original URI, again}",
			  "displayName": {
			    "formatted": "{User's human-readable name}"
			  },
			  "preferredUsername": "@{Handle}",
			  "thumbnailUrl": "{URL of the user's profile picture}",
			  "appData": {
			    "serviceName": "Twitter",
			    "serviceImgUrl": "/images/512x512-logos/twitter.png",
			    "verified": "{True or false depending on if twitter believes the user is \"verified\"}"
			  },
			  "location": "{User's location}",
			  "aboutMe": "{Service-specific 'about me' data.}",
				"urls": [ "{Array of URLs related to the user.}" ], 
				"utcOffset": "{ User's timezone}",
				"languagesSpoken": [ "{Array of languages spoken by the user.}" ],
			  "status": "{Most recent post from this user.}"
		    }
		);
	});


	app.get( '/genericUri/twitter/statussent', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/status/sent"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/status/sent'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/statussent', function( req, res ) {
		res.json( 
			    [
			  {
			    "appData": {
			      "serviceName": "Twitter"
			    },
			    "body": "{Content of this post.}",
			    "id": "{URI of this status post.}",
			    "senderId": "{URI Of the post's sender}",
			    "geo": "{User's latitude & longitude, if provided}",
			    "timeSent": 1387058655000,
			    "itemtype": "Tweet"
			  }, '{ And more entries, one for each post.}'
  	]
		);
	});


	app.get( '/genericUri/twitter/following', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/relationship/outgoing/confirmed"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/outgoing/confirmed'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/following', function( req, res ) {
		res.json( 
    {
  "uri": "{Original URI used to recover this data}",
  "data": [
    {
      "sourceUri": "{For each entry, the Original URI used to recover the set}",
      "uri": "{URI of this user's profile}",
      "owner": "{Account holder who owns this data}",
      "category": "follower",
      "data": {
        "id": "{Twitter User ID}",
        "name": "{User's human-readable name}",
        "screen_name": "{Twitter Handle}",
        "location": "{User's location}",
        "description": "{Service-specific 'about me' data.}",
        "url": "{URL of this post from Twitter.}",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "{Shortened URL}",
                "expanded_url": "{Non-shortened version of the URL}",
                "display_url": "{More human-friendly URL, for display}"
              }
            ]
          },
          "description": {
            "urls": []
          }
        }, 
    	}
    	}, 'And More....'
    ]
    		    }
		);
	});


	app.get( '/genericUri/twitter/pendingfollowing', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/relationship/outgoing/pending"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/outgoing/pending'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/pendingfollowing', function( req, res ) {
		res.json( {
  "uri": "{Original URI used to recover this data}",
  "data": [
    {
      "sourceUri": "{For each entry, the Original URI used to recover the set}",
      "uri": "{URI of this user's profile}",
      "owner": "{Account holder who owns this data}",
      "category": "follower",
      "data": {
        "id": "{Twitter User ID}",
        "name": "{User's human-readable name}",
        "screen_name": "{Twitter Handle}",
        "location": "{User's location}",
        "description": "{Service-specific 'about me' data.}",
        "url": "{URL of this post from Twitter.}",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "{Shortened URL}",
                "expanded_url": "{Non-shortened version of the URL}",
                "display_url": "{More human-friendly URL, for display}"
              }
            ]
          },
          "description": {
            "urls": []
          }
        }, 
    	}
    	}, 'And More....'
    ]

		} );
	});


	app.get( '/genericUri/twitter/mentions', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/status/mentions"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/status/mentions'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/mentions', function( req, res ) {
		res.json( 
			    [
			  {
			    "appData": {
			      "serviceName": "Twitter"
			    },
			    "body": "{Content of this post.}",
			    "id": "{URI of this status post.}",
			    "senderId": "{URI Of the post's sender}",
			    "geo": "{User's latitude & longitude, if provided}",
			    "timeSent": "{Time this post was sent, in milliseconds since 1970}",
			    "itemtype": "Tweet"
			  }, '{ And more entries, one for each post.}'
  	]
		);
	});


	app.get( '/genericUri/twitter/followers', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/relationship/incoming/confirmed"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/incoming/confirmed'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/followers', function( req, res ) {
		res.json( 
    		{
  "uri": "{Original URI used to recover this data}",
  "data": [
    {
      "sourceUri": "{For each entry, the Original URI used to recover the set}",
      "uri": "{URI of this user's profile}",
      "owner": "{Account holder who owns this data}",
      "category": "follower",
      "data": {
        "id": "{Twitter User ID}",
        "name": "{User's human-readable name}",
        "screen_name": "{Twitter Handle}",
        "location": "{User's location}",
        "description": "{Service-specific 'about me' data.}",
        "url": "{URL of this post from Twitter.}",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "{Shortened URL}",
                "expanded_url": "{Non-shortened version of the URL}",
                "display_url": "{More human-friendly URL, for display}"
              }
            ]
          },
          "description": {
            "urls": []
          }
        }, 
    	}
    	}, 'And More....'
    ]

    		} 
    	);
	});


	app.get( '/genericUri/twitter/pendingfollowers', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/relationship/incoming/pending"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/relationship/incoming/pending'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/pendingfollowers', function( req, res ) {
		res.json( 
		   {
  "uri": "{Original URI used to recover this data}",
  "data": [
    {
      "sourceUri": "{For each entry, the Original URI used to recover the set}",
      "uri": "{URI of this user's profile}",
      "owner": "{Account holder who owns this data}",
      "category": "follower",
      "data": {
        "id": "{Twitter User ID}",
        "name": "{User's human-readable name}",
        "screen_name": "{Twitter Handle}",
        "location": "{User's location}",
        "description": "{Service-specific 'about me' data.}",
        "url": "{URL of this post from Twitter.}",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "{Shortened URL}",
                "expanded_url": "{Non-shortened version of the URL}",
                "display_url": "{More human-friendly URL, for display}"
              }
            ]
          },
          "description": {
            "urls": []
          }
        }, 
    	}
    	}, 'And More....'
    ]
		    }
		);
	});


	app.get( '/genericUri/twitter/directsent', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/direct/sent"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/direct/sent'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/directsent', function( req, res ) {
		res.json( 
    [
	  {
	    "appData": {
	      "serviceName": "Twitter"
	    },
				    "body": "{Content of this message.}",
				    "id": "{URI of this message.}",
		    "recipients": [
		      "{This array contains URIs of message recipients.}"
		    ],
		    "senderId": "{URI Of the post's sender}",
		    "timeSent": "{Date and time message was sent.}",
		    "itemtype": "Twitter Direct Message"
	  }, 'And more....'
  ]
		);
	});


	app.get( '/genericUri/twitter/directreceived', function( req, res ) {
		res.json( {
			"uri": "apinetwork://{owner}//@acct:twitter:{accountID}/direct/received"
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
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/direct/received'
			} );
		}
	} );
	app.get( '/genericOutput/twitter/directreceived', function( req, res ) {
		res.json( 
   [
	  {
	    "appData": {
	      "serviceName": "Twitter"
	    },
				    "body": "{Content of this message.}",
				    "id": "{URI of this message.}",
		    "recipients": [
		      "{This array contains URIs of message recipients.}"
		    ],
		    "senderId": "{URI Of the post's sender}",
		    "timeSent": "{Date and time message was sent.}",
		    "itemtype": "Twitter Direct Message"
	  }, 'And more....'
	  ]
  		);
	});


}