
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { Check, Edit2, LogOut, Menu, Sparkles, Trash2, User, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useDeleteUserMutation, useGetUserInfoQuery, useLogoutMutation } from "@/generated/graphql-types"
import { GET_USER_INFO } from "@/graphql/queries"
import Avatar from "boring-avatars";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Separator } from "./ui/separator"
import { useState } from "react"
import { Input } from "./ui/input"
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Header = () => {
  const navigate = useNavigate();

  const { data, error } = useGetUserInfoQuery()
  const isLoggedIn = data?.getUserInfo?.isLoggedIn;
  const mail = data?.getUserInfo?.email
  const username = data?.getUserInfo?.username



  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
    onCompleted: () => navigate("/")
  });

  const [deleteUser] = useDeleteUserMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
    onCompleted: () => {
      toast.success("Your account has been successfully deleted!");
      setTimeout(() => navigate("/"), 1000);
    },
    onError: (error) => {
      toast.error(`Error deleting account: ${error.message}`);
    }
  });


  // États pour l'édition du username
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState(username || "")
  const [selectedPalette, setSelectedPalette] = useState(0)

  // Palettes de couleurs pour les avatars
  const colorPalettes = [
    ["#0087ff", "#66b7ff", "#99cfff", "#cce7ff", "#005199"], // Bleu Sonar
    ["#16a34a", "#4ade80", "#86efac", "#dcfce7", "#14532d"], // Vert
    ["#7c3aed", "#a78bfa", "#c4b5fd", "#ede9fe", "#4c1d95"], // Violet
    ["#ea580c", "#fb923c", "#fdba74", "#ffedd5", "#7c2d12"], // Orange
    ["#db2777", "#f472b6", "#f9a8d4", "#fce7f3", "#831843"], // Rose
  ]

  // Fonction pour sauvegarder le nouveau username
  const saveUsername = () => {
    // Ici, vous feriez normalement un appel API pour mettre à jour le username
    console.log(`Saving new username: ${newUsername}`)
    setIsEditingUsername(false)
    // Dans une implémentation réelle, vous mettriez à jour le cache GraphQL
  }

  // Fonction pour annuler l'édition
  const cancelEditing = () => {
    setNewUsername(username || "")
    setIsEditingUsername(false)
  }

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
          <Button variant="ghost" asChild>
            <Link to="/scans">See all my scans</Link>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer hover:opacity-80 transition">
                  <Avatar name={username || "User"} size={40} variant="beam" colors={colorPalettes[selectedPalette]} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-[#0a2540] shadow-lg rounded-lg border border-[#0c2d4d] text-white"
              >
                <DropdownMenuItem className="hover:bg-[#0c2d4d] cursor-pointer p-4 flex items-start gap-3">
                  <Avatar name={username || "User"} size={40} variant="beam" colors={colorPalettes[selectedPalette]} />
                  <div className="flex flex-col flex-1">
                    {isEditingUsername ? (
                      <div className="space-y-2">
                        <Input
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="h-8 bg-[#0c2d4d] border-[#0e3359] text-white"
                          placeholder="Enter new username"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 px-2" onClick={saveUsername}>
                            <Check className="h-4 w-4 mr-1" /> Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#0e3359] text-white hover:bg-[#0c2d4d] h-7 px-2"
                            onClick={cancelEditing}
                          >
                            <X className="h-4 w-4 mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{username}</div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-[#0c2d4d]"
                            onClick={() => setIsEditingUsername(true)}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-400">{mail}</div>
                      </>
                    )}
                  </div>
                </DropdownMenuItem>

                <div className="px-2 py-1.5">
                  <div className="text-xs font-medium text-gray-400 mb-1.5 px-2">Avatar Style</div>
                  <div className="flex gap-1 px-2 mb-1">
                    {colorPalettes.map((palette, index) => (
                      <button
                        key={index}
                        className={`relative p-1 rounded-md ${selectedPalette === index ? "bg-[#0c2d4d] ring-1 ring-blue-500" : "hover:bg-[#0c2d4d]"
                          } transition-colors`}
                        onClick={() => setSelectedPalette(index)}
                      >
                        <Avatar size={24} name={username || "User"} variant="beam" colors={palette} />
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-[#0c2d4d]" />


                <DropdownMenuItem className="hover:bg-[#0c2d4d] cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>

                <Separator className="bg-[#0c2d4d]" />

                <DropdownMenuItem onClick={() => logout()} className="hover:bg-[#0c2d4d] cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4 text-gray-400" />
                  Logout
                </DropdownMenuItem>


                <div className=" py-1.5">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full cursor-pointer justify-start text-red-400 hover:bg-red-900/30 hover:text-red-300"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete my account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#0a2540] text-white border border-[#0c2d4d]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Account</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          This action cannot be undone. Your account and all associated data will be permanently
                          deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer bg-[#0c2d4d] text-white border-[#0e3359] hover:bg-[#0e3359]">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            const userId = data?.getUserInfo?.id;
                            if (userId !== undefined && userId !== null) {
                              deleteUser({ variables: { id: userId } });
                            } else {
                              toast.error("User ID is missing");
                            }
                          }}
                          className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>

              <Button variant="outline" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button variant="lightBlue" asChild>
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
                  <div className="flex items-center gap-3 py-3 px-4">
                    <Avatar
                      name={username || "User"}
                      size={40}
                      variant="beam"
                      colors={colorPalettes[selectedPalette]}
                    />
                    <div>
                      <div className="font-semibold">{username}</div>
                      <div className="text-sm text-gray-400">{mail}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors text-left"
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> Upgrade to Pro
                  </button>
                  <button
                    onClick={() => logout()}
                    className="flex items-center py-3 px-4 rounded-md hover:bg-[#0a2540] transition-colors text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </button>

                  {/* AlertDialog pour mobile */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="flex items-center py-3 px-4 hover:bg-red-900/30 hover:text-red-300 rounded-md transition-colors text-left w-full">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete my account
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#0a2540] text-white border border-[#0c2d4d]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Account</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          This action cannot be undone. Your account and all associated data will be permanently
                          deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-[#0c2d4d] text-white border-[#0e3359] hover:bg-[#0e3359]">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteUser()} className="bg-red-600 text-white hover:bg-red-700">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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


export default Header;