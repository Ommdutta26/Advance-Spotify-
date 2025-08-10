import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, Music4Icon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div
      className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10'
    >
      <div className='flex gap-2 items-center'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png'
          className='size-8'
          alt='Spotify logo'
        />
        Spotify
      </div>
      <div className='flex items-center gap-4'>
		  <Link
          to={"/generate-music"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Music4Icon className='size-4 mr-2' />
          Generate Your Own Music
        </Link>
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
