
import { auth } from "@/auth";
import { FormError } from "@/components/form-error";
import { currentRole } from "@/lib/auth";

import prismadb  from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function SetupLayoutPage ({children}:{children:React.ReactNode}){
    const session = await auth();
    const userId = session?.user?.id;
    const role = await currentRole()

    if (!userId) redirect('auth/login');


    if (role !== "ADMIN"){
        return (
            <div className="flex items-center justify-center h-full font-semibold">
                <FormError message="you do not have permission to view this page. You are not an ADMIN"/>
            </div>
        )
    }

    const store = await prismadb.store.findFirst();

     if (store) {
        redirect(`${store?.id}`);
    }


     return (
        <>
            {children}
        </>
     )
}