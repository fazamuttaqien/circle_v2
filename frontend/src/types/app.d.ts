// =============================  GET  =============================
export interface IThread {
  Id?: string;
  userId?: string;
  threadId?: string;
  content: string;
  image?: IThreadImage[];
  isEdited?: boolean;
  createdAt: Date;
  isLiked?: boolean;
  user?: IUser;
  likes?: ILike[];
  replies?: IThread[];
}

export interface IFollow {
  Id?: string;
  followerId?: string;
  followingId?: string;
  followedAt?: Date;
  isFollow?: boolean;
  follower?: IUser;
  following?: IUser;
}

export interface IThreadImage {
  Id?: string;
  url?: string;
}

export interface IUser {
  Id?: string;
  username?: string;
  fullname?: string;
  email?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: ILike[];
  threads?: IThread[];
  follower?: IFollow[];
  following?: IFollow[];
}

export interface ILike {
  Id?: string;
  userId?: string;
  threadId?: string;
  user?: IUser;
  thread?: IThread;
}

// =============================  POST  =============================
interface ThreadPostType {
  content: string;
  image?: File[];
}

interface EditProfileType {
  fullname?: string;
  username?: string;
  bio?: string;
  avatar?: File;
  cover?: File;
}
