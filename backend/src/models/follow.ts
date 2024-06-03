export interface FollowType {
  Id: string;
  followerId: string;
  followingId: string;
  followedAt: Date;
  isFollow: boolean | null;
  follower: {
    Id: string;
    fullname: string;
  };
  following: {
    Id: string;
    fullname: string;
  };
}
