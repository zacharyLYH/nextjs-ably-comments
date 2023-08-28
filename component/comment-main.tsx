"use client";

import CommentForm from "@/component/comment-form";
import CommentLister from "@/component/comment-lister";
import { useEffect, useState } from "react";
import { useAblyStore } from "@/lib/ablyStore"; // Update the import based on your file structure

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

    const initializeAbly = useAblyStore((state) => state.initialize);

    const closeAbly = useAblyStore((state) => state.close);

    const channel = useAblyStore((state) => state.channel);

    useEffect(() => {
        initializeAbly();
        return () => {
            closeAbly(); // Close the Ably connection when the component unmounts
        };
    }, []);

    useEffect(() => {
        if (channel) {
            channel.subscribe("comment", (message) => {
                setComments((prevComments) => [...prevComments, message.data]);
            });
        }
    }, [channel]);

    const submitComment = async (data: CommentInterface) => {
        try {
            await fetch(`/api/createComment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (channel) {
                channel.publish({
                    name: "comment",
                    data,
                });
            }
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
