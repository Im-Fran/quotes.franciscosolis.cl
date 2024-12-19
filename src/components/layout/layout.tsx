import {Link, Outlet, ScrollRestoration} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {Theme} from "@radix-ui/themes";
import {SignOutButton, useClerk, useUser} from "@clerk/clerk-react";
import {LogOut} from "lucide-react";

const Layout = () => {

  const { user } = useUser()
  const clerk = useClerk()

  return <Theme>
    <div className={"min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition duration-300"}>
      <div className={"container mx-auto"}>
        <div className={"flex flex-col md:flex-row items-start md:items-center justify-between w-full py-5"}>
          <Link to={"/"}><h1 className={"text-4xl font-bold"}>Cotizaciones</h1></Link>

          <div className={"flex items-center justify-start md:justify-center"}>
            <span className={"text-xl"}>Hola<span className={"text-indigo-600 underline ml-1 cursor-pointer"} onClick={() => clerk.openUserProfile()}>{ user?.fullName != null ? `${user.fullName}` : ''}</span>!</span>
            {user?.imageUrl != null && user?.fullName != null && <img
              src={user.imageUrl}
              alt={user.fullName}
              className={"w-8 h-8 md:w-10 md:h-10 rounded-full ml-4 cursor-pointer object-cover"}
              onClick={() => clerk.openUserProfile()}
            />}
            <SignOutButton>
              <LogOut className={"w-6 h-6 ml-4 cursor-pointer"}/>
            </SignOutButton>
          </div>
        </div>
        <div className={"flex h-full w-full flex-col gap-20"}>
          <Outlet/>
        </div>
      </div>
    </div>
    <ScrollRestoration/>
    <Toaster/>
  </Theme>
};

export default Layout