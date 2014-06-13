define(function (require) {
  var services;

  services = {

    facebook: {
      name: 'Facebook',
      endpoints: {
        'userprofile': 'User Profile for {userID}',
        'ownerfriends': 'User\'s friends list',
        'ownernews': 'User\'s news feed',
        'ownerstatus': 'User\'s status feed',
        'ownerevents': 'User\'s created events',
        'ownergroups': 'User\'s group details',
        'ownerlikes': 'User\'s likes',
        'ownerlinks': 'Links shared by user',
        'ownerphotos': 'User\'s photos',
        'ownerposts': 'Posts shared by user',
        'owneralbums': 'Albums shared by user',
        'ownernotes': 'User\'s notes',
        'ownervideos': 'User\'s videos'
      }
    },

    twitter: {
      name: 'Twitter',
      endpoints: {
        'userprofile': 'User Profile for {userID}',
        'statussent': 'Status messages sent by {accountID}',
        'following': 'List of users that {userID} is following.',
        'pendingfollowing': 'List of users that {userID} has requested to follow.',
        'mentions': 'Status messages that mention {accountID}.',
        'followers': 'List of users that follow {userID}.',
        'pendingfollowers': 'List of users that have requested to follow {userID}',
        'directsent': 'Direct messages sent by {accountID}',
        'directreceived': 'Direct messages received by {accountID}'
      }
    },

    gmail: {
      name: 'Gmail',
      endpoints: {
        'userprofile': 'User Profile for {userID}',
        'mailboxes': 'List of mailboxes in ownerID\'s account.',
        'boxindex': 'List of messages in mailbox named {mailboxName}, by URI',
        'messageGmailId': 'Email message by gmail message ID',
        'messageHeaderId': 
            'Email message in given mailbox according to its "message-id" SMTP header',
        'messageServerId': 'Email message in given mailbox with server-assigned UID {msgID}',
        'messageSequenceNumber': 'Email message in given mailbox according to its sequence number'
      }
    },

    imap: {
      name: 'IMAP',
      endpoints: {
        'userprofile': 'User Profile for {userID}',
        'mailboxes': 'List of mailboxes in ownerID\'s account.',
        'boxindex': 'List of messages in mailbox named {mailboxName}, by URI',
        'messageHeaderId':
            'Email message in given mailbox according to its "message-id" SMTP header',
        'messageServerId': 'Email message in given mailbox with server-assigned UID {msgID}',
        'messageSequenceNumber': 'Email message in given mailbox according to its sequence number'
      }
    },

    appnet: {
      name: 'App.net',
      endpoints: {
        'datatype1': 'Data Type 1',
        'datatype2': 'Data Type 2',
        'datatype3': 'Data Type 3'
      }
    },

    lookupServiceName: function (service) {
      return this[service] && this[service].name;
    },

    lookupEndpointName: function (service, uriClass) {
      return this[service] && this[service].endpoints[uriClass];
    }
  };

  return services;
});
