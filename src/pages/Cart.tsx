import { Link } from "react-router-dom";

import CartItem from "../components/CartItem";

import { useCart } from "../context/temp";



function Cart() {


    const {
        cart,
        total
    } = useCart();




    return (

        <section className="py-16">


            <div className="container">


                <h1 className="text-4xl font-bold mb-10">

                    Your Cart

                </h1>




                {cart.length === 0 ? (


                    <div>


                        <p className="text-gray-600 mb-5">

                            Your cart is empty.

                        </p>


                        <Link

                            to="/shop"

                            className="bg-black text-white px-6 py-3 rounded"

                        >

                            Continue Shopping

                        </Link>


                    </div>


                ) : (



                    <div>


                        <div>


                            {cart.map(item => (

                                <CartItem

                                    key={item.id}

                                    item={item}

                                />

                            ))}


                        </div>




                        <div className="mt-10 border-t pt-8">


                            <h2 className="text-2xl font-bold">

                                Total:
                                {" "}
                                ₦{total.toLocaleString()}

                            </h2>




                            <Link

                                to="/checkout"

                                className="inline-block mt-6 bg-black text-white px-8 py-3 rounded"

                            >

                                Proceed To Checkout

                            </Link>


                        </div>



                    </div>


                )}



            </div>


        </section>

    );

}



export default Cart;