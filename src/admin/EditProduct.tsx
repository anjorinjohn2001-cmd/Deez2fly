import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    supabase
} from "../lib/supabase";



function EditProduct() {


    const {
        id
    } = useParams();



    const navigate = useNavigate();



    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [price, setPrice] = useState("");

    const [category, setCategory] = useState("");

    const [sizes, setSizes] = useState("");

    const [stock, setStock] = useState("");




    useEffect(() => {

        if (id) {

            loadProduct();

        }

    }, [id]);





    async function loadProduct() {


        const {
            data
        } = await supabase

            .from("products")

            .select("*")

            .eq(
                "id",
                id
            )

            .single();



        if (data) {

            setName(data.name);

            setDescription(data.description);

            setPrice(data.price.toString());

            setCategory(data.category);

            setSizes(
                data.sizes.join(",")
            );

            setStock(
                data.stock.toString()
            );

        }


    }





    async function updateProduct(
        e: React.FormEvent
    ) {


        e.preventDefault();



        await supabase

            .from("products")

            .update({

                name,

                description,

                price: Number(price),

                category,

                sizes: sizes
                    .split(",")
                    .map(
                        item => item.trim()
                    ),

                stock: Number(stock)

            })

            .eq(
                "id",
                id
            );




        navigate("/admin/products");


    }





    return (

        <section className="py-16">


            <div className="container max-w-xl">


                <h1 className="text-4xl font-bold mb-8">

                    Edit Product

                </h1>




                <form

                    onSubmit={updateProduct}

                    className="space-y-5"

                >



                    <input

                        value={name}

                        className="w-full border p-3 rounded"

                        onChange={
                            e => setName(e.target.value)
                        }

                    />




                    <textarea

                        value={description}

                        className="w-full border p-3 rounded"

                        onChange={
                            e => setDescription(e.target.value)
                        }

                    />





                    <input

                        value={price}

                        type="number"

                        className="w-full border p-3 rounded"

                        onChange={
                            e => setPrice(e.target.value)
                        }

                    />





                    <input

                        value={category}

                        className="w-full border p-3 rounded"

                        onChange={
                            e => setCategory(e.target.value)
                        }

                    />





                    <input

                        value={sizes}

                        className="w-full border p-3 rounded"

                        onChange={
                            e => setSizes(e.target.value)
                        }

                    />





                    <input

                        value={stock}

                        type="number"

                        className="w-full border p-3 rounded"

                        onChange={
                            e => setStock(e.target.value)
                        }

                    />





                    <button

                        className="bg-black text-white px-8 py-3 rounded w-full"

                    >

                        Save Changes

                    </button>




                </form>


            </div>


        </section>

    );

}


export default EditProduct;