import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/graphql/mutations";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";


const scanFormSchema = z.object({
  email: z.string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),

  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, 
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)"),

  username: z.string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères")
    .max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
});


type ScanFormValues = z.infer<typeof scanFormSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [registerMutation] = useMutation(REGISTER, {
    onCompleted: (data) => {
      console.log("Inscription réussie :", data);
      toast.success("🚀 Inscription réussi, Bienvenu sur s0nar!.")
      navigate("/");

    },
    onError: (err) => {
      console.error("Erreur lors de l'inscription :", err);
      const errorMessage = err.message
      toast.error(errorMessage);
    }
  });

  const form = useForm({
     resolver: zodResolver(scanFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode:"onChange"
  });

  const onSubmit = (data: ScanFormValues) => {
    console.log("données envoyées", data);
    registerMutation({
      variables: {
        data: {
          email: data.email,
          password: data.password,
          username: data.username
        }
      }
    });
  };



  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center bg-[#051525]">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#0a2540] rounded-xl border border-[#0c2d4d] shadow-lg">
          <div>
            <h1 className="text-white text-center text-3xl font-bold">Create an Account</h1>
            <p className="text-center text-gray-300">Sign up to start monitoring your URLs</p></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="space-y-4">

                <FormField control={form.control} name="username" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <Input {...field} className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="name@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="••••••••" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" type="submit">
                Create Account
              </Button>
              <div className="text-center text-sm text-gray-300">
                Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}


export default SignupPage