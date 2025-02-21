import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.SECRET || "";

interface JwtPayload {
    id: string;
    name: string;
    username: string;
}

const protectedRoutes = [
    "/dashboard",
    "/movies"
];

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (!protectedRoutes.some(route => path.startsWith(route))) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        verify(token, SECRET) as JwtPayload;
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard", "/movies"],
};
