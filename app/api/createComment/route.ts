import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, comment } = body;
        const res = await prismadb.comment.create({
            data: {
                username,
                comment,
            },
        });
        return NextResponse.json(res);
    } catch (error) {
        console.log("CREATE_COMMENT_ERROR: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}
