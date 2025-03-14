import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/generated/graphql-types";
import { GET_USER_INFO } from "@/graphql/queries";
const loginFormSchema = z.object({
    email: z.string()
        .min(1, "L'email est requis")
        .email("Veuillez entrer un email valide"),
    password: z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
});
type LoginFormValues = z.infer<typeof loginFormSchema>;
export default function LoginPage() {
    const navigate = useNavigate();
    const [login] = useLoginMutation({
        refetchQueries: [{ query: GET_USER_INFO }],
    });
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit = async (data: LoginFormValues) => {
        await login({
            variables: { data: { email: data.email, password: data.password } },
            onCompleted: (response) => {
                console.log("Login réussi:", response);
                toast.success("You’ve successfully logged in! Welcome to s0nar!");
                navigate("/");
            },
            onError: (error) => {
                console.error("Erreur de connexion:", error.message);
                toast.error("Login failed. Please check your credentials and try again.");
            },
        });
        console.log("Données envoyées:", data);
    };
    return (
        <div className="w-full h-screen py-12 md:py-24 bg-[#051525] text-white flex justify-center">
            <Card className="w-full max-w-md p-8 space-y-6 bg-[#0A2540] rounded-xl border border-[#0C2D4D] shadow">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Se connecter à Sonar</h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="email@example.com" className="bg-[#0C2D4D] border-[#0E3359] text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="••••••••" className="bg-[#0C2D4D] border-[#0E3359] text-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox id="remember-me" className="bg-[#0C2D4D] border-[#0E3359]" />
                                <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                                    Se souvenir de moi
                                </Label>
                            </div>
                            <Link to="/reset-password" className="text-sm text-blue-400 hover:text-blue-300">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
                            Se connecter
                        </Button>
                        <div className="text-center text-sm text-gray-300">
                            Pas encore de compte ?{" "}
                            <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                                S'inscrire
                            </Link>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
}