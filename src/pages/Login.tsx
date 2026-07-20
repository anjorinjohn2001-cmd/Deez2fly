import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function login(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user?.email === "anjorinjohn2001@gmail.com") {
            navigate("/admin");
        } else {
            navigate("/");
        }
    }

    async function googleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
            },
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                <h1 className="text-4xl font-extrabold text-center tracking-widest">
                    DEEZ2FLY™
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Sign in to your account
                </p>

                <form onSubmit={login} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full border rounded-lg p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-black text-white rounded-lg py-3 font-bold hover:bg-gray-800 transition"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 border-t"></div>
                    <span className="px-4 text-gray-500">OR</span>
                    <div className="flex-1 border-t"></div>
                </div>

                <button
                    onClick={googleLogin}
                    className="w-full border rounded-lg py-3 font-semibold hover:bg-gray-100 transition"
                >
                    Continue with Google
                </button>

                <p className="text-center mt-8">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-bold text-blue-600"
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;