import prismadb from "@/lib/prismadb";

export const GetCommentAction = async () => {
    const res = await prismadb.comment.findMany({});
    return res;
};
