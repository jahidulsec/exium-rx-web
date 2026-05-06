import { Footer } from "@/components/shared/footer/footer";
import { LoginForm } from "@/features/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
};

export default function LoginPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <main className="w-full max-w-sm">
                <LoginForm />
            </main>
            <Footer />
        </div>
    );
}
