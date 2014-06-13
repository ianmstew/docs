define(function (require) {
  var services;

  services = [{
    name: 'Facebook',
    service: 'facebook',
    endpoints: [{
      name: 'User Profile for {userID}',
      uriClass: 'userprofile'
    }, {
      name: 'User\'s friends list',
      uriClass: 'ownerfriends'
    }, {
      name: 'User\'s news feed',
      uriClass: 'ownernews'
    }, {
      name: 'User\'s status feed',
      uriClass: 'ownerstatus'
    }, {
      name: 'User\'s created events',
      uriClass: 'ownerevents'
    }, {
      name: 'User\'s group details',
      uriClass: 'ownergroups'
    }, {
      name: 'User\'s likes',
      uriClass: 'ownerlikes'
    }, {
      name: 'Links shared by user',
      uriClass: 'ownerlinks'
    }, {
      name: 'User\'s photos',
      uriClass: 'ownerphotos'
    }, {
      name: 'Posts shared by user',
      uriClass: 'ownerposts'
    }, {
      name: 'Albums shared by user',
      uriClass: 'owneralbums'
    }, {
      name: 'User\'s notes',
      uriClass: 'ownernotes'
    }, {
      name: 'User\'s videos',
      uriClass: 'ownervideos'
    }]
  }, {
    name: 'Twitter',
    service: 'twitter',
    endpoints: [{
      name: 'User Profile for {userID}',
      uriClass: 'userprofile'
    }, {
      name: 'Status messages sent by {accountID}',
      uriClass: 'statussent'
    }, {
      name: 'List of users that {userID} is following.',
      uriClass: 'following'
    }, {
      name: 'List of users that {userID} has requested to follow.',
      uriClass: 'pendingfollowing'
    }, {
      name: 'Status messages that mention {accountID}.',
      uriClass: 'mentions'
    }, {
      name: 'List of users that follow {userID}.',
      uriClass: 'followers'
    }, {
      name: 'List of users that have requested to follow {userID}',
      uriClass: 'pendingfollowers'
    }, {
      name: 'Direct messages sent by {accountID}',
      uriClass: 'directsent'
    }, {
      name: 'Direct messages received by {accountID}',
      uriClass: 'directreceived'
    }]
  }, {
    name: 'Gmail',
    service: 'gmail',
    endpoints: [{
      name: 'User Profile for {userID}',
      uriClass: 'userprofile'
    }, {
      name: 'List of mailboxes in ownerID\'s account.',
      uriClass: 'mailboxes'
    }, {
      name: 'List of messages in mailbox named {mailboxName}, by URI',
      uriClass: 'boxindex'
    }, {
      name: 'Email message by gmail message ID',
      uriClass: 'messageGmailId'
    }, {
    'messageHeaderId': 
        'Email message in given mailbox according to its "message-id" SMTP header',
      name: 'Email message in given mailbox with server-assigned UID {msgID}',
      uriClass: 'messageServerId'
    }, {
      name: 'Email message in given mailbox according to its sequence number',
      uriClass: 'messageSequenceNumber'
    }]
  }, {
    name: 'IMAP',
    service: 'imap',
    endpoints: [{
      name: 'User Profile for {userID}',
      uriClass: 'userprofile'
    }, {
      name: 'List of mailboxes in ownerID\'s account.',
      uriClass: 'mailboxes'
    }, {
      name: 'List of messages in mailbox named {mailboxName}, by URI',
      uriClass: 'boxindex'
    }, {
    'messageHeaderId':
        'Email message in given mailbox according to its "message-id" SMTP header',
      name: 'Email message in given mailbox with server-assigned UID {msgID}',
      uriClass: 'messageServerId'
    }, {
      name: 'Email message in given mailbox according to its sequence number',
      uriClass: 'messageSequenceNumber'
    }]
  }, {
    name: 'App.net',
    service: 'appnet',
    endpoints: [{
      name: 'Data Type 1',
      uriClass: 'datatype1'
    }, {
      name: 'Data Type 2',
      uriClass: 'datatype2'
    }, {
      name: 'Data Type 3',
      uriClass: 'datatype3'
    }]
  }];

  return services;
});

// lookupServiceName: function (service) {
//   return this[service] && this[service].name;
// },

// lookupEndpointName: function (service, uriClass) {
//   return this[service] && this[service].endpoints[uriClass];
// }
