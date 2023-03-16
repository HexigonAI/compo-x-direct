import { useSession } from "next-auth/react";
import { useRouter } from "next/router";



const UserArea = () => {
  //This authenticates the page so guests cannot access these pages. 
  // const router = useRouter();

  // const { data: session, status} = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push('/login-page');
  //   }
  // });

  // if (status !== 'authenticated') {
  //   return null;
  // }

  return (
    <div>This is an authenticated page</div>
  )
}

export default UserArea