
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const Header = () => {
  return (
    <header className="bg-[#051525] text-white">
      <div className="container flex h-16 items-center justify-between py-4">
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
        <nav className="flex items-center gap-4">
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
      </div>
    </header>
  )
}

export default Header