import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

function Navbar() {
    const { cart } = useCart();
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

        return () => subscription.unsubscribe();
    }, []);

    async function logout() {
        await supabase.auth.signOut();
        setUser(null);
        setIsAdmin(false);
        navigate("/");
    }

    return (
        <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-4 py-5">

                <Link
                    to="/"
                    className="text-2xl md:text-3xl font-extrabold tracking-[0.25em]"
                >
                    DEEZ2FLY™
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">

                    <Link to="/" className="hover:text-yellow-400">
                        Home
                    </Link>

                    <Link to="/shop" className="hover:text-yellow-400">
                        Shop
                    </Link>

                    <Link to="/about" className="hover:text-yellow-400">
                        About
                    </Link>

                    <a
                        href="https://instagram.com/deez_2fly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://wa.me/2347012908531"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400"
                    >
                        WhatsApp
                    </a>

                    {!user && (
                        <Link to="/login" className="hover:text-yellow-400">
                            Login
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="text-yellow-400 font-bold"
                        >
                            Admin
                        </Link>
                    )}

                    {user && (
                        <button
                            onClick={logout}
                            className="hover:text-red-400"
                        >
                            Logout
                        </button>
                    )}

                    <Link to="/cart" className="relative">
                        <FaShoppingCart size={22} />

                        {cart.length > 0 && (
                            <span className="absolute -top-3 -right-3 bg-yellow-400 text-black rounded-full text-xs px-2 py-1 font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                </div>

                {/* Mobile Buttons */}
                <div className="flex items-center gap-4 md:hidden">

                    <Link to="/cart" className="relative">
                        <FaShoppingCart size={22} />

                        {cart.length > 0 && (
                            <span className="absolute -top-3 -right-3 bg-yellow-400 text-black rounded-full text-xs px-2 py-1 font-bold">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-black border-t border-gray-800">

                    <div className="flex flex-col px-6 py-4 space-y-4">

                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>

                        <Link to="/shop" onClick={() => setMenuOpen(false)}>
                            Shop
                        </Link>

                        <Link to="/about" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>

                        <a
                            href="https://instagram.com/deez_2fly"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>

                        <a
                            href="https://wa.me/2347012908531"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </a>

                        {!user && (
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setMenuOpen(false)}
                            >
                                Admin
                            </Link>
                        )}

                        {user && (
                            <button
                                onClick={logout}
                                className="text-left"
                            >
                                Logout
                            </button>
                        )}

                    </div>

                </div>
            )}
        </nav>
    );
}

export default Navbar;