import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "utils/commentUtils";
import {
  CommentList,
  ThreadOfComment
} from "models/comments";

export default function Comments({ currentUserId }: { currentUserId: string }) {
  const [backendComments, setBackendComments] = useState<CommentList>([]);
  const [activeComment, setActiveComment] = useState<null | {
    id: '',
    type: ''
  }>(null);
  const rootComments = backendComments.filter(
    (backendComment: ThreadOfComment) => backendComment.parentId === null
  );
  const getReplies = (commentId: string) => backendComments
    .filter((backendComment: ThreadOfComment) => backendComment.parentId === commentId)
    .sort(
      (a: ThreadOfComment, b: ThreadOfComment) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  const addComment = (text: string, parentId: null | string) => {
    createCommentApi(text, parentId, currentUserId)
      .then((comment: ThreadOfComment) => {
        setBackendComments([comment, ...backendComments]);
        setActiveComment(null);
      });
  };
  const updateComment = (text: string, commentId: string) => {
    updateCommentApi(text)
      .then(() => {
        const updatedBackendComments = backendComments.map((backendComment: ThreadOfComment) => {
          if (backendComment.id === commentId) {
            return { ...backendComment, body: text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      });
  };
  const deleteComment = (commentId: string) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi()
        .then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment: ThreadOfComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
        });
    }
  };

  useEffect(() => {
    getCommentsApi()
      .then((data: CommentList) => {
        setBackendComments(data);
      });
  }, []);

  return (
    <div className="comments">
      <div className="comments-container">
        {rootComments.map((rootComment: ThreadOfComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            parentId={null} />
        ))}
      </div>
      <CommentForm
        submitLabel="Post"
        currentUserId={currentUserId}
        handleSubmit={addComment} handleCancel={function (): void {
          throw new Error("Function not implemented.");
        }} />
    </div>
  );
};

