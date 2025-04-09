// File: ForgotPasswordPage.tsx

import { Link, useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, Lock, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation, useForgotPasswordMutation } from '@/generated/graphql-types';
import { toast } from 'sonner';

// === Schema === //
const requestResetSchema = z.object({
  email: z.string().min(1, "L'email est requis").email('Veuillez entrer un email valide'),
});

const resetPasswordSchema = z
  .object({
    code: z.string().min(1, 'Code requis'),
    newPassword: z
      .string()
      .min(8, 'Minimum 8 caractères')
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message: 'Le mot de passe doit contenir au moins : 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (@$!%*?&)',
      }),
    confirmPassword: z.string().min(1, 'Confirmation requise'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

// === Form Types === //
type RequestResetFormValues = z.infer<typeof requestResetSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('request');
  const [forgotPassword] = useForgotPasswordMutation();
  const [changePassword] = useChangePasswordMutation();

  // Separate forms
  const requestResetForm = useForm<RequestResetFormValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: '', newPassword: '', confirmPassword: '' },
    mode: 'onChange',
  });

  useEffect(() => {
    const tabParam = searchParams.get('tab') ?? 'request';
    const codeParam = searchParams.get('code');
    setTab(tabParam);
    if (codeParam) {
      resetPasswordForm.setValue('code', codeParam);
    }
  }, [searchParams, resetPasswordForm]);

  const handleRequestReset = async (data: RequestResetFormValues) => {
    // console.log('handleRequestReset data:', data);
    await forgotPassword({
      variables: { userEmail: data.email },
      onCompleted: () => {
        toast.success('Code de vérification envoyé');
        navigate('/reset-password?tab=reset');
      },
      onError: (err) => {
        console.error('Error ask reset code:', err);
        toast.error(err.message);
      },
    });
  };

  const handleResetPassword = async (data: ResetPasswordFormValues) => {
    // console.log('handleResetPassword data:', data);
    await changePassword({
      variables: {
        code: data.code,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      onCompleted: () => {
        toast.success('Mot de passe mis à jour');
        navigate('/login');
      },
      onError: (err) => {
        console.error('Error change password:', err);
        toast.error(err.message);
      },
    });
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

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full bg-[#0c2d4d]">
            <TabsTrigger value="request">Request</TabsTrigger>
            <TabsTrigger value="reset">Reset</TabsTrigger>
          </TabsList>

          {/* Request Form */}
          <TabsContent value="request" className="mt-6 space-y-6">
            <Form {...requestResetForm}>
              <form onSubmit={requestResetForm.handleSubmit(handleRequestReset)} className="space-y-6">
                <FormField
                  control={requestResetForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input {...field} type="email" className="pl-10 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="email@example.com" />
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

          {/* Reset Form */}
          <TabsContent value="reset" className="mt-6 space-y-6">
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)} className="space-y-6">
                <FormField
                  control={resetPasswordForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Verification Code</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" className="bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="Enter the code received by email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input {...field} type="password" className="pl-10 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="••••••••" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CheckCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input {...field} type="password" className="pl-10 bg-[#0c2d4d] border-[#0e3359] text-white" placeholder="••••••••" />
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
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
