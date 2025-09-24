import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useRegisterMutation } from "@/generated/graphql-types";

const Register = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [register, { loading }] = useRegisterMutation();
    const code = searchParams.get("code");

    useEffect(() => {
        const runRegister = async () => {
            if (!code) {
                navigate("/signup");
                return;
            }

            await register({
                variables: { code }, onCompleted: () => {
                    navigate('/login')
                    toast.success("✅ Registration successful!");
                }, onError: () => {
                    navigate('/signup')
                }

                // NB: s'il y'a une erreur elle sera interceptée, puis gérée dans la SignUpPage.tsx
            });

        };

        runRegister();
    }, [code, register, navigate]);


    return (
        <div className="flex min-h-screen items-center justify-center bg-[#051525]">
            <p className="text-white text-lg">
                {loading ? "⏳ Validating your registration..." : "Finalizing registration..."}
            </p>
        </div>
    );
};

export default Register;
