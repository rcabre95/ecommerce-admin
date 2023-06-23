import { useSession, signIn, signOut } from "next-auth/react"
import Navigation from "@/components/Nav";

export default function Layout({ children }: { children: any}) {
    const { data: session } = useSession();

    if(!session) {
        return (
            <div className={`bg-blue-900 w-screen h-screen flex items-center`}>
                <div className="text-center w-full">
                <button onClick={() => signIn('google')} className={`bg-white p-2 px-4 rounded-lg`}>Login with Google</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className={`bg-blue-900 w-screen p-2 h-screen flex items-center`}>
            <Navigation />
            <div className={`bg-white h-full flex-grow p-4 mr-2 mt-2 mb-2 rounded-lg`}>
            {children}
            </div>
        </div>
    )
}
