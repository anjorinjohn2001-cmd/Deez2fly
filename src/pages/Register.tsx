import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function register(e: React.FormEvent) {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Account created successfully. Please check your email if verification is enabled.");

        navigate("/login");
    }

    async function googleRegister() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
            },
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Join DEEZ2FLY
                </p>

                <form onSubmit={register} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border rounded-lg p-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
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
                        className="w-full bg-black text-white rounded-lg py-3 font-bold"
                    >
                        Create Account
                    </button>

                </form>

                <div className="my-6 text-center text-gray-500">
                    OR
                </div>

                <button
                    onClick={googleRegister}
                    className="w-full border rounded-lg py-3 font-semibold"
                >
                    Continue with Google
                </button>

                <p className="mt-6 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-blue-600"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;