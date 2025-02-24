import type React from "react";

interface AuthLayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: "Login | Movie Discovery",
    description: "Login Page",
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#4d0d0d]">
            {children}
        </div>
    )
}

export default AuthLayout

