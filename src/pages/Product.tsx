import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Product as ProductType } from "../types/Product";
import Loading from "../components/Loading";
import { useCart } from "../context/cartContext";

function Product() {
    const { id } = useParams();

    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    async function fetchProduct() {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (!error && data) {
            setProduct(data);

            if (data.images && data.images.length > 0) {
                setSelectedImage(data.images[0]);
            } else {
                setSelectedImage(data.image);
            }

            if (data.sizes?.length > 0) {
                setSelectedSize(data.sizes[0]);
            }
        }

        setLoading(false);
    }

    if (loading) return <Loading />;

    if (!product) {
        return (
            <div className="container py-20">
                Product not found.
            </div>
        );
    }

    return (
        <section className="py-16">
            <div className="container grid md:grid-cols-2 gap-12">

                <div>

                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-full rounded-xl shadow-lg"
                    />

                    {product.images && product.images.length > 1 && (

                        <div className="grid grid-cols-4 gap-3 mt-4">

                            {product.images.map((img) => (

                                <img
                                    key={img}
                                    src={img}
                                    alt=""
                                    onClick={() => setSelectedImage(img)}
                                    className={`cursor-pointer rounded-lg border-2 h-28 w-full object-cover ${selectedImage === img
                                        ? "border-yellow-500"
                                        : "border-gray-300"
                                        }`}
                                />

                            ))}

                        </div>

                    )}

                </div>

                <div>

                    <p className="uppercase tracking-widest text-yellow-500 font-semibold">
                        {product.category}
                    </p>

                    <h1 className="text-5xl font-bold mt-3">
                        {product.name}
                    </h1>

                    <p className="text-3xl font-bold mt-6">
                        ₦{product.price.toLocaleString()}
                    </p>

                    <p className="mt-8 text-gray-600 leading-8">
                        {product.description}
                    </p>

                    <h3 className="font-bold mt-8 mb-3">
                        Select Size
                    </h3>

                    <div className="flex gap-3 flex-wrap">

                        {product.sizes.map((size) => (

                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-5 py-2 rounded border ${selectedSize === size
                                    ? "bg-black text-white"
                                    : ""
                                    }`}
                            >
                                {size}
                            </button>

                        ))}

                    </div>

                    <p className="mt-8">
                        <strong>Stock:</strong> {product.stock}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="mt-10 w-full rounded-lg bg-black py-4 text-white text-lg font-bold hover:bg-gray-800"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>
        </section>
    );
}

export default Product;