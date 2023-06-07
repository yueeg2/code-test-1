
export type ThreadOfComment = {
  "id": string,
  "body": string,
  "username": undefined | string,
  "userId": string,
  "parentId": null | string,
  "createdAt": string
}

export type CommentList = ThreadOfComment[];