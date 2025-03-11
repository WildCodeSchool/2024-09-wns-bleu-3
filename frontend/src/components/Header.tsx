
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Menu } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-[#051525] text-white px-6">
      <div className="flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold">
            <span className="flex items-center">
              <span className="text-white">s</span>
              <span className="text-blue-400">0</span>
              <span className="text-white">nar</span>
              <span className="ml-1 h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            </span>
          </Link>
        </div>
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-[#0a2540]" asChild>
            <Link to="/scans">See all my scans</Link>
          </Button>

          <Button className="bg-white text-[#051525] hover:bg-gray-200" asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
          <Button className="bg-white text-[#051525] hover:bg-gray-200" asChild>
            <Link to="/signin">S'inscrire</Link>
          </Button>
        </nav>

        {/* Mobile Dropdown Menu - Visible only on mobile */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#051525] border-[#0a2540]">
              <DropdownMenuItem asChild className="focus:bg-[#0a2540] focus:text-white cursor-pointer">
                <Link to="/scans" className="w-full text-gray-300">
                  See all my scans
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-[#0a2540] focus:text-white cursor-pointer">
                <Link to="/login" className="w-full text-white">
                  Se connecter
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-[#0a2540] focus:text-white cursor-pointer">
                <Link to="/signin" className="w-full text-white">
                  S'inscrire
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header