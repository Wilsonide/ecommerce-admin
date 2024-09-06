

interface BackButtonProps{
    href: string;
    label: string;
    link:string
}

import NavLink from "next/link";
import { Button } from "../ui/button"

export const BackButton = ({href,label,link}:BackButtonProps) => {
    return (
        <>
            <span>{label}</span>
            <Button variant='link' className="font-medium" size='sm' asChild>
                <NavLink href={href}>
                    {link}
                </NavLink>
            </Button>
        </>
    )
}