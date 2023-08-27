"use client";

import { useState } from "react";
import { CommentInterface } from "./comment-main";

interface CommentFormInterface {
    submitter: (data: CommentInterface) => Promise<void>;
}

const CommentForm: React.FC<CommentFormInterface> = ({ submitter }) => {
    const [fullName, setFullName] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: CommentInterface = {
            username: fullName,
            comment: comment,
        };
        submitter(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fullName">Full Name: </label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="comment">Phone Number: </label>
                <input
                    type="tel"
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
