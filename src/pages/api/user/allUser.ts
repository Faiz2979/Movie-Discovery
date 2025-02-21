import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

function getAllUser(req: NextApiRequest, res: NextApiResponse, username: string) {
    return prisma.user.findFirst({
        where:{
            username: username
        }
    });
}

export { getAllUser };
