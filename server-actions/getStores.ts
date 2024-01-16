import { Store } from "@prisma/client"


const url = `${process.env.NEXT_PUBLIC_API_URL}/stores`
const getStores = async (): Promise<Store[]> => {
    const res = await fetch(url,{
        method: 'GET',
        headers:{
            "content-type": "application/json",
            
        }
    })
    return res.json()
}
export default getStores