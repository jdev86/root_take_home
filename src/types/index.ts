export type User = { id: string; name: string };

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  createdDateTime: string;
  text: string;
};

export type Suggestion = {
  id: string;
  text: string;
  userId: string;
  createdDateTime: string;
  comments: Comment[];
};
