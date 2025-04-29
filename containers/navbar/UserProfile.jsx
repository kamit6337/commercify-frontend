// import useLoginCheck from "@/hooks/auth/useLoginCheck";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/assets/icons";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // const { data: user } = useLoginCheck();
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleLogout = async () => {
    Cookies.remove("_use");
    router.push("/login");
    localStorage.removeItem("_cart");
    localStorage.removeItem("_wishlist");
    localStorage.removeItem("_cou");
    localStorage.removeItem("_add");
    localStorage.removeItem("_exra");
    queryClient.clear();
    window.location.reload();
  };
  return (
    <DropdownMenu onOpenChange={(open) => setShowUserInfo(open)}>
      <DropdownMenuTrigger asChild>
        <div
          className="flex justify-center items-center gap-[6px] cursor-pointer"
          onClick={() => setShowUserInfo((prev) => !prev)}
        >
          hello
          {/* <p className="w-8">
            <img
              src={user?.photo}
              loading="lazy"
              className="w-full rounded-full object-cover "
            />
          </p>
          <p className="mobile:hidden">{user?.name?.split(" ")[0]}</p> */}
          <p className="text-xs">
            {showUserInfo ? (
              <Icons.upArrow className="" />
            ) : (
              <Icons.downArrow />
            )}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/user/orders`)}>
          My Orders
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/wishlist`)}>
          Wishlist
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/user`)}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
