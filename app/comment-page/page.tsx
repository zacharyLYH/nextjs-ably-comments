import { GetCommentAction } from "@/actions/getCommentAction";
import CommentMain from "@/component/comment-main";
import Link from "next/link";

export default async function CommentPage() {
    const prevComments = await GetCommentAction();
    return (
        <div>
            <Link href="/">
                <button>Navigate back</button>
            </Link>
            <CommentMain prevComments={prevComments} />
        </div>
    );
}
