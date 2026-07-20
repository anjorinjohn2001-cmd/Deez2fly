import { Product } from "../types/product";

import { useCart } from "../context/temp";


interface CartProduct extends Product {

    quantity: number;

}


interface Props {

    item: CartProduct;

}



function CartItem({
    item
}: Props) {


    const {
        removeFromCart
    } = useCart();



    return (

        <div className="flex items-center justify-between border-b py-5">


            <div className="flex items-center gap-5">


                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                />


                <div>

                    <h3 className="font-semibold">
                        {item.name}
                    </h3>


                    <p className="text-gray-600">
                        Quantity: {item.quantity}
                    </p>


                    <p>
                        ₦{(item.price * item.quantity).toLocaleString()}
                    </p>


                </div>


            </div>



            <button

                onClick={() => removeFromCart(item.id)}

                className="bg-red-600 text-white px-4 py-2 rounded"

            >

                Remove

            </button>


        </div>

    );

}


export default CartItem;