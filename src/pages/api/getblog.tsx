import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { blogType } from "@/components/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { id } = req.query as { id: string };
        //-------------( GETS ALL BLOGS ) -------------//
        if (id) {
            try {

                const blog = await prisma.blog.findUnique({
                    where: {
                        id: parseInt(id) as number
                    }
                });
                if (blog) {
                    res.status(200).json(blog);
                } else {
                    res.status(400).json({ msg: "could not find blog" })
                }
            } catch (error) {
                res.status(400).json({ msg: "server issues" })
            } finally {
                return await prisma.$disconnect();
            }
        } else {

            try {
                const blogs = await prisma.blog.findMany({
                    where: { show: true },
                }) as unknown[] as blogType[];
                if (blogs) {
                    res.status(200).json(blogs);
                } else {
                    res.status(400).json({ msg: "could not get" })
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", `${msg}- ERROR HERE`)
                res.status(400).json({ message: msg })
            } finally {
                return await prisma.$disconnect();
            }
        }

    }
}

