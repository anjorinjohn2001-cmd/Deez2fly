import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setProducts(data);
        }

        setLoading(false);
    }

    const categories = useMemo(() => {
        return [
            "All",
            ...Array.from(
                new Set(
                    products
                        .map((p) => p.category)
                        .filter(Boolean)
                )
            ),
        ];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-16">

            <div className="container">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                    <h1 className="text-4xl font-bold">
                        Shop Collection
                    </h1>

                    <div className="flex flex-col md:flex-row gap-3">

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-lg px-4 py-3 w-72"
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded-lg px-4 py-3"
                        >
                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>

                    </div>

                </div>

                {filteredProducts.length === 0 ? (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-bold">
                            No products found.
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try another search or category.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default Shop;