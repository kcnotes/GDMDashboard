import { LoggedInResponse, LoggedOutResponse, ReportedPostsResponse } from '../api/discussions_interface';

export const fakeLoggedInResponse: LoggedInResponse = {
  userId: '38482372',
};

export const fakeLoggedOutResponse: LoggedOutResponse = {
  title: 'Unauthorized',
  instance: '/',
};

export const fakeReportedPostsResponse: ReportedPostsResponse = {
  _links: {
    first: [
      {
        href: 'https://community.fandom.com/wikia.php?controller=DiscussionModeration&method=getReportedPosts&canViewHiddenPosts=true&viewableOnly=false&page=0&canViewHiddenPostsInContainer=true',
      },
    ],
    last: [
      {
        href: 'https://community.fandom.com/wikia.php?controller=DiscussionModeration&method=getReportedPosts&canViewHiddenPosts=true&viewableOnly=false&page=2&canViewHiddenPostsInContainer=true',
      },
    ],
    next: [
      {
        href: 'https://community.fandom.com/wikia.php?controller=DiscussionModeration&method=getReportedPosts&canViewHiddenPosts=true&viewableOnly=false&page=1&canViewHiddenPostsInContainer=true',
      },
    ],
  },
  postCount: '24',
  readOnlyMode: false,
  _embedded: {
    count: [
      {
        ARTICLE_COMMENT: 2,
        FORUM: 14,
        WALL: 8,
        total: 24,
      },
    ],
    wallOwners: [
      {
        userId: '27855996',
        wallContainerId: '4400000000000228442',
      },
    ],
    'doc:posts': [
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010539441&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '45117243',
          avatarUrl:
            'https://static.wikia.nocookie.net/358aca41-3686-44e2-b6eb-b9e3660b9c80',
          name: 'HumansCanWinElves',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624337873,
        },
        creatorId: '45117243',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        id: '4400000000010539441',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: true,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m reporting that the OP asked to lock the discussion."}]}]}',
        latestRevisionId: '4400000000010887013',
        modificationDate: null,
        position: 38,
        rawContent: 'I\'m reporting that the OP asked to lock the discussion.',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '48883877',
          avatarUrl:
            'https://static.wikia.nocookie.net/1b65e794-ab7b-43d2-b7f8-469c0bff261f',
          name: 'BlockyBlockades',
          badgePermission: '',
        },
        threadId: '4400000000003186973',
        title: null,
        upvoteCount: 0,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '48883877',
              firstPost: {
                id: '4400000000010534207',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Honestly the rules in most wikis are EXTREMELY strict and can result in huge ban times for stupid things like posting a slightly offensive joke. Literally we can\'t say anything negative without getting hit by a month ban (and no I was not banned from many wikis, the rules just feel so stupid to me)."}]}]}',
                createdBy: {
                  id: '48883877',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/1b65e794-ab7b-43d2-b7f8-469c0bff261f',
                  name: 'BlockyBlockades',
                  badgePermission: '',
                },
                title:
                  'Unpopular opinion: The rules in most wikis are too strict',
                attachments: {
                  openGraphs: [],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003186973',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isLocked: false,
              isReported: true,
              postCount: '43',
              tags: [],
              title:
                'Unpopular opinion: The rules in most wikis are too strict',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624337873,
              },
              creatorId: '45117243',
              creatorIp: '',
              id: '4400000000010887013',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"I\'m reporting that the OP asked to lock the discussion."}]}]}',
              postId: 'null',
              rawContent:
                'I\'m reporting that the OP asked to lock the discussion.',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010538495&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '47836295',
          avatarUrl:
            'https://static.wikia.nocookie.net/a4edb5bc-8510-440b-9d9e-9e5fecf444f6',
          name: '23Aee',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624321212,
        },
        creatorId: '47836295',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        funnel: 'TEXT',
        id: '4400000000010538495',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Some of my Fandom friends created a wiki about a comic strip callled Texts from Mittens that\'s public with plenty of content and not a duplicate wiki. For no apparent reason, it got closed down!! Someone help"}]},{"type":"paragraph","content":[{"type":"text","text":"Here\'s the link: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki","title":null}}],"text":"https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki"}]},{"type":"paragraph","content":[{"type":"text","text":"Thanks."}]}]}',
        lastEditedBy: {
          id: '47836295',
          avatarUrl:
            'https://static.wikia.nocookie.net/a4edb5bc-8510-440b-9d9e-9e5fecf444f6',
          name: '23Aee',
          badgePermission: '',
        },
        latestRevisionId: '4400000000010885925',
        modificationDate: {
          nano: 0,
          epochSecond: 1624359685,
        },
        position: 1,
        rawContent:
          'Some of my Fandom friends created a wiki about a comic strip callled Texts from Mittens that\'s public with plenty of content and not a duplicate wiki. For no apparent reason, it got closed down!! Someone help\nHere\'s the link: https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki\nThanks.',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '47836295',
          avatarUrl:
            'https://static.wikia.nocookie.net/a4edb5bc-8510-440b-9d9e-9e5fecf444f6',
          name: '23Aee',
          badgePermission: '',
        },
        threadId: '4400000000003187562',
        title: 'ISSUE',
        upvoteCount: 1,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '47836295',
              firstPost: {
                id: '4400000000010538495',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Some of my Fandom friends created a wiki about a comic strip callled Texts from Mittens that\'s public with plenty of content and not a duplicate wiki. For no apparent reason, it got closed down!! Someone help"}]},{"type":"paragraph","content":[{"type":"text","text":"Here\'s the link: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki","title":null}}],"text":"https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki"}]},{"type":"paragraph","content":[{"type":"text","text":"Thanks."}]}]}',
                createdBy: {
                  id: '47836295',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/a4edb5bc-8510-440b-9d9e-9e5fecf444f6',
                  name: '23Aee',
                  badgePermission: '',
                },
                title: 'ISSUE',
                attachments: {
                  openGraphs: [],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003187562',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '4',
              tags: [],
              title: 'ISSUE',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624321231,
              },
              creatorId: '47836295',
              creatorIp: '',
              id: '4400000000010885925',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Some of my Fandom friends created a wiki about a comic strip callled Texts from Mittens that\'s public with plenty of content and not a duplicate wiki. For no apparent reason, it got closed down!! Someone help"}]},{"type":"paragraph","content":[{"type":"text","text":"Here\'s the link: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki","title":null}}],"text":"https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki"}]},{"type":"paragraph","content":[{"type":"text","text":"Thanks."}]}]}',
              postId: 'null',
              rawContent:
                'Some of my Fandom friends created a wiki about a comic strip callled Texts from Mittens that\'s public with plenty of content and not a duplicate wiki. For no apparent reason, it got closed down!! Someone help\nHere\'s the link: https://texts-from-mittens.fandom.com/wiki/Texts_from_Mittens_Wiki\nThanks.',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010536990&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '43715293',
          avatarUrl:
            'https://static.wikia.nocookie.net/c27fb67c-3c49-4f85-9e08-e5ee61a14026',
          name: 'Karthik10',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624300835,
        },
        creatorId: '43715293',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        id: '4400000000010536990',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: true,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Check the recently edited pages and revert them."}]}]}',
        latestRevisionId: '4400000000010884182',
        modificationDate: {
          nano: 0,
          epochSecond: 1624300838,
        },
        position: 5,
        rawContent: 'Check the recently edited pages and revert them.',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '48736366',
          avatarUrl:
            'https://static.wikia.nocookie.net/82eec3ac-5247-4444-9ef0-e843dc9ae942',
          name: 'Fifaman',
          badgePermission: '',
        },
        threadId: '4400000000003187274',
        title: null,
        upvoteCount: 1,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '48736366',
              firstPost: {
                id: '4400000000010536733',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"How do I become a SOAP volunteer?"}]}]}',
                createdBy: {
                  id: '48736366',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/82eec3ac-5247-4444-9ef0-e843dc9ae942',
                  name: 'Fifaman',
                  badgePermission: '',
                },
                title: 'Become a volunteer',
                attachments: {
                  openGraphs: [],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003187274',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isLocked: false,
              isReported: true,
              postCount: '8',
              tags: [],
              title: 'Become a volunteer',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624300835,
              },
              creatorId: '43715293',
              creatorIp: '',
              id: '4400000000010884182',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Check the recently edited pages and revert them."}]}]}',
              postId: 'null',
              rawContent: 'Check the recently edited pages and revert them.',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010536733&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '48736366',
          avatarUrl:
            'https://static.wikia.nocookie.net/82eec3ac-5247-4444-9ef0-e843dc9ae942',
          name: 'Fifaman',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624297618,
        },
        creatorId: '48736366',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        funnel: 'TEXT',
        id: '4400000000010536733',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"How do I become a SOAP volunteer?"}]}]}',
        latestRevisionId: '4400000000010883882',
        modificationDate: {
          nano: 0,
          epochSecond: 1624359484,
        },
        position: 1,
        rawContent: 'How do I become a SOAP volunteer?',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '48736366',
          avatarUrl:
            'https://static.wikia.nocookie.net/82eec3ac-5247-4444-9ef0-e843dc9ae942',
          name: 'Fifaman',
          badgePermission: '',
        },
        threadId: '4400000000003187274',
        title: 'Become a volunteer',
        upvoteCount: 1,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '48736366',
              firstPost: {
                id: '4400000000010536733',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"How do I become a SOAP volunteer?"}]}]}',
                createdBy: {
                  id: '48736366',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/82eec3ac-5247-4444-9ef0-e843dc9ae942',
                  name: 'Fifaman',
                  badgePermission: '',
                },
                title: 'Become a volunteer',
                attachments: {
                  openGraphs: [],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003187274',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '8',
              tags: [],
              title: 'Become a volunteer',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624297618,
              },
              creatorId: '48736366',
              creatorIp: '',
              id: '4400000000010883882',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"How do I become a SOAP volunteer?"}]}]}',
              postId: 'null',
              rawContent: 'How do I become a SOAP volunteer?',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010534720&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '26053752',
          avatarUrl:
            'https://static.wikia.nocookie.net/0e4f3981-9fec-4575-bda0-9ca44431a481',
          name: 'Asddddd6',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624277000,
        },
        creatorId: '26053752',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        funnel: 'TEXT',
        id: '4400000000010534720',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hi, what do I do if someone has created a duplicate wiki of the one I\'m working on instead of joining and helping with mine. "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"My wiki: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home","title":null}}],"text":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home"}]},{"type":"openGraph","attrs":{"url":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home","wasAddedWithInlineLink":true,"id":0}},{"type":"paragraph","content":[{"type":"text","text":"His wiki: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki","title":null}}],"text":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki"}]},{"type":"openGraph","attrs":{"url":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki","wasAddedWithInlineLink":true,"id":1}},{"type":"paragraph"}]}',
        latestRevisionId: '4400000000010881599',
        modificationDate: {
          nano: 0,
          epochSecond: 1624359761,
        },
        position: 1,
        rawContent:
          'Hi, what do I do if someone has created a duplicate wiki of the one I\'m working on instead of joining and helping with mine. \nMy wiki: https://middle-earthcinematicuniverse.fandom.com/wiki/Home\nHis wiki: https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki\n',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '26053752',
          avatarUrl:
            'https://static.wikia.nocookie.net/0e4f3981-9fec-4575-bda0-9ca44431a481',
          name: 'Asddddd6',
          badgePermission: '',
        },
        threadId: '4400000000003187022',
        title: 'Duplicate Wiki',
        upvoteCount: 1,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [
                {
                  id: '4400000000000102521',
                  postRevisionId: 4400000000010881500,
                  siteId: 177,
                  url: 'https://middle-earthcinematicuniverse.fandom.com/wiki/Home',
                  siteName: '@getfandom',
                  title: 'Middle-earth Cinematic Universe wiki',
                  type: 'website',
                  imageUrl:
                    'https://static.wikia.nocookie.net/8ca0bd77-833f-43c6-8ca7-a6251a72cecb',
                  description:
                    'The Middle-earth Cinematic Universe is an unofficial name for the universe of the Tolkien films and media connected to and/or related to the films. It includes the six Peter Jackson films as well as the new Amazon TV series coming soon (#LOTRonPrime). This wiki also covers the Shadow of Mordor game series and other games produced by Warner Bros. 1 NEWS! 2 The Lord of the Rings: The Fellowship of the Ring 3 The Lord of the Rings: The Two Towers 4 The Lord of the Rings: The Return of the King 5 Th',
                  originalUrl: null,
                  videoUrl: null,
                  videoSecureUrl: null,
                  videoType: null,
                  videoHeight: null,
                  videoWidth: null,
                  imageHeight: 200,
                  imageWidth: 200,
                  dateRetrieved: {
                    nano: 0,
                    epochSecond: 1624277000,
                  },
                },
                {
                  id: '4400000000000102522',
                  postRevisionId: 4400000000010881500,
                  siteId: 177,
                  url: 'https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki',
                  siteName: '@getfandom',
                  title: 'The Middle Earth Cinematic Universe Wiki',
                  type: 'website',
                  imageUrl:
                    'https://static.wikia.nocookie.net/6339813b-9771-4979-8929-245a76467188',
                  description:
                    'We\'re a collaborative community website about The Middle Earth Cinematic Universe, encompassing the six live-action movies produced by WingNut films and the upcoming prequel TV series, produced by Amazon Studios, in their narrative order. It is a wiki that anyone, including you, can build and expand. Wikis like this one depend on readers getting involved and adding content. Click the "ADD NEW PAGE" or "EDIT" button at the top of any page to get started! 1 Important articles 1.1 The Lord of the R',
                  originalUrl: null,
                  videoUrl: null,
                  videoSecureUrl: null,
                  videoType: null,
                  videoHeight: null,
                  videoWidth: null,
                  imageHeight: 200,
                  imageWidth: 200,
                  dateRetrieved: {
                    nano: 0,
                    epochSecond: 1624277000,
                  },
                },
              ],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '26053752',
              firstPost: {
                id: '4400000000010534720',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hi, what do I do if someone has created a duplicate wiki of the one I\'m working on instead of joining and helping with mine. "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"My wiki: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home","title":null}}],"text":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home"}]},{"type":"openGraph","attrs":{"url":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home","wasAddedWithInlineLink":true,"id":0}},{"type":"paragraph","content":[{"type":"text","text":"His wiki: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki","title":null}}],"text":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki"}]},{"type":"openGraph","attrs":{"url":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki","wasAddedWithInlineLink":true,"id":1}},{"type":"paragraph"}]}',
                createdBy: {
                  id: '26053752',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/0e4f3981-9fec-4575-bda0-9ca44431a481',
                  name: 'Asddddd6',
                  badgePermission: '',
                },
                title: 'Duplicate Wiki',
                attachments: {
                  openGraphs: [
                    {
                      id: '4400000000000102521',
                      postRevisionId: 4400000000010881500,
                      siteId: 177,
                      url: 'https://middle-earthcinematicuniverse.fandom.com/wiki/Home',
                      siteName: '@getfandom',
                      title: 'Middle-earth Cinematic Universe wiki',
                      type: 'website',
                      imageUrl:
                        'https://static.wikia.nocookie.net/8ca0bd77-833f-43c6-8ca7-a6251a72cecb',
                      description:
                        'The Middle-earth Cinematic Universe is an unofficial name for the universe of the Tolkien films and media connected to and/or related to the films. It includes the six Peter Jackson films as well as the new Amazon TV series coming soon (#LOTRonPrime). This wiki also covers the Shadow of Mordor game series and other games produced by Warner Bros. 1 NEWS! 2 The Lord of the Rings: The Fellowship of the Ring 3 The Lord of the Rings: The Two Towers 4 The Lord of the Rings: The Return of the King 5 Th',
                      originalUrl: null,
                      videoUrl: null,
                      videoSecureUrl: null,
                      videoType: null,
                      videoHeight: null,
                      videoWidth: null,
                      imageHeight: 200,
                      imageWidth: 200,
                      dateRetrieved: {
                        nano: 0,
                        epochSecond: 1624277000,
                      },
                    },
                    {
                      id: '4400000000000102522',
                      postRevisionId: 4400000000010881500,
                      siteId: 177,
                      url: 'https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki',
                      siteName: '@getfandom',
                      title: 'The Middle Earth Cinematic Universe Wiki',
                      type: 'website',
                      imageUrl:
                        'https://static.wikia.nocookie.net/6339813b-9771-4979-8929-245a76467188',
                      description:
                        'We\'re a collaborative community website about The Middle Earth Cinematic Universe, encompassing the six live-action movies produced by WingNut films and the upcoming prequel TV series, produced by Amazon Studios, in their narrative order. It is a wiki that anyone, including you, can build and expand. Wikis like this one depend on readers getting involved and adding content. Click the "ADD NEW PAGE" or "EDIT" button at the top of any page to get started! 1 Important articles 1.1 The Lord of the R',
                      originalUrl: null,
                      videoUrl: null,
                      videoSecureUrl: null,
                      videoType: null,
                      videoHeight: null,
                      videoWidth: null,
                      imageHeight: 200,
                      imageWidth: 200,
                      dateRetrieved: {
                        nano: 0,
                        epochSecond: 1624277000,
                      },
                    },
                  ],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003187022',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '5',
              tags: [],
              title: 'Duplicate Wiki',
            },
          ],
          openGraph: [
            {
              dateRetrieved: {
                nano: 0,
                epochSecond: 1624277000,
              },
              description:
                'The Middle-earth Cinematic Universe is an unofficial name for the universe of the Tolkien films and media connected to and/or related to the films. It includes the six Peter Jackson films as well as the new Amazon TV series coming soon (#LOTRonPrime). This wiki also covers the Shadow of Mordor game series and other games produced by Warner Bros. 1 NEWS! 2 The Lord of the Rings: The Fellowship of the Ring 3 The Lord of the Rings: The Two Towers 4 The Lord of the Rings: The Return of the King 5 Th',
              id: '4400000000000102521',
              imageHeight: 200,
              imageUrl:
                'https://static.wikia.nocookie.net/8ca0bd77-833f-43c6-8ca7-a6251a72cecb',
              imageWidth: 200,
              originalUrl: null,
              postRevisionId: 4400000000010881500,
              siteId: 177,
              siteName: '@getfandom',
              title: 'Middle-earth Cinematic Universe wiki',
              type: 'website',
              url: 'https://middle-earthcinematicuniverse.fandom.com/wiki/Home',
              videoHeight: null,
              videoSecureUrl: null,
              videoType: null,
              videoUrl: null,
              videoWidth: null,
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624277000,
              },
              creatorId: '26053752',
              creatorIp: '',
              id: '4400000000010881599',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hi, what do I do if someone has created a duplicate wiki of the one I\'m working on instead of joining and helping with mine. "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"My wiki: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home","title":null}}],"text":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home"}]},{"type":"openGraph","attrs":{"url":"https://middle-earthcinematicuniverse.fandom.com/wiki/Home","wasAddedWithInlineLink":true,"id":0}},{"type":"paragraph","content":[{"type":"text","text":"His wiki: "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki","title":null}}],"text":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki"}]},{"type":"openGraph","attrs":{"url":"https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki","wasAddedWithInlineLink":true,"id":1}},{"type":"paragraph"}]}',
              postId: 'null',
              rawContent:
                'Hi, what do I do if someone has created a duplicate wiki of the one I\'m working on instead of joining and helping with mine. \nMy wiki: https://middle-earthcinematicuniverse.fandom.com/wiki/Home\nHis wiki: https://the-middle-earth-cinematic-universe.fandom.com/wiki/The_Middle_Earth_Cinematic_Universe_Wiki\n',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010533549&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '49190897',
          avatarUrl:
            'https://static.wikia.nocookie.net/8b8d8d14-7c8a-4135-971f-0c7cb341e99b',
          name: 'Faesa12',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624260185,
        },
        creatorId: '49190897',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        funnel: 'TEXT',
        id: '4400000000010533549',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Once again,for me everything is locked.  I am not blocked or global block."}]},{"type":"paragraph","content":[{"type":"text","text":"I was here for 2 weeks but everything is locked FANDOM Helpers,Users help."}]},{"type":"paragraph","content":[{"type":"text","text":"Proof that this happened:"}]},{"type":"image","attrs":{"id":0}},{"type":"image","attrs":{"id":1}},{"type":"image","attrs":{"id":2}},{"type":"paragraph","content":[{"type":"text","text":"It was on Sakura School Simulator Wiki."}]},{"type":"paragraph","content":[{"type":"text","text":"I might have sent the same pic,sorry!"}]}]}',
        latestRevisionId: '4400000000010880306',
        modificationDate: null,
        position: 1,
        rawContent:
          'Once again,for me everything is locked.  I am not blocked or global block.\nI was here for 2 weeks but everything is locked FANDOM Helpers,Users help.\nProof that this happened:\nIt was on Sakura School Simulator Wiki.\nI might have sent the same pic,sorry!',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '49190897',
          avatarUrl:
            'https://static.wikia.nocookie.net/8b8d8d14-7c8a-4135-971f-0c7cb341e99b',
          name: 'Faesa12',
          badgePermission: '',
        },
        threadId: '4400000000003186908',
        title: 'This again!',
        upvoteCount: 0,
        _embedded: {
          contentImages: [
            {
              height: 1200,
              id: 523398,
              mediaType: 'image/jpeg',
              position: 0,
              url: 'https://static.wikia.nocookie.net/dafe5c33-66a5-4971-822b-85abd5f313f4',
              width: 1920,
            },
            {
              height: 1200,
              id: 523399,
              mediaType: 'image/jpeg',
              position: 1,
              url: 'https://static.wikia.nocookie.net/dea0f260-ae4e-489d-b171-f12452e58097',
              width: 1920,
            },
            {
              height: 1200,
              id: 523400,
              mediaType: 'image/jpeg',
              position: 2,
              url: 'https://static.wikia.nocookie.net/230acf9a-58bc-4227-92d4-7c8e37ff693b',
              width: 1920,
            },
          ],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [
                {
                  id: 523398,
                  position: 0,
                  url: 'https://static.wikia.nocookie.net/dafe5c33-66a5-4971-822b-85abd5f313f4',
                  width: 1920,
                  height: 1200,
                  mediaType: 'image/jpeg',
                },
                {
                  id: 523399,
                  position: 1,
                  url: 'https://static.wikia.nocookie.net/dea0f260-ae4e-489d-b171-f12452e58097',
                  width: 1920,
                  height: 1200,
                  mediaType: 'image/jpeg',
                },
                {
                  id: 523400,
                  position: 2,
                  url: 'https://static.wikia.nocookie.net/230acf9a-58bc-4227-92d4-7c8e37ff693b',
                  width: 1920,
                  height: 1200,
                  mediaType: 'image/jpeg',
                },
              ],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '49190897',
              firstPost: {
                id: '4400000000010533549',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Once again,for me everything is locked.  I am not blocked or global block."}]},{"type":"paragraph","content":[{"type":"text","text":"I was here for 2 weeks but everything is locked FANDOM Helpers,Users help."}]},{"type":"paragraph","content":[{"type":"text","text":"Proof that this happened:"}]},{"type":"image","attrs":{"id":0}},{"type":"image","attrs":{"id":1}},{"type":"image","attrs":{"id":2}},{"type":"paragraph","content":[{"type":"text","text":"It was on Sakura School Simulator Wiki."}]},{"type":"paragraph","content":[{"type":"text","text":"I might have sent the same pic,sorry!"}]}]}',
                createdBy: {
                  id: '49190897',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/8b8d8d14-7c8a-4135-971f-0c7cb341e99b',
                  name: 'Faesa12',
                  badgePermission: '',
                },
                title: 'This again!',
                attachments: {
                  openGraphs: [],
                  contentImages: [
                    {
                      id: 523398,
                      position: 0,
                      url: 'https://static.wikia.nocookie.net/dafe5c33-66a5-4971-822b-85abd5f313f4',
                      width: 1920,
                      height: 1200,
                      mediaType: 'image/jpeg',
                    },
                    {
                      id: 523399,
                      position: 1,
                      url: 'https://static.wikia.nocookie.net/dea0f260-ae4e-489d-b171-f12452e58097',
                      width: 1920,
                      height: 1200,
                      mediaType: 'image/jpeg',
                    },
                    {
                      id: 523400,
                      position: 2,
                      url: 'https://static.wikia.nocookie.net/230acf9a-58bc-4227-92d4-7c8e37ff693b',
                      width: 1920,
                      height: 1200,
                      mediaType: 'image/jpeg',
                    },
                  ],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003186908',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '5',
              tags: [],
              title: 'This again!',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624260185,
              },
              creatorId: '49190897',
              creatorIp: '',
              id: '4400000000010880306',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Once again,for me everything is locked.  I am not blocked or global block."}]},{"type":"paragraph","content":[{"type":"text","text":"I was here for 2 weeks but everything is locked FANDOM Helpers,Users help."}]},{"type":"paragraph","content":[{"type":"text","text":"Proof that this happened:"}]},{"type":"image","attrs":{"id":0}},{"type":"image","attrs":{"id":1}},{"type":"image","attrs":{"id":2}},{"type":"paragraph","content":[{"type":"text","text":"It was on Sakura School Simulator Wiki."}]},{"type":"paragraph","content":[{"type":"text","text":"I might have sent the same pic,sorry!"}]}]}',
              postId: 'null',
              rawContent:
                'Once again,for me everything is locked.  I am not blocked or global block.\nI was here for 2 weeks but everything is locked FANDOM Helpers,Users help.\nProof that this happened:\nIt was on Sakura School Simulator Wiki.\nI might have sent the same pic,sorry!',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010532815&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '46228778',
          avatarUrl:
            'https://static.wikia.nocookie.net/945255c2-46b9-43e1-9b26-3143d970e51c',
          name: 'TheAnanymousMaster',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624244032,
        },
        creatorId: '46228778',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        funnel: 'TEXT',
        id: '4400000000010532815',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"I had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Here is the code for it, by the way:"}]},{"type":"code_block","content":[{"type":"text","text":"<div class=\\"hover expand\\" style=\\"box-shadow: 2px 2px #6F1212; background: linear-gradient(to bottom,#F28280,70%,#F12C28); color: #FFFFFF; margin: 10px 30px 5px 5px; border-radius: 2rem; text-align: center; min-height: 50px; text-shadow:0 3px 6px rgba(0.5,0,0,0), 0 3px 6px rgba(0.25,0,0,0); border:2.5px solid #C51D07; font-family:Arial, Helvetica, sans-serif;\\">\\n<div style=\\"margin: 0px 10px 0px 10px; font-size:1rem;\\">\\n{| border=0\\" style=\\"text-align:left\\" cellpadding=\\"0\\"\\n|width=\\"80\\"| <span style=\\"margin: 10px 10px 10px 10px;\\">[[File:nopeagain.png|thumb|100px]]</span>\\n|<span style=\\"font-size:1.25rem; color:#451E19; margin-left:30px\\">\'\'\'This page may contain inaccurate content.\'\'\'</span>\\n<span style=\\"margin-left:30px\\">This page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims.</span> {{#if:{{{1|}}}|<br />}}\\n<span style=\\"color: #039AC2; margin-left:30px\\">{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\'&nbsp;{{{1}}}}}</span><br />\\n<span style=\\"color:#7B1414; margin-left:30px\\"\\">  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'</span>\\n|}</div></div>"}]},{"type":"image","attrs":{"id":0}},{"type":"paragraph"},{"type":"paragraph"}]}',
        latestRevisionId: '4400000000010879481',
        modificationDate: null,
        position: 1,
        rawContent:
          'For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? \nI had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device.\nHere is the code for it, by the way:\n\n\n{| border=0" style="text-align:left" cellpadding="0"\n|width="80"| [[File:nopeagain.png|thumb|100px]]\n|\'\'\'This page may contain inaccurate content.\'\'\'\nThis page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims. {{#if:{{{1|}}}|}}\n{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\' {{{1}}}}}\n  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'\n|}\n',
        renderedContent:
          'For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? \nI had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device.\nHere is the code for it, by the way:\n\n\n{| border=0" style="text-align:left" cellpadding="0"\n|width="80"| [[File:nopeagain.png|thumb|100px]]\n|\'\'\'This page may contain inaccurate content.\'\'\'\nThis page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims. {{#if:{{{1|}}}|<br>}}\n{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\'&nbsp;{{{1}}}}}<br>\n  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'\n|}\n',
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '46228778',
          avatarUrl:
            'https://static.wikia.nocookie.net/945255c2-46b9-43e1-9b26-3143d970e51c',
          name: 'TheAnanymousMaster',
          badgePermission: '',
        },
        threadId: '4400000000003186796',
        title: 'Something won\'t work.',
        upvoteCount: 0,
        _embedded: {
          contentImages: [
            {
              height: 408,
              id: 523280,
              mediaType: 'image/png',
              position: 0,
              url: 'https://static.wikia.nocookie.net/66c165dd-1a71-4438-a92d-bc5f6d6e6d0d',
              width: 1604,
            },
          ],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [
                {
                  id: 523280,
                  position: 0,
                  url: 'https://static.wikia.nocookie.net/66c165dd-1a71-4438-a92d-bc5f6d6e6d0d',
                  width: 1604,
                  height: 408,
                  mediaType: 'image/png',
                },
              ],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '46228778',
              firstPost: {
                id: '4400000000010532815',
                renderedContent:
                  'For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? \nI had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device.\nHere is the code for it, by the way:\n\n\n{| border=0" style="text-align:left" cellpadding="0"\n|width="80"| [[File:nopeagain.png|thumb|100px]]\n|\'\'\'This page may contain inaccurate content.\'\'\'\nThis page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims. {{#if:{{{1|}}}|<br>}}\n{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\'&nbsp;{{{1}}}}}<br>\n  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'\n|}\n',
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"I had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Here is the code for it, by the way:"}]},{"type":"code_block","content":[{"type":"text","text":"<div class=\\"hover expand\\" style=\\"box-shadow: 2px 2px #6F1212; background: linear-gradient(to bottom,#F28280,70%,#F12C28); color: #FFFFFF; margin: 10px 30px 5px 5px; border-radius: 2rem; text-align: center; min-height: 50px; text-shadow:0 3px 6px rgba(0.5,0,0,0), 0 3px 6px rgba(0.25,0,0,0); border:2.5px solid #C51D07; font-family:Arial, Helvetica, sans-serif;\\">\\n<div style=\\"margin: 0px 10px 0px 10px; font-size:1rem;\\">\\n{| border=0\\" style=\\"text-align:left\\" cellpadding=\\"0\\"\\n|width=\\"80\\"| <span style=\\"margin: 10px 10px 10px 10px;\\">[[File:nopeagain.png|thumb|100px]]</span>\\n|<span style=\\"font-size:1.25rem; color:#451E19; margin-left:30px\\">\'\'\'This page may contain inaccurate content.\'\'\'</span>\\n<span style=\\"margin-left:30px\\">This page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims.</span> {{#if:{{{1|}}}|<br />}}\\n<span style=\\"color: #039AC2; margin-left:30px\\">{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\'&nbsp;{{{1}}}}}</span><br />\\n<span style=\\"color:#7B1414; margin-left:30px\\"\\">  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'</span>\\n|}</div></div>"}]},{"type":"image","attrs":{"id":0}},{"type":"paragraph"},{"type":"paragraph"}]}',
                createdBy: {
                  id: '46228778',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/945255c2-46b9-43e1-9b26-3143d970e51c',
                  name: 'TheAnanymousMaster',
                  badgePermission: '',
                },
                title: 'Something won\'t work.',
                attachments: {
                  openGraphs: [],
                  contentImages: [
                    {
                      id: 523280,
                      position: 0,
                      url: 'https://static.wikia.nocookie.net/66c165dd-1a71-4438-a92d-bc5f6d6e6d0d',
                      width: 1604,
                      height: 408,
                      mediaType: 'image/png',
                    },
                  ],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003186796',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '5',
              tags: [],
              title: 'Something won\'t work.',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624244032,
              },
              creatorId: '46228778',
              creatorIp: '',
              id: '4400000000010879481',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? "}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"I had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Here is the code for it, by the way:"}]},{"type":"code_block","content":[{"type":"text","text":"<div class=\\"hover expand\\" style=\\"box-shadow: 2px 2px #6F1212; background: linear-gradient(to bottom,#F28280,70%,#F12C28); color: #FFFFFF; margin: 10px 30px 5px 5px; border-radius: 2rem; text-align: center; min-height: 50px; text-shadow:0 3px 6px rgba(0.5,0,0,0), 0 3px 6px rgba(0.25,0,0,0); border:2.5px solid #C51D07; font-family:Arial, Helvetica, sans-serif;\\">\\n<div style=\\"margin: 0px 10px 0px 10px; font-size:1rem;\\">\\n{| border=0\\" style=\\"text-align:left\\" cellpadding=\\"0\\"\\n|width=\\"80\\"| <span style=\\"margin: 10px 10px 10px 10px;\\">[[File:nopeagain.png|thumb|100px]]</span>\\n|<span style=\\"font-size:1.25rem; color:#451E19; margin-left:30px\\">\'\'\'This page may contain inaccurate content.\'\'\'</span>\\n<span style=\\"margin-left:30px\\">This page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims.</span> {{#if:{{{1|}}}|<br />}}\\n<span style=\\"color: #039AC2; margin-left:30px\\">{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\'&nbsp;{{{1}}}}}</span><br />\\n<span style=\\"color:#7B1414; margin-left:30px\\"\\">  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'</span>\\n|}</div></div>"}]},{"type":"image","attrs":{"id":0}},{"type":"paragraph"},{"type":"paragraph"}]}',
              postId: 'null',
              rawContent:
                'For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? \nI had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device.\nHere is the code for it, by the way:\n\n\n{| border=0" style="text-align:left" cellpadding="0"\n|width="80"| [[File:nopeagain.png|thumb|100px]]\n|\'\'\'This page may contain inaccurate content.\'\'\'\nThis page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims. {{#if:{{{1|}}}|}}\n{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\' {{{1}}}}}\n  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'\n|}\n',
              renderedContent:
                'For some reason, on this template I made, the margin for the text just doesn\'t work when it goes to a new line? \nI had a temporary solution which was to apply the margins multiple times to specific parts of the text, but this flopped as it appeared different depending on your device.\nHere is the code for it, by the way:\n\n\n{| border=0" style="text-align:left" cellpadding="0"\n|width="80"| [[File:nopeagain.png|thumb|100px]]\n|\'\'\'This page may contain inaccurate content.\'\'\'\nThis page may contain inaccurate content, and is to be fact checked, or given references to validate certain claims. {{#if:{{{1|}}}|<br>}}\n{{#if:{{{1|}}}|\'\'\'What Needs Citations:\'\'\'&nbsp;{{{1}}}}}<br>\n  \'\'\'\'\'Please add sources when fact checking the page.\'\'\'\'\'\n|}\n',
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010532663&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '48297235',
          avatarUrl:
            'https://static.wikia.nocookie.net/6c69c308-c33e-447d-b7ee-5ab13ffb7c76',
          name: 'Dill Borland',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624240974,
        },
        creatorId: '48297235',
        creatorIp: '',
        forumId: '2651617279082498996',
        forumName: 'Support Requests - Getting Technical',
        funnel: 'TEXT',
        id: '4400000000010532663',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"I am merging two wiki\'s together and waiting to use Dangerverse "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://dangerverse.fandom.com/","title":null}}],"text":"https://dangerverse.fandom.com/"},{"type":"text","text":" but the url is taken, am I allowed to edit then request to adopt it? I already reached out to our wiki manager but want to see if that is possible first. Wiki seems to not have been active in years. "}]},{"type":"openGraph","attrs":{"id":0,"url":"https://dangerverse.fandom.com/","wasAddedWithInlineLink":true}},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"A url with a dash was mistakenly created by one of our other users on Danger Force Wiki, so we may have to go with that if worse comes to worse. "}]}]}',
        latestRevisionId: '4400000000010879321',
        modificationDate: null,
        position: 1,
        rawContent:
          'I am merging two wiki\'s together and waiting to use Dangerverse https://dangerverse.fandom.com/ but the url is taken, am I allowed to edit then request to adopt it? I already reached out to our wiki manager but want to see if that is possible first. Wiki seems to not have been active in years. \nA url with a dash was mistakenly created by one of our other users on Danger Force Wiki, so we may have to go with that if worse comes to worse. ',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '48297235',
          avatarUrl:
            'https://static.wikia.nocookie.net/6c69c308-c33e-447d-b7ee-5ab13ffb7c76',
          name: 'Dill Borland',
          badgePermission: '',
        },
        threadId: '4400000000003186760',
        title: 'Url adoption ',
        upvoteCount: 0,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [
                {
                  id: '4400000000000102470',
                  postRevisionId: 4400000000010879500,
                  siteId: 177,
                  url: 'https://dangerverse.fandom.com/wiki/Dangerverse_Wiki',
                  siteName: '@getfandom',
                  title: 'Dangerverse Wiki',
                  type: 'website',
                  imageUrl:
                    'https://static.wikia.nocookie.net/f3aea108-2961-43ab-8a4a-001bdeac885c',
                  description:
                    '1 Welcome! 2 The Dangerverse 2.1 Simulcast 2.2 Side stories 2.2.1 A Dangerverse Datebook 2.3 Alternate Universes 2.4 Dangerverse Crossovers 2.5 Fan-fiction-ception 3 Valentina Jett originals 4 Returnverse 5 Sealverse 6 Be Careful 7 Latest activity The Dangerverse is the Alternate Universe written by Anne B. Walsh, based on the Harry Potter series by JK Rowling, and consists of five main stories: Living with Danger Living without Danger Dealing with Danger Facing Danger Surpassing Danger These st',
                  originalUrl: null,
                  videoUrl: null,
                  videoSecureUrl: null,
                  videoType: null,
                  videoHeight: null,
                  videoWidth: null,
                  imageHeight: 200,
                  imageWidth: 200,
                  dateRetrieved: {
                    nano: 0,
                    epochSecond: 1624240974,
                  },
                },
              ],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '2651617279082498996',
              containerType: 'FORUM',
              creatorId: '48297235',
              firstPost: {
                id: '4400000000010532663',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"I am merging two wiki\'s together and waiting to use Dangerverse "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://dangerverse.fandom.com/","title":null}}],"text":"https://dangerverse.fandom.com/"},{"type":"text","text":" but the url is taken, am I allowed to edit then request to adopt it? I already reached out to our wiki manager but want to see if that is possible first. Wiki seems to not have been active in years. "}]},{"type":"openGraph","attrs":{"id":0,"url":"https://dangerverse.fandom.com/","wasAddedWithInlineLink":true}},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"A url with a dash was mistakenly created by one of our other users on Danger Force Wiki, so we may have to go with that if worse comes to worse. "}]}]}',
                createdBy: {
                  id: '48297235',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/6c69c308-c33e-447d-b7ee-5ab13ffb7c76',
                  name: 'Dill Borland',
                  badgePermission: '',
                },
                title: 'Url adoption ',
                attachments: {
                  openGraphs: [
                    {
                      id: '4400000000000102470',
                      postRevisionId: 4400000000010879500,
                      siteId: 177,
                      url: 'https://dangerverse.fandom.com/wiki/Dangerverse_Wiki',
                      siteName: '@getfandom',
                      title: 'Dangerverse Wiki',
                      type: 'website',
                      imageUrl:
                        'https://static.wikia.nocookie.net/f3aea108-2961-43ab-8a4a-001bdeac885c',
                      description:
                        '1 Welcome! 2 The Dangerverse 2.1 Simulcast 2.2 Side stories 2.2.1 A Dangerverse Datebook 2.3 Alternate Universes 2.4 Dangerverse Crossovers 2.5 Fan-fiction-ception 3 Valentina Jett originals 4 Returnverse 5 Sealverse 6 Be Careful 7 Latest activity The Dangerverse is the Alternate Universe written by Anne B. Walsh, based on the Harry Potter series by JK Rowling, and consists of five main stories: Living with Danger Living without Danger Dealing with Danger Facing Danger Surpassing Danger These st',
                      originalUrl: null,
                      videoUrl: null,
                      videoSecureUrl: null,
                      videoType: null,
                      videoHeight: null,
                      videoWidth: null,
                      imageHeight: 200,
                      imageWidth: 200,
                      dateRetrieved: {
                        nano: 0,
                        epochSecond: 1624240974,
                      },
                    },
                  ],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003186760',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '3',
              tags: [],
              title: 'Url adoption ',
            },
          ],
          openGraph: [
            {
              dateRetrieved: {
                nano: 0,
                epochSecond: 1624240974,
              },
              description:
                '1 Welcome! 2 The Dangerverse 2.1 Simulcast 2.2 Side stories 2.2.1 A Dangerverse Datebook 2.3 Alternate Universes 2.4 Dangerverse Crossovers 2.5 Fan-fiction-ception 3 Valentina Jett originals 4 Returnverse 5 Sealverse 6 Be Careful 7 Latest activity The Dangerverse is the Alternate Universe written by Anne B. Walsh, based on the Harry Potter series by JK Rowling, and consists of five main stories: Living with Danger Living without Danger Dealing with Danger Facing Danger Surpassing Danger These st',
              id: '4400000000000102470',
              imageHeight: 200,
              imageUrl:
                'https://static.wikia.nocookie.net/f3aea108-2961-43ab-8a4a-001bdeac885c',
              imageWidth: 200,
              originalUrl: null,
              postRevisionId: 4400000000010879500,
              siteId: 177,
              siteName: '@getfandom',
              title: 'Dangerverse Wiki',
              type: 'website',
              url: 'https://dangerverse.fandom.com/wiki/Dangerverse_Wiki',
              videoHeight: null,
              videoSecureUrl: null,
              videoType: null,
              videoUrl: null,
              videoWidth: null,
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624240974,
              },
              creatorId: '48297235',
              creatorIp: '',
              id: '4400000000010879321',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"I am merging two wiki\'s together and waiting to use Dangerverse "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://dangerverse.fandom.com/","title":null}}],"text":"https://dangerverse.fandom.com/"},{"type":"text","text":" but the url is taken, am I allowed to edit then request to adopt it? I already reached out to our wiki manager but want to see if that is possible first. Wiki seems to not have been active in years. "}]},{"type":"openGraph","attrs":{"id":0,"url":"https://dangerverse.fandom.com/","wasAddedWithInlineLink":true}},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"A url with a dash was mistakenly created by one of our other users on Danger Force Wiki, so we may have to go with that if worse comes to worse. "}]}]}',
              postId: 'null',
              rawContent:
                'I am merging two wiki\'s together and waiting to use Dangerverse https://dangerverse.fandom.com/ but the url is taken, am I allowed to edit then request to adopt it? I already reached out to our wiki manager but want to see if that is possible first. Wiki seems to not have been active in years. \nA url with a dash was mistakenly created by one of our other users on Danger Force Wiki, so we may have to go with that if worse comes to worse. ',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010531534&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '48436458',
          avatarUrl:
            'https://static.wikia.nocookie.net/0090fd5c-22c6-4797-8fe3-1d4989e4e9e8',
          name: 'TheOneAndOnlyBFBEraser',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624221113,
        },
        creatorId: '48436458',
        creatorIp: '',
        forumId: '177',
        forumName: 'General',
        funnel: 'TEXT',
        id: '4400000000010531534',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Someone on  a different wiki said that she cant create her common.css page"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Like the button for create source is not there "}]}]}',
        latestRevisionId: '4400000000010878040',
        modificationDate: null,
        position: 1,
        rawContent:
          'Someone on  a different wiki said that she cant create her common.css page\nLike the button for create source is not there ',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '48436458',
          avatarUrl:
            'https://static.wikia.nocookie.net/0090fd5c-22c6-4797-8fe3-1d4989e4e9e8',
          name: 'TheOneAndOnlyBFBEraser',
          badgePermission: '',
        },
        threadId: '4400000000003186565',
        title: 'CSS problem ',
        upvoteCount: 0,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '177',
              containerType: 'FORUM',
              creatorId: '48436458',
              firstPost: {
                id: '4400000000010531534',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Someone on  a different wiki said that she cant create her common.css page"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Like the button for create source is not there "}]}]}',
                createdBy: {
                  id: '48436458',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/0090fd5c-22c6-4797-8fe3-1d4989e4e9e8',
                  name: 'TheOneAndOnlyBFBEraser',
                  badgePermission: '',
                },
                title: 'CSS problem ',
                attachments: {
                  openGraphs: [],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003186565',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '1',
              tags: [],
              title: 'CSS problem ',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624221113,
              },
              creatorId: '48436458',
              creatorIp: '',
              id: '4400000000010878040',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Someone on  a different wiki said that she cant create her common.css page"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"Like the button for create source is not there "}]}]}',
              postId: 'null',
              rawContent:
                'Someone on  a different wiki said that she cant create her common.css page\nLike the button for create source is not there ',
              renderedContent: null,
            },
          ],
        },
      },
      {
        _links: {
          permalink: [
            {
              href: 'https://community.fandom.com/wikia.php?controller=DiscussionPermalink&method=getThreadByPostId&postId=4400000000010529222&viewableOnly=false',
            },
          ],
        },
        createdBy: {
          id: '49307959',
          avatarUrl:
            'https://static.wikia.nocookie.net/2226a0a5-2438-4e07-99c9-c97560dbbe2b',
          name: 'Giancarlo Lo Tito IIV',
          badgePermission: '',
        },
        creationDate: {
          nano: 0,
          epochSecond: 1624195335,
        },
        creatorId: '49307959',
        creatorIp: '',
        forumId: '4400000000000228442',
        forumName: 'KKDisney Message Wall',
        id: '4400000000010529222',
        isDeleted: false,
        isEditable: true,
        isLocked: false,
        isReply: false,
        isReported: true,
        jsonModel:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"You Can Block "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://inkagames-saw-games-fanon.fandom.com/wiki/User:Derpguy109","title":null}}],"text":"Derpguy109"},{"type":"text","text":" because edit much, you can block Derpguy109 please"}]}]}',
        latestRevisionId: '4400000000010875465',
        modificationDate: null,
        position: 1,
        rawContent:
          'You Can Block Derpguy109 because edit much, you can block Derpguy109 please',
        renderedContent: null,
        requesterId: '38482372',
        siteId: '177',
        threadCreatedBy: {
          id: '49307959',
          avatarUrl:
            'https://static.wikia.nocookie.net/2226a0a5-2438-4e07-99c9-c97560dbbe2b',
          name: 'Giancarlo Lo Tito IIV',
          badgePermission: '',
        },
        threadId: '4400000000003186252',
        title: 'DERPGUY109 IS COMING TO END',
        upvoteCount: 0,
        _embedded: {
          contentImages: [],
          userData: [
            {
              hasReported: false,
              hasUpvoted: false,
              permissions: [
                'canDelete',
                'canUndelete',
                'canModerate',
                'canLock',
                'canUnlock',
                'canMove',
                'canEdit',
              ],
            },
          ],
          attachments: [
            {
              atMentions: [],
              contentImages: [],
              openGraphs: [],
              polls: [],
              quizzes: [],
            },
          ],
          thread: [
            {
              containerId: '4400000000000228442',
              containerType: 'WALL',
              creatorId: '49307959',
              firstPost: {
                id: '4400000000010529222',
                renderedContent: null,
                jsonModel:
                  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"You Can Block "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://inkagames-saw-games-fanon.fandom.com/wiki/User:Derpguy109","title":null}}],"text":"Derpguy109"},{"type":"text","text":" because edit much, you can block Derpguy109 please"}]}]}',
                createdBy: {
                  id: '49307959',
                  avatarUrl:
                    'https://static.wikia.nocookie.net/2226a0a5-2438-4e07-99c9-c97560dbbe2b',
                  name: 'Giancarlo Lo Tito IIV',
                  badgePermission: '',
                },
                title: 'DERPGUY109 IS COMING TO END',
                attachments: {
                  openGraphs: [],
                  contentImages: [],
                  polls: [],
                  quizzes: [],
                  atMentions: [],
                },
                threadId: '4400000000003186252',
                createdByIp: null,
              },
              isDeleted: false,
              isEditable: true,
              isFollowed: false,
              isLocked: false,
              isReported: true,
              postCount: '1',
              tags: [],
              title: 'DERPGUY109 IS COMING TO END',
            },
          ],
          latestRevision: [
            {
              creationDate: {
                nano: 0,
                epochSecond: 1624195335,
              },
              creatorId: '49307959',
              creatorIp: '',
              id: '4400000000010875465',
              jsonModel:
                '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"You Can Block "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://inkagames-saw-games-fanon.fandom.com/wiki/User:Derpguy109","title":null}}],"text":"Derpguy109"},{"type":"text","text":" because edit much, you can block Derpguy109 please"}]}]}',
              postId: 'null',
              rawContent:
                'You Can Block Derpguy109 because edit much, you can block Derpguy109 please',
              renderedContent: null,
            },
          ],
        },
      },
    ],
    contributors: [
      {
        count: 0,
        userInfo: [
          {
            id: '3403151',
            avatarUrl:
              'https://vignette.wikia.nocookie.net/53e2bd81-cf0b-46fb-991c-d18f88572c64',
            name: '452',
            badgePermission: '',
          },
          {
            id: '3030984',
            avatarUrl:
              'https://vignette.wikia.nocookie.net/aea6c6f0-1ecb-4e45-928b-481246b71c1b',
            name: 'Eladkse',
            badgePermission: '',
          },
          {
            id: '1929113',
            avatarUrl:
              'https://static.wikia.nocookie.net/6513c6ce-75aa-4010-8416-5191d1f1cedb',
            name: 'TyA',
            badgePermission: '',
          },
          {
            id: '44203450',
            avatarUrl: null,
            name: 'Jkrosado0',
            badgePermission: '',
          },
          {
            id: '4577848',
            avatarUrl:
              'https://vignette.wikia.nocookie.net/254875a4-150e-4cb3-a7f0-92c7c66f4723',
            name: 'Omni314',
            badgePermission: '',
          },
          {
            id: '4705324',
            avatarUrl:
              'https://static.wikia.nocookie.net/567a24d9-22bc-4dc3-93a2-69f70299f3c6',
            name: 'Spongebob456',
            badgePermission: '',
          },
          {
            id: '4018164',
            avatarUrl:
              'https://vignette.wikia.nocookie.net/04b84dae-e9ca-4819-8001-723b9fb912cf',
            name: 'Penguin-Pal',
            badgePermission: '',
          },
          {
            id: '188432',
            avatarUrl:
              'https://static.wikia.nocookie.net/293f2426-1bda-4c86-89fa-942e775ccda9',
            name: 'CzechOut',
            badgePermission: 'badge:staff',
          },
          {
            id: '5275700',
            avatarUrl:
              'https://static.wikia.nocookie.net/1bf2278c-7973-4ab5-8965-6701d41e7a4a',
            name: 'BertH',
            badgePermission: '',
          },
          {
            id: '5392446',
            avatarUrl: null,
            name: 'Shadows60',
            badgePermission: '',
          },
        ],
      },
    ],
  },
};
