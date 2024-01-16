
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({children,params}:{
children: React.ReactNode,
params: {storeId: String}
}){
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        redirect('/auth/login');
    }

    const store = await prismadb.store.findFirst({where: {
        id: params.storeId as string
         
    }

    })
   

    if (!store) {
        redirect('/')
    }

    return (
        <> 
            {/* @ts-expect-error Server Component */}
            <Navbar/>
            {children}
        </>
    )
}
