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

};