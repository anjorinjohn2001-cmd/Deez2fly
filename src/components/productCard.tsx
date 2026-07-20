import { Link } from "react-router-dom";
import { Product } from "../types/Product";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            to={`/product/${product.id}`}
            className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
            <div className="relative aspect-[4/5] overflow-hidden">

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4 rounded-full bg-black/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    {product.category}
                </div>

            </div>

            <div className="p-5">

                <h3 className="text-xl font-bold">
                    {product.name}
                </h3>

                <p className="mt-2 text-3xl font-extrabold">
                    ₦{product.price.toLocaleString()}
                </p>

                <button className="mt-6 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-yellow-500 hover:text-black">
                    View Product
                </button>

            </div>
        </Link>
    );
}

export default ProductCard;