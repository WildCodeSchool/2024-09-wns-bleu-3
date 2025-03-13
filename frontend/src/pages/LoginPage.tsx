import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  email: z.string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),

  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Données envoyées:", data);
  };

  return (
    <div className="w-full py-12 md:py-24 bg-[#051525] text-white flex justify-center">
      <Card className="w-full max-w-md p-8 space-y-6 bg-[#0a2540] rounded-xl border border-[#0c2d4d] shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Login to sOnar</h1>
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
                    <Input {...field} type="email" placeholder="email@example.com" className="bg-[#0c2d4d] border-[#0e3359] text-white" />
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
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••" className="bg-[#0c2d4d] border-[#0e3359] text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" className="bg-[#0c2d4d] border-[#0e3359]" />
                <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-300">
                  Remember me
                </Label>
              </div>
              <Link to="/reset-password" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot your password ?
              </Link>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit">
              Login
            </Button>
            
            <div className="text-center text-sm text-gray-300">
              Don't have an account ? <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign up</Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}