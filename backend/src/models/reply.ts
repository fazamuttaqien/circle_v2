export interface ReplyType {
  Id?: string;
  threadId: string | null;
  content: string;
  image: {
    Id: string;
    url: string;
    threadId: string | null;
  }[];
  createdAt: Date;
  user: {
    Id: string;
    fullname: string;
  };
}
