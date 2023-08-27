"use client";

import CommentForm from "@/component/comment-form";
import CommentLister from "@/component/comment-lister";
// import { useChannel } from "@ably-labs/react-hooks";
import { useState } from "react";
// import { configureAbly } from "@ably-labs/react-hooks";

// configureAbly({
//     authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
// });

export interface CommentInterface {
    username: string;
    comment: string;
}

interface CommentMainProps {
    prevComments: CommentInterface[];
}

const CommentMain: React.FC<CommentMainProps> = ({ prevComments }) => {
    const [comments, setComments] = useState<CommentInterface[]>(
        prevComments || []
    );

    // const [channel] = useChannel("comment-channel", (message) => {
    //     // Add new incoming comment to the list of comments
    //     setComments((comments) => {
    //         return [...comments, message.data];
    //     });
    // });

    const submitComment = async (data: CommentInterface) => {
        try {
            await fetch(`/api/createComment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const username = data.username;
            const comment = data.comment;
            // channel.publish({
            //     name: "comment",
            //     data: {
            //         username,
            //         comment,
            //     },
            // });
        } catch (error) {
            console.error("An error occurred when creating a comment: ", error);
        }
    };
    return (
        <section>
            Comments ({comments.length})
            <CommentLister comments={comments} />
            <CommentForm submitter={submitComment} />
        </section>
    );
};

export default CommentMain;
