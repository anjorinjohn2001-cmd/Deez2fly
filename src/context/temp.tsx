import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";

import { Product } from "../types/Product";


interface CartItem extends Product {
    quantity: number;
}


interface CartContextType {

    cart: CartItem[];

    addToCart: (
        product: Product
    ) => void;

    removeFromCart: (
        id: string
    ) => void;

    clearCart: () => void;

    total: number;

}


const CartContext = createContext<CartContextType | undefined>(
    undefined
);



export function CartProvider({
    children
}: {
    children: ReactNode;
}) {


    const [cart, setCart] = useState<CartItem[]>([]);



    function addToCart(product: Product) {

        setCart((current) => {

            const existing = current.find(
                item => item.id === product.id
            );


            if (existing) {

                return current.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            }


            return [
                ...current,
                {
                    ...product,
                    quantity: 1
                }
            ];

        });

    }



    function removeFromCart(id: string) {

        setCart(current =>
            current.filter(
                item => item.id !== id
            )
        );

    }



    function clearCart() {

        setCart([]);

    }



    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );



    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                total
            }}
        >

            {children}

        </CartContext.Provider>

    );

}



export function useCart() {

    const context = useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }


    return context;

}