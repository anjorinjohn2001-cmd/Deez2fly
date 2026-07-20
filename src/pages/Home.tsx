import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import heroImage from "../assets/images/hero.jpg";

import { supabase } from "../lib/supabase";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";

function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(4);

            if (!error && data) {
                setProducts(data as Product[]);
            }

            setLoading(false);
        }

        loadProducts();
    }, []);

    return (
        <div>
            {/* HERO */}
            <section
                className="relative min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroImage})`,
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                    <div className="w-full max-w-4xl text-center text-white">
                        <p className="mb-4 uppercase tracking-[0.3em] text-sm sm:text-base text-yellow-400">
                            Premium Streetwear
                        </p>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-widest">
                            DEEZ2FLY
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-2xl text-gray-200">
                            Built to Stand Out. Premium clothing designed for confidence,
                            comfort and everyday style.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link
                                to="/shop"
                                className="rounded bg-yellow-400 px-8 py-4 font-bold text-black transition hover:bg-yellow-300"
                            >
                                Shop Now
                            </Link>

                            <Link
                                to="/shop"
                                className="rounded border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-black"
                            >
                                Explore Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW ARRIVALS */}
            <section className="bg-gray-50 py-16 md:py-20">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <h2 className="text-center text-3xl md:text-4xl font-bold">
                        New Arrivals
                    </h2>

                    <p className="mt-3 text-center text-gray-500">
                        Fresh drops from DEEZ2FLY.
                    </p>

                    {loading ? (
                        <p className="mt-12 text-center">Loading products...</p>
                    ) : (
                        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* WHY US */}
            <section className="py-16 md:py-20">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <h2 className="mb-10 text-center text-3xl md:text-4xl font-bold">
                        Why DEEZ2FLY?
                    </h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                            <h3 className="text-xl font-bold">Premium Quality</h3>

                            <p className="mt-4 text-gray-600">
                                Carefully selected materials designed for comfort,
                                durability and everyday confidence.
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                            <h3 className="text-xl font-bold">Modern Designs</h3>

                            <p className="mt-4 text-gray-600">
                                Streetwear inspired by today's fashion culture.
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                            <h3 className="text-xl font-bold">Fast Delivery</h3>

                            <p className="mt-4 text-gray-600">
                                Reliable processing with quick shipping.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;