import CommentForm from "./CommentForm";
import { getCommentTime } from "utils/commentTime"
import { ThreadOfComment } from "models/comments";
type AComment = {
  comment: ThreadOfComment,
  replies: any,
  setActiveComment: any,
  activeComment: null | { id: string, type: string },
  updateComment: (text: string, commentId: string) => void,
  deleteComment: (commentId: string) => void,
  addComment: (text: string, parentId: null | string) => void,
  parentId: null | string,
  currentUserId: string,
}
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}: AComment) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  //const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const timePassed: boolean = Date.now() - new Date(comment.createdAt).getTime() > fiveMinutes;
  const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div className="comment-time"><p style={{ fontSize: '13px', margin: 0 }}>{getCommentTime(comment.createdAt)}</p></div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            currentUserId={currentUserId}
            initialText={comment.body}
            handleSubmit={(text: string) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            currentUserId={currentUserId}
            handleSubmit={(text: string) => addComment(text, replyId)}
            handleCancel={function (): void {
              throw new Error("Function not implemented.");
            }} />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply: ThreadOfComment) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
