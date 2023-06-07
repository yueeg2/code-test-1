import { ThreadOfComment } from "../constants/comments";
import getUsername from "../constants/users";

export const getComments = async ():Promise<ThreadOfComment[]> => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Second comment",
      username: "Robert",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "Second child",
      username: "John",
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text: string, parentId: null | string, currentUserId: string) => {
  const username = getUsername(currentUserId);
  return {
    id: Math.random().toString(36).substring(2, 11),
    body: text,
    parentId: parentId ? parentId : null,
    userId: currentUserId,
    username: username,
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text: string) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
