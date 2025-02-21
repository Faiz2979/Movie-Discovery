
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();
const secret = process.env.SECRET as string;

export default async function handler( request: NextApiRequest, response: NextApiResponse ) {

    //authenticate user
    if( request.method !== 'POST' ) {
        return response.status(400).json({ message: 'Invalid method' });
    }

    const { username, password } = request.body;
    
    if( !username || !password ) {
        return response.status(400).json({ message: 'Invalid' });
    }

    const user = await prisma.user.findUnique({
        where: { 
            username,
        },
    })

    if( !user ) {
        return response.status(401).json({ message: 'Invalid credentials' });
    }
    const comparePassword= await bcrypt.compare(password, user.password);
    // if password incorect
    if( !comparePassword ) {
        return response.status(401).json({ message: 'Invalid credentials' });
    }

    const data = {
        id: user.id,
        name: user.name,
        username: user.username,    
    }

    
    // generate token
    const token = sign(data, secret, {
        expiresIn: '7d',
    });

    return response.status(200).json({ 
        message: 'Login Success',
        token: token,
    });
}