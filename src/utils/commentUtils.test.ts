import { ThreadOfComment } from "models/comments";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "./commentUtils";

describe("getComments", () => {
  it("should return an array of comments", async () => {
    const comments: ThreadOfComment[] = await getComments();

    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);

    // Validate the structure of each comment
    comments.forEach((comment: any) => {
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("body");
      expect(comment).toHaveProperty("username");
      expect(comment).toHaveProperty("userId");
      expect(comment).toHaveProperty("parentId");
      expect(comment).toHaveProperty("createdAt");
    });
  });
});

describe("createComment", () => {
  it("should create a parent comment without parentId if not provided", async () => {
    const text = "Test comment";

    const comment = await createComment(text, null, '2');

    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("body", text);
    expect(comment).toHaveProperty("parentId", null);
    expect(comment).toHaveProperty("userId", "1");
    expect(comment).toHaveProperty("username", "John");
    expect(comment).toHaveProperty("createdAt");
  });

  it("should create a child comment with the provided text and parentId", async () => {
    const text = "Test comment";
    const parentId = "12345";

    const comment = await createComment(text, parentId, '1');

    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("body", text);
    expect(comment).toHaveProperty("parentId", parentId);
    expect(comment).toHaveProperty("userId", "1");
    expect(comment).toHaveProperty("username", "John");
    expect(comment).toHaveProperty("createdAt");
  });
});

describe("updateComment", () => {
  it("should update a comment", async () => {
    const newText = "Updated comment";
    const deletedComment = await updateComment(newText);

    expect(deletedComment).toEqual({ text: newText });
  });
});

describe("deleteComment", () => {
  it("should delete a comment", async () => {
    const deletedComment = await deleteComment();

    expect(deletedComment).toEqual({});
  });
});
