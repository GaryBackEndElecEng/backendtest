import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, selectorType, element_selType, elementType, codeType, rowType, colType, chartType } from "@/components/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import "@aws-sdk/signature-v4-crt";
import { findCountKeys } from "@/lib/ultils/functions";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { id } = req.query as { id: string };
        //-------------( GETS ALL BLOGS ) -------------//
        if (id) {
            const blog = await prisma.blog.findUnique({
                where: {
                    id: parseInt(id) as number
                }
            });
            if (blog) {
                res.status(200).json(blog);
                return await prisma.$disconnect();
            } else {
                res.status(200).json({ msg: "could not find blog" })
            }
        } else {

            try {
                const blogs = await prisma.blog.findMany({
                    where: { show: true },
                }) as unknown[] as blogType[];
                // const blogsWithImgs = await getUserBlogsImgs(blogs);
                res.status(200).json(blogs)
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
                return await prisma.$disconnect();
            } finally {
                return await prisma.$disconnect();
            }
        }

    }
}

