import { serverUrl } from "@/lib/utils";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="relative lg:grid lg:grid-cols-3 h-screen items-center">
        <div className="h-full col-span-2 overflow-hidden">
            <img src={`${serverUrl}/files/cover.webp`} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute lg:right-1 bottom-1/2 lg:bottom-auto right-1/2 translate-x-1/2 translate-y-1/2 lg:translate-x-0 lg:translate-y-0">
            <SignIn />
        </div>
    </div>
  )
}

export default Login;