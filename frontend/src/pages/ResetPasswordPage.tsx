import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Lock, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";


const ForgotPasswordPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);

  };

  return (
    <main className="flex-1 flex items-center justify-center bg-[#051525] py-12 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#0a2540] rounded-xl border border-[#0c2d4d] shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0" asChild>
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </Button>
        </div>


        <Tabs defaultValue="request" className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-[#0c2d4d]">
            <TabsTrigger value="request" className="w-full flex-1 text-center data-[state=active]:bg-main-500">
              Request
            </TabsTrigger>
            <TabsTrigger value="reset" className="w-full flex-1 text-center data-[state=active]:bg-main-500">
              Reset
            </TabsTrigger>
          </TabsList>


          {/* Request Reset Link Form */}
          <TabsContent value="request" className="mt-6 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
              <p className="mt-2 text-gray-300">Enter your email address to receive a reset link</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            autoComplete="email"
                            required
                            className="pl-10 bg-[#0c2d4d] border-[#0e3359] text-white"
                            placeholder="name@example.com"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Reset Link
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Reset Password Form */}
          <TabsContent value="reset" className="mt-6 space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Reset Password</h1>
              <p className="mt-2 text-gray-300">Create a new secure password</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Verification Code</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" required className="bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="Enter the code received by email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input {...field} type="password" required className="pl-10 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="••••••••" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CheckCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input {...field} type="password" required className="pl-10 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="••••••••" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Reset Password
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-300 pt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Log in
          </Link>
        </div>
      </div>
    </main >
  );
};

export default ForgotPasswordPage;