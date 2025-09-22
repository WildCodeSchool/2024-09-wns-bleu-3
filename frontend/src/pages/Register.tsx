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

            register({
                variables: { code }, onCompleted: () => {
                    toast.success("✅Registration successful!");
                    navigate("/login")
                },
            })
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
