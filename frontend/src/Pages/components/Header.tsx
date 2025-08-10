import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<Link to='/' className='rounded-lg'>
					<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png' className='size-10 text-black' />
				</Link>
				<div>
					<h1 className='text-3xl font-bold'>Music Manager</h1>
					<p className='text-zinc-400 mt-1'>Manage your music catalog</p>
				</div>
			</div>
			<UserButton />
		</div>
	);
};
export default Header;