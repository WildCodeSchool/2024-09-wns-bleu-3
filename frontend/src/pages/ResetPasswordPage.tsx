import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full py-12 md:py-24 bg-[#051525] text-white">
      <div className="resetPage flex items-center justify-center min-w-sm">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#0a2540] rounded-xl border border-[#0c2d4d] shadow">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Mot de passe oublié</h1>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
              Envoyer le lien de réinitialisation
            </Button>
          </form>
          <div className="text-center text-sm text-gray-300">
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
