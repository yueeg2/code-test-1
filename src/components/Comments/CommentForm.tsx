import { useState } from "react";
import getUsername from "constants/users";

type CommentForm = {
  handleSubmit: (text: string, parentId: null | string) => void,
  submitLabel: string,
  currentUserId: string,
  hasCancelButton?: boolean,
  handleCancel: () => void
  initialText?: string,
}
export default function CommentForm({
  handleSubmit,
  submitLabel,
  currentUserId,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}: CommentForm) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSubmit(text, null);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder={getUsername(currentUserId) !== "" ? "Add a comment here" : "Please login first"}
        className="comment-form-textarea"
        value={text}
        disabled={getUsername(currentUserId) !== "" ? false : true}
        onChange={(e) => setText(e.target.value)}
      />

      <div>

        {hasCancelButton && (
          <button
            type="button"
            className="comment-form-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
        <button className="comment-form-button comment-form-submit-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

