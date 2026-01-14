
export enum MatchMode {
  DATE = 'Date',
  BFF = 'BFF',
  BIZZ = 'Bizz'
}

export interface Tweet {
  id: string;
  content: string;
  timestamp: string;
  likes: string;
  retweets: string;
}

export interface Profile {
  id: string;
  handle: string;
  name: string;
  tweets: Tweet[];
  avatar: string;
  vibeTags: string[];
  matchReason?: string;
  mode: MatchMode;
}

export interface UserVibe {
  keywords: string;
  noPolitics: boolean;
  noNSFW: boolean;
}
