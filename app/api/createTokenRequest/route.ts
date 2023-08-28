import { NextResponse } from "next/server";
import Ably from "ably/promises";

export async function GET() {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({
        clientId: "ably-blog-app",
    });
    return NextResponse.json(tokenRequestData);
}
