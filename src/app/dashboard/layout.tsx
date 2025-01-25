import NavbarWithSidebar from "@/components/NavbarWithSidebar";
// import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard | Movie Discovery",
  description: "Dashboard",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <div className="flex">
      <NavbarWithSidebar>
      {/* Main content with margin-left to avoid overlapping with the sidebar */}
      <main className="mt-16 flex-1 bg-[#a10f0f] bg-opacity-5">{children}</main>
      </NavbarWithSidebar>
    </div>
  );
};

export default RootLayout;
