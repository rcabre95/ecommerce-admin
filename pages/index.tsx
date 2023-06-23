import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  
  return <Layout>
    <div className={`text-blue-900 flex justify-between`}>
      <p>Hello, <span className={`font-bold`}>{session?.user?.name}</span></p>
      {session?.user?.image ?
      <div className={`flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden`}>
        <div className={`w-6 h-6 relative`}>
          <Image src={session?.user?.image} alt="user image" fill />
        </div>
        <span className={`x-2`}>
          {session?.user?.name}
        </span>
      </div>
      :
      null
      }
    </div>
  </Layout>
}
