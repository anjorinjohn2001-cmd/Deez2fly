import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/cartContext";

function Checkout() {
    const { cart, total, clearCart } = useCart();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);
            setLoading(false);
        }

        getUser();
    }, []);

    if (loading) {
        return (
            <div className="container py-20 text-center">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    function placeOrder() {
        if (!name || !phone || !address) {
            alert("Please complete all fields.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const items = cart
            .map(
                (item) =>
                    `• ${item.name} x${item.quantity} - ₦${(
                        item.price * item.quantity
                    ).toLocaleString()}`
            )
            .join("\n");

        const message = `*NEW ORDER - DEEZ2FLY™*

Customer: ${name}

Email: ${user.email}

Phone: ${phone}

Address:
${address}

------------------------

${items}

------------------------

Total: ₦${total.toLocaleString()}`;

        window.open(
            `https://wa.me/2347012908531?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        clearCart();
    }

    return (
        <section className="py-16">

            <div className="container max-w-xl">

                <h1 className="text-4xl font-bold mb-8">
                    Checkout
                </h1>

                <input
                    className="w-full border rounded p-3 mb-4"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full border rounded p-3 mb-4"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                    className="w-full border rounded p-3 mb-4"
                    placeholder="Delivery Address"
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="border rounded-lg p-5 mb-6">

                    <h2 className="text-xl font-bold mb-3">
                        Order Summary
                    </h2>

                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between mb-2"
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <span>
                                ₦{(
                                    item.price * item.quantity
                                ).toLocaleString()}
                            </span>
                        </div>
                    ))}

                    <hr className="my-4" />

                    <h3 className="text-2xl font-bold">
                        Total: ₦{total.toLocaleString()}
                    </h3>

                </div>

                <button
                    onClick={placeOrder}
                    className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition"
                >
                    Order on WhatsApp
                </button>

            </div>

        </section>
    );
}

export default Checkout;