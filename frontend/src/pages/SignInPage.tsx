import { Link } from "react-router";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SigninPage = () => {
    return (
        <div className=" signinPage min-h-screen flex items-center justify-center min-w-sm">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#0a2540] rounded-xl border border-[#0c2d4d] shadow  ">
<div className="text-center">
<h1 className="text-3xl font-bold text-white">Créez un compte Sonar</h1>
</div>
<form className="mt-8 space-y-6">
<div className="space-y-4">
    <div>
        <label htmlFor="pseudo" className="block text-sm font-medium text-gray-300">
        Nom d'utilisateur
        </label>
        <Input
        id="pseudo"
        name="pseudo"
        type="pseudo"
        required
        className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white"
        placeholder="pseudo"
        />
    </div>
                            
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
        Email
        </label>
        <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white"
        placeholder="email@example.com"
        />
    </div>
    <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
        Mot de passe
        </label>
        <Input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white"
        placeholder="••••••••"
        />
    </div>
</div>



<Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">Continuer</Button>

<div className="text-center text-sm text-gray-300">
  Vous avez déjà un compte ?{" "}
  <Link to="/login" className="text-blue-400 hover:text-blue-300">
    Se connecter
  </Link>
</div>
</form>
</div>
</div>
    )
}

export default SigninPage