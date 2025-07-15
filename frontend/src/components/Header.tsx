import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { LogOut, Menu, Settings, Sparkles, User, LayoutDashboard } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

import { GET_USER_INFO } from "@/graphql/queries"
import Avatar from "boring-avatars";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Separator } from "./ui/separator"
import { useLogoutMutation } from "@/generated/graphql-types"
import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"

const Header = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const { isLoggedIn, data, error } = useAuth();
  const mail = data?.getUserInfo?.email
  const username = data?.getUserInfo?.username

  // Définir les mêmes avatars que dans la page des paramètres
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

  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
    onCompleted: () => navigate("/")
  });

  // Sample color palette for avatar
  const colorPalette = ["#0087ff", "#66b7ff", "#99cfff", "#cce7ff", "#005199"]

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <header className="bg-[#051525] text-white px-6">
      <div className="flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold" aria-label="Accueil">
            <span className="flex items-center">
              <span className="text-white">s</span>
              <span className="text-blue-400">0</span>
              <span className="text-white">nar</span>
              <span className="ml-1 h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#0a2540]" asChild>
            <Link to="/scans">See all my scans</Link>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer hover:opacity-80 transition">

                  <Avatar name={avatars[selectedAvatar]} size={40} variant="beam" colors={colorPalette} aria-label="avatar" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#0a2540] shadow-lg rounded-lg border border-[#0c2d4d] text-white"
              >
                <DropdownMenuItem className="hover:bg-[#0c2d4d] cursor-pointer p-4 flex items-start gap-3">
                  <Avatar name={avatars[selectedAvatar]} size={40} variant="beam" colors={colorPalette} aria-label="avatar" />
                  <div className="flex flex-col flex-1">
                    <div className="font-semibold">{username}</div>
                    <div className="text-sm text-gray-400">{mail}</div>
                  </div>
                </DropdownMenuItem>

                <Separator className="bg-[#0c2d4d]" />

                <DropdownMenuItem asChild className="hover:bg-[#0c2d4d] cursor-pointer">
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="hover:bg-[#0c2d4d] cursor-pointer">
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="hover:bg-[#0c2d4d] cursor-pointer">
                  <Link to="/upgrade">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Link>
                </DropdownMenuItem>

                <Separator className="bg-[#0c2d4d]" />

                <DropdownMenuItem onClick={() => logout()} className="hover:bg-[#0c2d4d] cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button className="bg-main-500 text-white hover:bg-main-600" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Burger Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#0a2540]">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#051525] text-white border-[#0a2540] p-0">
            <div className="flex flex-col gap-4 p-6">
              <Link
                to="/scans"
                className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors"
              >
                See all my scans
              </Link>

              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 py-3 px-4 disab">
                    <Avatar name={avatars[selectedAvatar]} size={40} variant="beam" colors={colorPalette} aria-label="avatar" />
                    <div>
                      <div className="font-semibold">{username}</div>
                      <div className="text-sm text-gray-400">{mail}</div>
                    </div>
                  </div>
                  <Link
                    to="/settings"
                    className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                  <Link
                    to="/upgrade"
                    className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors"
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> Upgrade to Pro
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center py-3 px-4 text-white hover:bg-[#0a2540] rounded-md transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header