module.exports = function( app ) {
	app.get( '/genericUri/facebook/userprofile', function( req, res ) {
		res.json( 
			{ "uri": "ldengine://{owner}//@{account}/user/{user ID}" }
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
				"uri": 'ldengine://' + tokens.owner + '//@acct:' + tokens.owner + '/user/' + userId 
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
};