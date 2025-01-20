import { isAdmin, LogOut } from "@/backend/Auth";
import { Sidebar } from "@/components/SideBar";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const link = [
    { name: "Home", href: "/", image: "/home.png" },
    { name: "Bookings", href: "/dashboard/bookings", image: "/keys.png" },
    { name: "Logout", href: "/", image: "/logout.png", onclick: LogOut },
  ];
  const Admin = await isAdmin();
  if (Admin) {
    link.splice(2, 0, { name: "Manage Hotels", href: "/dashboard/hotels", image: "/hotel.png" });
    link.splice(3, 0, { name: "Users", href: "/dashboard/users", image: "/user.png" });
  }
  return (
    <div className="pt-8">
      <Sidebar links={link}/>

      <div className="p-1 px-[3%] sm:ml-64">{children}</div>
    </div>
  );
}
