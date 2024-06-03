export interface ThreadType {
  Id: string;
  content: string;
  image: ThreadImageType[];
  isEdited: boolean;
  createdAt: Date;
  threadId?: String;
  userId: string;
  isLiked: boolean;
  user: {
    Id: string;
    fullname: string;
  };
  likes: {
    Id: string;
    user: {
      Id: string;
      fullname: string;
    };
  }[];
  replies: {
    Id: string;
    threadId?: string;
    content: string;
    image: ThreadImageType;
    isEdited?: boolean;
    createdAt: Date;
    user: {
      Id: string;
      fullname: string;
    };
  }[];
}

export interface ThreadImageType {
  Id: string;
  url: string;
  threadId?: string;
  thread: ThreadType;
}

export interface Pagination {
  totalThread: number;
  totalPages: number;
  currentPage: string | number | string[];
  parsedPageSize: number;
}
