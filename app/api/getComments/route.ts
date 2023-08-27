import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export default async function GET() {
    console.log("HIT");
    try {
        const res = await prismadb.comment.findMany({});
        console.log(res || "No results");
        return NextResponse.json(res);
    } catch (error) {
        console.log("CREATE_COMMENT_ERROR: ", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}
