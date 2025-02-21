import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import { getAllUser } from "./allUser";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    } else{
            const { username, password, name } = req.body;
            
            try{
                if (!username || !password || !name) {
                    return res.status(400).json({ error: 'Data are required' });
                }
                
                const alreadyExist = await getAllUser(req, res, username);

                if (alreadyExist) {
                    return res.status(400).json({ error: 'User already exist' });
                }

                const hashedPassword = bcrypt.hashSync(password, 10);
                const response = prisma.user.create({
                    data: {
                        name: name,
                        username: username,
                        password: hashedPassword,
                    }
                })
                const formattedResponse = {
                    id: (await response).id,
                    name: (await response).name,
                    username: (await response).username,
                }
                return res.status(200).json({
                message: 'User created successfully',
                data: formattedResponse
                });
            } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Something went wrong' });
            }
    }
}