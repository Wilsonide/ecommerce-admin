import { useOrigin } from "@/hooks/useOrigin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./apiAlert";

interface AppListProps{
    entityName: string;
    entityId: string;
}

export const ApiList: React.FC<AppListProps> = ({entityName, entityId})=>{
    const params = useParams()
    const origin = useOrigin()
    const baseUrl = `${origin}/api/${params.storeId}`;
    return (
        <>
            <ApiAlert
            title="GET"
            description={`${baseUrl}/${entityName}`}
            variant="public"
            />

            <ApiAlert
            title="GET"
            description={`${baseUrl}/${entityName}/{${entityId}}`}
            variant="public"
            />

            <ApiAlert
            title="POST"
            description={`${baseUrl}/${entityName}`}
            variant="admin"
            />

            <ApiAlert
            title="PATCH"
            description={`${baseUrl}/${entityName}/{${entityId}}`}
            variant="admin"
            />

            <ApiAlert
            title="DELETE"
            description={`${baseUrl}/${entityName}/{${entityId}}`}
            variant="admin"
            />
        </>
    )
}