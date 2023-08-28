import Link from "next/link";

export default async function Home() {
    return (
        <main>
            <Link href="/comment-page">
                <button className="bg-white text-black rounded-lg p-6 mb-2">
                    Navigate to comment
                </button>
            </Link>
            <p>Welcome to NextJS-Ably-Comments.</p>
        </main>
    );
}
