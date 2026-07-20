import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useCart } from "../context/temp";
import { supabase } from "../lib/supabase";

function Navbar() {
    const { cart } = useCart();

    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function loadUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
            setIsAdmin(user?.email === "anjorinjohn2001@gmail.com");
        }

        loadUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsAdmin(
                session?.user?.email === "anjorinjohn2001@gmail.com"
            );
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function logout() {
        await supabase.auth.signOut();

        setUser(null);
        setIsAdmin(false);

        navigate("/");
    }

    return (
        <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-5 px-4">

                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-[0.25em]"
                >
                    DEEZ2FLY™
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-yellow-400 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/shop"
                        className="hover:text-yellow-400 transition"
                    >
                        Shop
                    </Link>

                    <Link
                        to="/about"
                        className="hover:text-yellow-400 transition"
                    >
                        About
                    </Link>

                    <a
                        href="https://instagram.com/deez_2fly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400 transition"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://wa.me/2347012908531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400 transition"
                    >
                        WhatsApp
                    </a>

                    {!user && (
                        <Link
                            to="/login"
                            className="hover:text-yellow-400 font-semibold transition"
                        >
                            Login
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="text-yellow-400 font-bold hover:text-yellow-300"
                        >
                            Admin
                        </Link>
                    )}

                    {user && (
                        <button
                            onClick={logout}
                            className="hover:text-red-400 transition"
                        >
                            Logout
                        </button>
                    )}

                    <Link
                        to="/cart"
                        className="relative"
                    >
                        <FaShoppingCart size={22} />

                        {cart.length > 0 && (
                            <span className="absolute -top-3 -right-3 bg-yellow-400 text-black rounded-full text-xs font-bold px-2 py-1">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;