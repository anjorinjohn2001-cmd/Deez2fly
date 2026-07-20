import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [sizes, setSizes] = useState("");
    const [stock, setStock] = useState("");

    const [images, setImages] = useState<FileList | null>(null);

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!images || images.length === 0) {
            alert("Select at least one image");
            return;
        }

        setLoading(true);

        const imageUrls: string[] = [];

        for (let i = 0; i < images.length; i++) {
            const file = images[i];

            const fileName = `${Date.now()}-${i}-${file.name}`;

            const { error } = await supabase.storage
                .from("products")
                .upload(fileName, file);

            if (error) {
                alert(error.message);
                setLoading(false);
                return;
            }

            const { data } = supabase.storage
                .from("products")
                .getPublicUrl(fileName);

            imageUrls.push(data.publicUrl);
        }

        const { error } = await supabase
            .from("products")
            .insert({
                name,
                description,
                price: Number(price),
                category,
                sizes: sizes.split(",").map((s) => s.trim()),
                stock: Number(stock),

                image: imageUrls[0],

                images: imageUrls,
            });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        navigate("/admin/products");
    }

    return (
        <section className="py-16">
            <div className="container max-w-xl">

                <h1 className="text-4xl font-bold mb-8">
                    Add Product
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        className="w-full border rounded p-3"
                        placeholder="Product Name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        className="w-full border rounded p-3"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="number"
                        className="w-full border rounded p-3"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <input
                        className="w-full border rounded p-3"
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <input
                        className="w-full border rounded p-3"
                        placeholder="Sizes (S,M,L,XL)"
                        onChange={(e) => setSizes(e.target.value)}
                    />

                    <input
                        type="number"
                        className="w-full border rounded p-3"
                        placeholder="Stock"
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <div>

                        <label className="font-semibold block mb-2">
                            Product Images
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                        />

                    </div>

                    <button
                        disabled={loading}
                        className="w-full rounded bg-black py-4 text-white font-bold"
                    >
                        {loading ? "Uploading..." : "Add Product"}
                    </button>

                </form>

            </div>
        </section>
    );
}

export default AddProduct;