import { Caching } from "@/actions/caching";
import Link from "next/link";

export default async function Home() {
    const resp = await fetch(
        "http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur",
        { next: { revalidate: 3 } }
    );
    const currTime = await resp.json();
    const resp2 = await Caching();
    const currTime2 = await resp2.json();
    return (
        <main>
            <p>This is the current time: {currTime.datetime}</p>
            <p>This is the current time2: {currTime2.datetime}</p>
            <Link href="/comment-page">
                <button className="bg-white text-black rounded-lg p-6 mb-2">
                    Navigate to comment
                </button>
            </Link>
            <p>Welcome to NextJS-Ably-Comments.</p>
        </main>
    );
}
