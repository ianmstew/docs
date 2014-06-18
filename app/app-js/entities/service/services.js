define(function (require) {
  var services;

  services = [{
    'serviceName': 'Facebook',
    'serviceKey': 'facebook',
    'endpoints': [{
      'endpointName': 'User Profile for {userID}',
      'endpointKey': 'userprofile'
    }, {
      'endpointName': 'User\'s friends list',
      'endpointKey': 'ownerfriends',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s news feed',
      'endpointKey': 'ownernews',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s status feed',
      'endpointKey': 'ownerstatus',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s created events',
      'endpointKey': 'ownerevents',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s group details',
      'endpointKey': 'ownergroups',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s likes',
      'endpointKey': 'ownerlikes',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'Links shared by user',
      'endpointKey': 'ownerlinks',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s photos',
      'endpointKey': 'ownerphotos',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'Posts shared by user',
      'endpointKey': 'ownerposts',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'Albums shared by user',
      'endpointKey': 'owneralbums',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s notes',
      'endpointKey': 'ownernotes',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }, {
      'endpointName': 'User\'s videos',
      'endpointKey': 'ownervideos',
      'disabledTitle': 'Our Apologies!',
      'disabledMessage':
          'Live demonstration of some Facebook features is currently disabled, ' +
          'pending approval from Facebook.'
    }]
  }, {
    'serviceName': 'Twitter',
    'serviceKey': 'twitter',
    'endpoints': [{
      'endpointName': 'User Profile for {userID}',
      'endpointKey': 'userprofile'
    }, {
      'endpointName': 'Status messages sent by {accountID}',
      'endpointKey': 'statussent'
    }, {
      'endpointName': 'List of users that {userID} is following.',
      'endpointKey': 'following'
    }, {
      'endpointName': 'List of users that {userID} has requested to follow.',
      'endpointKey': 'pendingfollowing'
    }, {
      'endpointName': 'Status messages that mention {accountID}.',
      'endpointKey': 'mentions'
    }, {
      'endpointName': 'List of users that follow {userID}.',
      'endpointKey': 'followers'
    }, {
      'endpointName': 'List of users that have requested to follow {userID}',
      'endpointKey': 'pendingfollowers'
    }, {
      'endpointName': 'Direct messages sent by {accountID}',
      'endpointKey': 'directsent'
    }, {
      'endpointName': 'Direct messages received by {accountID}',
      'endpointKey': 'directreceived'
    }]
  }, {
    'serviceName': 'Gmail',
    'serviceKey': 'gmail',
    'endpoints': [{
      'endpointName': 'User Profile for {userID}',
      'endpointKey': 'userprofile'
    }, {
      'endpointName': 'List of mailboxes in ownerID\'s account.',
      'endpointKey': 'mailboxes'
    }, {
      'endpointName': 'List of messages in mailbox named {mailboxName}, by URI',
      'endpointKey': 'boxindex'
    }, {
      'endpointName': 'Email message by gmail message ID',
      'endpointKey': 'messageGmailId'
    }, {
      'messageHeaderId': 
        'Email message in given mailbox according to its "message-id" SMTP header',
      'endpointName': 'Email message in given mailbox with server-assigned UID {msgID}',
      'endpointKey': 'messageServerId'
    }, {
      'endpointName': 'Email message in given mailbox according to its sequence number',
      'endpointKey': 'messageSequenceNumber'
    }]
  }, {
    'serviceName': 'IMAP',
    'serviceKey': 'imap',
    'endpoints': [{
      'endpointName': 'User Profile for {userID}',
      'endpointKey': 'userprofile'
    }, {
      'endpointName': 'List of mailboxes in ownerID\'s account.',
      'endpointKey': 'mailboxes'
    }, {
      'endpointName': 'List of messages in mailbox named {mailboxName}, by URI',
      'endpointKey': 'boxindex'
    }, {
      'messageHeaderId':
        'Email message in given mailbox according to its "message-id" SMTP header',
      'endpointName': 'Email message in given mailbox with server-assigned UID {msgID}',
      'endpointKey': 'messageServerId'
    }, {
      'endpointName': 'Email message in given mailbox according to its sequence number',
      'endpointKey': 'messageSequenceNumber'
    }]
  }];

  services.lookupServiceName = function (serviceKey) {
    var service = _.where(this, { serviceKey: serviceKey });
    return service.length && service[0].serviceName;
  };

  services.lookupEndpointName = function (serviceKey, endpointKey) {
    var service = _.where(this, { serviceKey: serviceKey }),
        endpoint = service.length && _.where(service[0].endpoints, { endpointKey: endpointKey });
    return endpoint.length && endpoint[0].endpointName;
  };

  services.isEndpointDisabled = function (serviceKey, endpointKey) {
    var service = _.where(this, { serviceKey: serviceKey }),
        endpoint = service.length && _.where(service[0].endpoints, { endpointKey: endpointKey });
    return endpoint.length && endpoint[0].disabledMessage;
  };

  services.clone = function () {
    var _services = _.clone(this);

    _.each(_services, function (service, idx) {
      var _service = _.clone(service),
          _endpoints = _.clone(_service.endpoints);

      _.each(_endpoints, function (endpoint, idx) {
        var _endpoint = _.clone(endpoint);
        _endpoints[idx] = _endpoint;
      });
      
      _service.endpoints = _endpoints;
      _services[idx] = _service;
    });
    return _services;
  };
  
  return services;
});
