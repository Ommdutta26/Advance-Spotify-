
import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./button";

const SignInOAuthButtons=()=>{
	const {signIn,isLoaded}=useSignIn();
	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle=()=>{
		signIn.authenticateWithRedirect({
			strategy:"oauth_google",
			redirectUrl:"/sso-callback",
			redirectUrlComplete:"/auth-callback",
		});
	};

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
			<img src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png' alt='Google' className='size-5' />
			Continue with Google
		</Button>
	);
};
export default SignInOAuthButtons;
