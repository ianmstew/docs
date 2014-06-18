module.exports = function( app ) {

	// User Profile

	app.get( '/genericUri/facebook/userprofile', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@{account}/user/{user ID}" }
		);
	} );
	app.get( '/sampleUri/facebook/userprofile', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
			} );
		}
	} );
	app.get( '/genericOutput/facebook/userprofile', function( req, res ) {
		res.json( 
			{
		      "uri":"{Original URI used to recover this data}",
		      "owner":"{Account holder who owns this data}",
		      "category":"person",
		      "data": {
		        "id":"{Original URI, again}",
		        "displayName": {
		          "formatted":"{User's human-readable name}"
		        },
		        "preferredUsername":"{Username}",
		        "thumbnailUrl":"{URL of the user's profile picture}",
		        "appData": {
		          "serviceName":"Facebook",
		          "serviceImgUrl":"/images/512x512-logos/facebook.png",
		          "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
		        },
		        "location":"{User's country}",
		        "aboutMe":"{Service-specific 'about me' data.}",
		        "emails": [ "{Array of user's email addresses}" ],
		        "urls": [ "{Array of URLs related to the user.}" ], 
		        "utcOffset": "{ User's timezone}",
		        "languagesSpoken": [ "{Array of languages spoken by the user.}" ] 
		      }
		    }
		);
	});


	// Owner Friends

	app.get( '/genericUri/facebook/ownerfriends', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/contacts" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerfriends', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner  + '/contacts'
			} );
		}
	} );
	app.get( '/genericOutput/facebook/ownerfriends', function( req, res ) {
		res.json( 
			{
                    "uri":"{Original URI used to recover this data}",
                    "sourceUri" : "{Original Source URI used to recover this data}",
                    "uri" : "{Profile uri of the contact}",
                    "owner" : "Account owner",
                    "category" : "{Which category this contact belongs to person/app etc}",
                     "data" : [
                            {
                            "id" : "{Profile Uri of the user}",
                            "displayName" : "{facebook User Id of the contact}",
                            "gender" : "{male/ female}",
                            "preferredUsername" : "{User name }",
                            "thumbnailUrl" : "{Uri of the facebook profile pic}",
                            "appData": {
                                "serviceName":"Facebook",
                                "serviceImgUrl":"/images/512x512-logos/facebook.png",
                                "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                            },
                            "location" : "{Location where contact belong to}",
                            "aboutMe" : "{Profile details in about me section for the contact}",
                            "urls" : "{All the urls mentioned the public profile of the contact}",
                            "utcOffset" : "{Time zone where user contact belongs to}",
                            "languagesSpoken" : "{Language code for the user contact}"
                            }
                        ]
                }
            );
	} );

	// Owner News feed

	app.get( '/genericUri/facebook/ownernews', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fnews" }
		);
	} );
	app.get( '/sampleUri/facebook/ownernews', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fnews'
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownernews', function( req, res ) {
        res.json(
            {
                "uri":"{Original URI used to recover this data}",
                "sourceUri" : "{Original Source URI used to recover this data}",
                "uri" : "{Profile uri of the contact}",
                "owner" : "{Account owner}",
                "category" : "{Which category this object belong to : message}",
                "data" :
                {
                    "body" : "{message body of the news feed}",
                    "title" : "{title of the news feed}",
                    "uri" : "{ uri of the news feed}",
                    "appData": {
                        "serviceName":"Facebook",
                        "serviceImgUrl":"/images/512x512-logos/facebook.png",
                        "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                    },
                    "id" : "{Id  of the feed}",
                    "senderId" : "{Id of the sender of the feed}",
                    "timeSent" : "{time stamp when the feed is sent}",
                    "itemtype" : "{FacebookNewsfeed}"
                },
                "time" : "time stamp when the feed is received"
            }
        );
    } );

	// Owner's Status Feed

	app.get( '/genericUri/facebook/ownerstatus', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fstatuses" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerstatus', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fstatuses' 
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownerstatus', function( req, res ) {
        res.json(
            {
                "id" : "{Id  of the feed}",
                "from" : {
                    "id" : "{facebook numaric id of the sender}",
                    "name" : "{Name of the sender}"
                },
                "message": "{Actual text of the status feed}",
                "picture" : "{Uri of the profile pic of the sender}",
                "link" : "{Link to the status feed}",
                "icon" : "{uri of the icon}",
                "actions" :[
                    {
                        "name" : "{Comment}",
                        "link" : "{Link to the comment}"
                    },
                    {
                        "name" : "{like}",
                        "link" : "{Link to the comment}"
                    }
                ],
                "privacy" : {
                    "description" : "{public/private/customised}",
                    "value" : "EVERYONE/Circle/RESTRICTED",
                    "friends" : "{}",
                    "networks" : "{}",
                    "allow" : "{}",
                    "deny" : "{}"
                },
                "type" : "{photo/comment/like etc}",
                "status_type" : "{Added photo/ comment}",
                "object_id" : "{Id of the photo added or comment }",
                "application" : {
                    "name" : "{Name of the application used to do this status update, eg Facebook for Android}",
                    "namespace" : "{application name space}",
                    "id" : "Facebook registered id for the application"
                },
                "created_time" : "{Timestamp when the status update is created}",
                "updated_time" : "{Timestamp when the status updated}",
                "likes" : {
                    "data" : [
                        {
                            "id" : "{facebook id of the like}",
                            "name" : "{Name of the user who like it}"
                        }
                    ]
                }
            }
        );
    } );

	// Owner's Events

	app.get( '/genericUri/facebook/ownerevents', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fevents" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerevents', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fevents' 
			} );
		}
	} );

	// Owner's Groups

	app.get( '/genericUri/facebook/ownergroups', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fgroups" }
		);
	} );
	app.get( '/sampleUri/facebook/ownergroups', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fgroups' 
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownergroups', function( req, res ) {
        res.json(
            {
                "uri":"{Original URI of the item user liked}",
                "sourceUri" : "{Original Source URI used to recover this data}",
                "uri" : "{Profile uri of the contact}",
                "owner" : "{Account owner}",
                "category" : "{Which category this object belong to : group}",
                "data" :
                {
                    "name" : "{ Name of the group}",
                    "description" : "{ Description of the group}",
                    "icon" : " {uris of the group icon image}",
                    "administrator" : "{id of the group adminstetor }",
                    "email" : "{}",
                    "appData": {
                        "serviceName":"Facebook",
                        "serviceImgUrl":"/images/512x512-logos/facebook.png",
                        "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                    },
                    "id" : "{Id  of the feed}",

                    "itemtype" : "{FacebookGroup}"
                }
            }
        );
    } );

	// Owner's Likes

	app.get( '/genericUri/facebook/ownerlikes', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/flikes" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerlikes', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/flikes'
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownerlikes', function( req, res ) {
        res.json(
            {
                "uri":"{Original URI of the item user liked}",
                "sourceUri" : "{Original Source URI used to recover this data}",
                "uri" : "{Profile uri of the contact}",
                "owner" : "{Account owner}",
                "category" : "{Which category this object belong to : Like}",
                "data" :
                {
                    "category" : "{Category of the item song/movie/news etc}",
                    "name" : "{title of the item}",
                    "uri" : "{ uri of the news feed}",
                    "appData": {
                        "serviceName":"Facebook",
                        "serviceImgUrl":"/images/512x512-logos/facebook.png",
                        "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                    },
                    "id" : "{Id  of the feed}",
                    "category_list" : "{Which category this item belongs to}",
                    "created_time" : "{time stamp when the item is sent}",
                    "itemtype" : "{FacebookNewsLike}"
                },
                "time" : "time stamp when the item is liked"
            }
        );
    } );

	// Owner's Links

	app.get( '/genericUri/facebook/ownerlinks', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/flinks" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerlinks', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/flinks' 
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownerlinks', function( req, res ) {
        res.json(
            {
                "id" : "{Id  of the feed}",
                "from" : {
                    "id" : "{facebook numaric id of the sender}",
                    "name" : "{Name of the sender}"
                },
                "message": "{Actual text of the status feed}",
                "picture" : "{Uri of the profile pic of the sender}",
                "link" : "{Link to the status feed}",
                "icon" : "{uri of the icon}",
                "actions" :[
                    {
                        "name" : "{Comment}",
                        "link" : "{Link to the comment}"
                    },
                    {
                        "name" : "{like}",
                        "link" : "{Link to the comment}"
                    }
                ],
                "name" : "{Title of the link}",
                "description" : "{Description shared on link}",
                "appData": {
                    "serviceName":"Facebook",
                    "serviceImgUrl":"/images/512x512-logos/facebook.png",
                    "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                },
                "privacy" : {
                    "description" : "{public/private/customised}",
                    "value" : "EVERYONE/Circle/RESTRICTED",
                    "friends" : "{}",
                    "networks" : "{}",
                    "allow" : "{}",
                    "deny" : "{}"
                },
                "created_time" : "{Timestamp when the status update is created}",
                "updated_time" : "{Timestamp when the status updated}"
            }
        );
    } );

	// Owner's Photos

	app.get( '/genericUri/facebook/ownerphotos', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fphotos" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerphotos', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fphotos'
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownerphotos', function( req, res ) {
        res.json(
            {
                "uri":"{Original URI of the item user liked}",
                "sourceUri" : "{Original Source URI used to recover this data}",
                "uri" : "{Profile uri of the contact}",
                "owner" : "{Account owner}",
                "category" : "{Which category this object belong to : photo}",
                "data" :
                {
                    "picture" : "{ Uri of the image}",
                    "source" : "{Uri of the item}",
                    "images" : [
                        {
                            "height" : "{height of image in px}",
                            "width" : "{width of image in px}",
                            "source" : "{Uri of the image]"
                        }
                    ],
                    "link" : "{ uri of the page where image}",
                    "icon" : " {uris of the icon image}",
                    "tags" : {
                       "data" : [
                           {
                               "id" : "{Id of the tag } ",
                               "name" : "{Name on the tag}",
                               "created_time" : "{Time stamp when the tag is created}",
                               "x" : "{x co ordinate of the tag}",
                               "y" : "{y co ordinate of the tag}"
                           }
                       ]
                    },
                    "appData": {
                        "serviceName":"Facebook",
                        "serviceImgUrl":"/images/512x512-logos/facebook.png",
                        "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                    },
                    "id" : "{Id  of the feed}",
                    "category_list" : "{Which category this item belongs to}",
                    "created_time" : "{time stamp when the item is sent}",
                    "itemtype" : "{FacebookNewsPhoto}"
                },
                "time" : "time stamp when the item is liked"
            }
        );
    } );

	// Owner's Posts

	app.get( '/genericUri/facebook/ownerposts', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fposts" }
		);
	} );
	app.get( '/sampleUri/facebook/ownerposts', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fposts'
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownerposts', function( req, res ) {
        res.json(
            {
                "id" : "{Id  of the feed}",
                "from" : {
                    "id" : "{facebook numaric id of the sender}",
                    "name" : "{Name of the sender}"
                },
                "message": "{Actual text of the status feed}",
                "picture" : "{Uri of the profile pic of the sender}",
                "link" : "{Link to the status feed}",
                "icon" : "{uri of the icon}",
                "actions" :[
                    {
                        "name" : "{Comment}",
                        "link" : "{Link to the comment}"
                    },
                    {
                        "name" : "{like}",
                        "link" : "{Link to the comment}"
                    }
                ],
                "privacy" : {
                    "description" : "{public/private/customised}",
                    "value" : "EVERYONE/Circle/RESTRICTED",
                    "friends" : "{}",
                    "networks" : "{}",
                    "allow" : "{}",
                    "deny" : "{}"
                },
                "type" : "{photo/comment/like etc}",
                "status_type" : "{Added photo/ comment}",
                "object_id" : "{Id of the photo added or comment }",
                "application" : {
                    "name" : "{Name of the application used to do this status update, eg Facebook for Android}",
                    "namespace" : "{application name space}",
                    "id" : "Facebook registered id for the application"
                },
                "created_time" : "{Timestamp when the status update is created}",
                "updated_time" : "{Timestamp when the status updated}",
                "likes" : {
                    "data" : [
                        {
                            "id" : "{facebook id of the like}",
                            "name" : "{Name of the user who like it}"
                        }
                    ]
                }
            }
        );
    } );


    // Owner's Albums

	app.get( '/genericUri/facebook/owneralbums', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/falbums" }
		);
	} );
	app.get( '/sampleUri/facebook/owneralbums', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/falbums' 
			} );
		}
	} );

    app.get( '/genericOutput/facebook/owneralbums', function( req, res ) {
        res.json(
            {
                "id" : "{Id  of the feed}",
                "from" : {
                    "id" : "{facebook numaric id of the sender}",
                    "name" : "{Name of the sender}"
                },
                "category" : "{album}",
                "name": "{Name of the album}",
                "picture" : "{Uri of the profile pic of the sender}",
                "link" : "{Link ofthe album}",
                "icon" : "{uri of the icon}",
                "cover_photo" : "{Id of the cover photo}",
                "count" : "{No of items in the album}",
                "type" : "{ mobile/cover etc..}",
                "can_upload" : "{}",
                "appData": {
                    "serviceName":"Facebook",
                    "serviceImgUrl":"/images/512x512-logos/facebook.png",
                    "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                },
                "privacy" : "{everyone}",
                "created_time" : "{Timestamp when the status update is created}",
                "updated_time" : "{Timestamp when the status updated}",
                "itemType" : "{FacebookAlbum}"
            }
        );
    } );
	// Owner's Notes

	app.get( '/genericUri/facebook/ownernotes', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fnotes" }
		);
	} );
	app.get( '/sampleUri/facebook/ownernotes', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fnotes' 
			} );
		}
	} );

	// Owner's Videos

	app.get( '/genericUri/facebook/ownervideos', function( req, res ) {
		res.json( 
			{ "uri": "apinetwork://{owner}//@acct:facebook:{accountID}/fvideos" }
		);
	} );
	app.get( '/sampleUri/facebook/ownervideos', function( req, res ) {
		var tokens = req.getAuthTokens( 'facebook' );
		if( !tokens )
			res.send( 401 );
		else
		{
			var userId = tokens.owner.substring( 9 );
			res.json( { 
				"uri": 'apinetwork://' + tokens.owner + '//@acct:' + tokens.owner + '/fvideos' 
			} );
		}
	} );

    app.get( '/genericOutput/facebook/ownervideos', function( req, res ) {
        res.json(
            {
                "id" : "{Id  of the feed}",
                "from" : {
                    "id" : "{facebook numaric id of the sender}",
                    "name" : "{Name of the sender}"
                },
                "category" : "{video}",
                "name": "{Name of the video}",
                "tags" : {
                    "data" : [
                        {
                            "id" : "{Id of the tag } ",
                            "name" : "{Name on the tag}",
                            "created_time" : "{Time stamp when the tag is created}"
                        }
                    ]
                },
                "embed_html" : "{Embeded html content of the video}",
                "picture" : "{Uri of the profile pic of the sender}",
                "source " : "{Link of the video}",
                "icon" : "{uri of the icon}",
                "description" : "{Description of the video}",
                "format" : {
                    "embed_html" : "{embedded html }",
                    "width" : "{width}",
                    "height" : "{height}",
                    "filter" : "{resolution filter}",
                    "picture" : "cover picture of the video"
                },
                "appData": {
                    "serviceName":"Facebook",
                    "serviceImgUrl":"/images/512x512-logos/facebook.png",
                    "verified": "{True or false depending on if facebook believes the user is \"verified\"}"
                },
                "created_time" : "{Timestamp when the video  is created}",
                "updated_time" : "{Timestamp when the video updated}",
                "itemType" : "{FacebookVideo}"
            }
        );
    } );


};