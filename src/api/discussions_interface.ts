import { Tracing } from 'trace_events';

export interface LoggedInResponse {
  userId: string;
}

export interface LoggedOutResponse {
  title: string;
  instance: string;
}

export interface HalLinks {
  first: { href: string }[];
  last: { href: string }[];
  next: { href: string }[];
}

export interface ReportedPostsResponse {
  _links: HalLinks;
  postCount: string;
  readOnlyMode: boolean;
  _embedded: ReportedPostsEmbedded;
}

export interface ReportedPostsErrorResponse {
  status: number;
  error: string;
  details: string;
}

export interface PostResponse {
  id?: number;
  threadId?: number;
  title?: string;
  creatorId?: number;
  creationDate?: Date;
  _links: HalLinks;
  requesterId?: string;
  _embedded?: any;
}

export interface UserInfo {
  id: string;
  avatarUrl: string | null;
  name: string;
  badgePermission: string;
}

export interface Contributor {
  count: number;
  userInfo: UserInfo[];
}

export interface Count {
  ARTICLE_COMMENT: number;
  FORUM: number;
  WALL: number;
  total: number;
}

export interface WallOwner {
  userId: string;
  wallContainerId: string;
}

export interface Instant {
  nano: number;
  epochSecond: number;
}

export interface PermalinkLinks {
  permalink: { href: string }[];
}

export interface ReportedPostsEmbedded {
  count: Count[];
  wallOwners: WallOwner[];
  'doc:posts': DocPost[];
  contributors: Contributor[];
}

export interface ContentImage {
  id: number;
  position: number;
  url: string;
  width: number;
  height: number;
  mediaType: string;
}

export interface UserData {
  hasReported: boolean;
  hasUpvoted: boolean;
  permissions: string[];
}

export interface OpenGraph {
  id: string;
  postRevisionId: any;
  siteId: number;
  url: string;
  siteName: string;
  title: string;
  type: string;
  imageUrl: string;
  description: string;
  originalUrl?: any;
  videoUrl?: any;
  videoSecureUrl?: any;
  videoType?: any;
  videoHeight?: any;
  videoWidth?: any;
  imageHeight: number;
  imageWidth: number;
  dateRetrieved: Instant;
}

export interface DocPost {
  _links: PermalinkLinks;
  createdBy: UserInfo;
  creationDate: Instant;
  creatorId: string;
  creatorIp: string;
  forumId: string;
  forumName: string;
  id: string;
  isDeleted: boolean;
  isEditable: boolean;
  isLocked: boolean;
  isReply: boolean;
  isReported: boolean;
  jsonModel: string;
  latestRevisionId: string;
  modificationDate: Instant | null;
  position: number;
  rawContent: string;
  renderedContent: string | null;
  requesterId: string;
  siteId: string;
  threadCreatedBy: UserInfo;
  threadId: string;
  title: string | null;
  upvoteCount: number;
  _embedded: PostEmbedded;
  funnel?: string;
  lastEditedBy?: UserInfo;
}

export interface Attachments {
  atMentions: any[];
  contentImages: ContentImage[];
  openGraphs: OpenGraph[];
  polls: any[];
  quizzes: any[];
}

export interface ModeratorActionsResponse {
  days: number;
}

export interface LatestRevision {
  creationDate: Instant;
  creatorId: string;
  creatorIp: string;
  id: string;
  jsonModel: string;
  postId: string;
  rawContent: string;
  renderedContent: string | null;
}

export interface Thread {
  containerId: string;
  containerType: string;
  creatorId: string;
  firstPost: FirstPost;
  isDeleted: boolean;
  isEditable: boolean;
  isLocked: boolean;
  isReported: boolean;
  postCount: string;
  tags: any[];
  title: string;
  isFollowed?: boolean;
}

export interface FirstPost {
  id: string;
  renderedContent: string | null;
  jsonModel: string;
  createdBy: UserInfo;
  title: string;
  attachments: Attachments;
  threadId: string;
  createdByIp?: any;
}

export interface PostEmbedded {
  contentImages: ContentImage[];
  userData: UserData[];
  attachments: Attachments[];
  thread: Thread[];
  latestRevision: LatestRevision[];
  openGraph?: OpenGraph[];
}

export interface ModeratorActionsUsers {
  rank: number;
  userInfo: UserInfo;
  totalCount: number;
}

export interface ModeratorActionsResponse {
  days: number;
  users: ModeratorActionsUsers[];
}
