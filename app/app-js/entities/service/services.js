define(function (require) {
  var services;

  services = [{
    name: 'Facebook',
    key: 'facebook',
    endpoints: [{
      name: 'User Profile for {userID}',
      key: 'userprofile'
    }, {
      name: 'User\'s friends list',
      key: 'ownerfriends'
    }, {
      name: 'User\'s news feed',
      key: 'ownernews'
    }, {
      name: 'User\'s status feed',
      key: 'ownerstatus'
    }, {
      name: 'User\'s created events',
      key: 'ownerevents'
    }, {
      name: 'User\'s group details',
      key: 'ownergroups'
    }, {
      name: 'User\'s likes',
      key: 'ownerlikes'
    }, {
      name: 'Links shared by user',
      key: 'ownerlinks'
    }, {
      name: 'User\'s photos',
      key: 'ownerphotos'
    }, {
      name: 'Posts shared by user',
      key: 'ownerposts'
    }, {
      name: 'Albums shared by user',
      key: 'owneralbums'
    }, {
      name: 'User\'s notes',
      key: 'ownernotes'
    }, {
      name: 'User\'s videos',
      key: 'ownervideos'
    }]
  }, {
    name: 'Twitter',
    key: 'twitter',
    endpoints: [{
      name: 'User Profile for {userID}',
      key: 'userprofile'
    }, {
      name: 'Status messages sent by {accountID}',
      key: 'statussent'
    }, {
      name: 'List of users that {userID} is following.',
      key: 'following'
    }, {
      name: 'List of users that {userID} has requested to follow.',
      key: 'pendingfollowing'
    }, {
      name: 'Status messages that mention {accountID}.',
      key: 'mentions'
    }, {
      name: 'List of users that follow {userID}.',
      key: 'followers'
    }, {
      name: 'List of users that have requested to follow {userID}',
      key: 'pendingfollowers'
    }, {
      name: 'Direct messages sent by {accountID}',
      key: 'directsent'
    }, {
      name: 'Direct messages received by {accountID}',
      key: 'directreceived'
    }]
  }, {
    name: 'Gmail',
    key: 'gmail',
    endpoints: [{
      name: 'User Profile for {userID}',
      key: 'userprofile'
    }, {
      name: 'List of mailboxes in ownerID\'s account.',
      key: 'mailboxes'
    }, {
      name: 'List of messages in mailbox named {mailboxName}, by URI',
      key: 'boxindex'
    }, {
      name: 'Email message by gmail message ID',
      key: 'messageGmailId'
    }, {
    'messageHeaderId': 
        'Email message in given mailbox according to its "message-id" SMTP header',
      name: 'Email message in given mailbox with server-assigned UID {msgID}',
      key: 'messageServerId'
    }, {
      name: 'Email message in given mailbox according to its sequence number',
      key: 'messageSequenceNumber'
    }]
  }, {
    name: 'IMAP',
    key: 'imap',
    endpoints: [{
      name: 'User Profile for {userID}',
      key: 'userprofile'
    }, {
      name: 'List of mailboxes in ownerID\'s account.',
      key: 'mailboxes'
    }, {
      name: 'List of messages in mailbox named {mailboxName}, by URI',
      key: 'boxindex'
    }, {
    'messageHeaderId':
        'Email message in given mailbox according to its "message-id" SMTP header',
      name: 'Email message in given mailbox with server-assigned UID {msgID}',
      key: 'messageServerId'
    }, {
      name: 'Email message in given mailbox according to its sequence number',
      key: 'messageSequenceNumber'
    }]
  }, {
    name: 'App.net',
    key: 'appnet',
    endpoints: [{
      name: 'Data Type 1',
      key: 'datatype1'
    }, {
      name: 'Data Type 2',
      key: 'datatype2'
    }, {
      name: 'Data Type 3',
      key: 'datatype3'
    }]
  }];

  services.lookupServiceName = function (serviceKey) {
    var service = _.where(this, { key: serviceKey });
    return service.length && service[0].name;
  };

  services.lookupEndpointName = function (serviceKey, endpointKey) {
    var service = _.where(this, { key: serviceKey }),
        endpoint = service.length && _.where(service[0].endpoints, { key: endpointKey });
    return endpoint.length && endpoint[0].name;
  };

  return services;
});
