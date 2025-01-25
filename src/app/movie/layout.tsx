import NavbarWithSidebar from "@/components/NavbarWithSidebar"


export const metadata = {
    title: 'Dashboard | Movie Discovery',
    description: 'Movie List',
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div className="bg-[#a10f0f] bg-opacity-5">
        <NavbarWithSidebar>
            {children}
        </NavbarWithSidebar>
        </div>

    )
}

export default RootLayout

