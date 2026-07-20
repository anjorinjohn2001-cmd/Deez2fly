import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Product } from "../types/product";
import Loading from "../components/Loading";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

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

    async function deleteProduct(id: string) {
        await supabase
            .from("products")
            .delete()
            .eq("id", id);

        fetchProducts();
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="py-16">
            <div className="container">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold">
                        Manage Products
                    </h1>

                    <Link
                        to="/admin/add"
                        className="bg-black text-white px-6 py-3 rounded"
                    >
                        Add Product
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-60 object-cover"
                            />

                            <div className="p-5">
                                <h2 className="font-bold text-xl">
                                    {product.name}
                                </h2>

                                <p className="mt-2">
                                    ₦{product.price.toLocaleString()}
                                </p>

                                <div className="flex gap-3 mt-5">
                                    <Link
                                        to={`/admin/edit/${product.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products;