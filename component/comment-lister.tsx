"use client";

import { CommentInterface } from "./comment-main";

interface CommentListerProps {
    comments: CommentInterface[];
}

const CommentLister: React.FC<CommentListerProps> = ({ comments }) => {
    return (
        <div>
            Current commments:
            {comments.map((comment) => (
                <div
                    key={comment.comment + comment.username}
                    className="border-full rounded-lg"
                >
                    <h3>{comment.username}</h3>
                    <p>{comment.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentLister;
