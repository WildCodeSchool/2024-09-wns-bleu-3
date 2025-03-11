
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

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

        {/* Mobile Burger Menu - Visible only on mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#0a2540]">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#051525] text-white border-[#0a2540] p-0">
            <div className="flex flex-col gap-4 p-6">
              <Link to="/scans" className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors">
                See all my scans
              </Link>
              <Link
                to="/login"
                className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors"
              >
                Se connecter
              </Link>
              <Link
                to="/signin"
                className="flex items-center py-3 px-4 text-white hover:bg-[#0a2540] rounded-md  transition-colors"
              >
                S'inscrire
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header