var util = require( 'util' ),
	Passport = require( 'passport' ),
	dns = require('dns'),
	querystring = require( 'querystring' ),
	ImapConnection = require( 'imap' ).ImapConnection;

function ImapStrategy( app, imapConfig, verify ) {
	console.log( 'ImapStrategy constructor!' );
	var self = this;

	self.config = imapConfig;

	Passport.Strategy.call( this );

	this._verify = function( req, username, password, host, port, secured, done ) {
		var connectionData = {
			'username': username,
			'password': password,
			'host': host,
			'port': port,
			'secure': secured
		};

		if( host == null || host.length < 1 )
		{
			var queryString = querystring.stringify( {
					'failed': true,
					'message': 'Hostname must be provided.',
					'username': connectionData.username,
					'port': connectionData.port,
					'secure': connectionData.secure
				});
				done( { 
					'message': 'Hostname must be provided',
					'redirect': self.config.failureRedirectUrl + '?' + queryString,
				}, false );
		}
		else if( port == null || port.length < 1 || parseInt( port ) < 0 || parseInt( port ) > 65535 || isNaN( parseInt( port )) )
		{
			var queryString = querystring.stringify( {
					'failed': true,
					'message': 'Numerical port between 0 and 65535 must be provided.',
					'username': connectionData.username,
					'host': connectionData.host,
					'secure': connectionData.secure
				});
				done( { 
					'message': 'Numerical port must be provided',
					'redirect': self.config.failureRedirectUrl + '?' + queryString,
				}, false );
		}
		else 
		{
			dns.lookup( host, function( error, address, family ) 
			{
				if( error ) 
				{
					var queryString = querystring.stringify( {
						'failed': true,
						'message': 'DNS lookup failed for ' + host,
						'username': connectionData.username,
						'host': connectionData.host,
						'port': connectionData.port,
						'secure': connectionData.secure
					});
					done( { 
						'message': 'DNS lookup for IMAP server failed: ' + error,
						'redirect': self.config.failureRedirectUrl + '?' + queryString,
					}, false );
				}
				else
				{
					connectionData.owner = req.body.username.replace( /\./g, '&#46;' );
					self.testAuthentication( 
						connectionData.owner, connectionData, 
						function( error, success ) {
							if( error ) 
							{
								var queryString = querystring.stringify( {
									'failed': true,
									'message': 'Connection to IMAP server failed',
									'username': connectionData.username,
									'host': connectionData.host,
									'port': connectionData.port,
									'secure': connectionData.secure
								});
								done( { 
									'message': 'Connection to IMAP server failed: ' + error,
									'redirect': self.config.failureRedirectUrl + '?' + queryString,
								}, false );
							}
							else if( !success ) 
							{
								var queryString = querystring.stringify( {
									'failed': true,
									'message': 'Username or password was rejected',
									'username': connectionData.username,
									'host': connectionData.host,
									'port': connectionData.port,
									'secure': connectionData.secure
								});
								done( { 
									'message': 'Username or password was rejected',
									'redirect': self.config.failureRedirectUrl + '?' + queryString,
								}, false );

							}
							else
							{
								verify( req, connectionData, done );
							}
						}
					);
				}
			} );
		}
	};
}

util.inherits( ImapStrategy, Passport.Strategy );

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
ImapStrategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var username = lookup( req.body, 'username' ) || lookup( req.query, 'username' );
  var password = lookup( req.body, 'password' ) || lookup( req.query, 'password' );
  var server = lookup( req.body, 'server' ) || lookup( req.query, 'server' );
  var port = lookup( req.body, 'port' ) || lookup( req.query, 'port' );
  var secured = lookup( req.body, 'secured' ) || lookup( req.query, 'secured' );
  
  if (!username || !password) {
    return this.fail( 'Missing credentials' );
  }
  
  var self = this;
  
  function verified(err, user, info) {
    if (err) { 
      if( err.redirect )
        return self.redirect( err.redirect );
      else
        return self.error(err); 
    }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  
  this._verify(req, username, password, server, port, secured, verified);
  
  function lookup(obj, field) {
    if (!obj) { return null; }
    var chain = field.split(']').join('').split('[');
    for (var i = 0, len = chain.length; i < len; i++) {
      var prop = obj[chain[i]];
      if (typeof(prop) === 'undefined') { return null; }
      if (typeof(prop) !== 'object') { return prop; }
      obj = prop;
    }
    return null;
  }
}
ImapStrategy.prototype._createNewConnection = function( owner, account, callback ) {
	var self = this;

	// If we're logging in using a password, just do that.
	if( account.password )
	{
		var connection = new ImapConnection( account );
	    connection.connect( function( error ) {
	    	callback( error, connection );
	    });
	}
}
ImapStrategy.prototype.testAuthentication = function( owner, account, callback ) {
	var self = this;

	var timedout = false;
	var finished = false;
	setTimeout( function() {
		if( !finished )
		{
			timedout = true;
			callback( new Error( 'Connection timed out to: ' + account.host + ':' + account.port + ', secured=' + account.secured ));
		}
	}, 30000 );
	self._createNewConnection( owner, account, function( error, connection ) {
		if( !timedout )
		{
			finished = true;
			if( error )
			{
				if( error.code == 'AUTHENTICATIONFAILED' )
					callback( null, false );
				else
					callback( error, false );
			}
			else
			{
				if( connection )
				{
					connection.logout( function() {
						callback( null, true );
					} );
				}
				else
				{
					callback( null, false );
				}
			}
		}
		else
		{
			if( connection )
				connection.logout( function() {} );
		}
	});
}

exports.Strategy = ImapStrategy;