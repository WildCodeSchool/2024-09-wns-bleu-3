import { useLogoutMutation } from "@/generated/graphql-types";
import { GET_USER_INFO } from "@/graphql/queries";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Avatar from "boring-avatars";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

function NavUser() {
    const { user } = useAuth()
    const navigate = useNavigate();

    const [selectedAvatar, setSelectedAvatar] = useState(0);

    const avatars = [
        "Mary Baker",
        "Zora Neale",
        "Abigail Adams",
        "Sarah Winnemucca",
        "Margaret Brent",
        "Carrie Chapman"
    ];

    // Récupérer l'avatar sélectionné depuis localStorage
    useEffect(() => {
        const savedAvatar = localStorage.getItem("selectedAvatar");
        if (savedAvatar !== null) {
            setSelectedAvatar(parseInt(savedAvatar, 10));
        }
    }, [localStorage.getItem("selectedAvatar")]);

    const colorPalette = ["#0087ff", "#66b7ff", "#99cfff", "#cce7ff", "#005199"]
    // Logout mutation to clear user session and redirect to home
    const [logout] = useLogoutMutation({
        refetchQueries: [{ query: GET_USER_INFO }],
        onCompleted: () => navigate("/")
    });

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            className=" data-[state=open]:text-dark-blue-100 bg-main-400/10 border border-dark-blue-700/50 hover:bg-dark-blue-900/50 hover:text-dark-blue-100 text-dark-blue-300 h-auto py-3 px-3 flex items-center gap-3 backdrop-blur-md"
                        >
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                <Avatar name={avatars[selectedAvatar]} size={32} variant="beam" colors={colorPalette} aria-label="avatar" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center group-data-[collapsible=icon]:hidden">
                                <div className="truncate font-medium text-dark-blue-100 text-sm leading-tight">Welcome, {capitalizeFirstLetter(user?.username ?? '')}</div>
                                <div className="truncate text-xs text-dark-blue-400 leading-tight">{user?.email}</div>
                            </div>
                            <ChevronsUpDown className="size-4 text-dark-blue-400 flex-shrink-0" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-dark-blue-950/95 backdrop-blur-sm border border-dark-blue-700/50 p-1"
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                                <Avatar name={avatars[selectedAvatar]} size={32} variant="beam" colors={colorPalette} aria-label="avatar" />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium text-dark-blue-100">{capitalizeFirstLetter(user?.username ?? '')}</span>
                                    <span className="truncate text-xs text-dark-blue-400">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="my-1 h-px bg-dark-blue-700/50" />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <button
                                    onClick={() => logout()}
                                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-dark-blue-300 hover:bg-dark-blue-800/50 hover:text-dark-blue-100 transition-colors cursor-pointer"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavUser