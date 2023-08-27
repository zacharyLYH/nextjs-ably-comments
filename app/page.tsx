import CommentMain from "@/component/comment-main";

async function getPreviousComments() {
    const res = await fetch("/api/getComments");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Home() {
    const prevComments = await getPreviousComments();
    return (
        <main>
            <CommentMain prevComments={prevComments} />
        </main>
    );
}
