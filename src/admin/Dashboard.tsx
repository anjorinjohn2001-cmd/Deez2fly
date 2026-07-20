import { Link } from "react-router-dom";


function Dashboard() {


    return (

        <section className="py-16">


            <div className="container">


                <h1 className="text-4xl font-bold mb-10">

                    DEEZ2FLY Admin Dashboard

                </h1>



                <div className="grid md:grid-cols-3 gap-8">


                    <Link

                        to="/admin/products"

                        className="border rounded-lg p-8 hover:shadow-lg transition"

                    >

                        <h2 className="text-2xl font-bold">

                            Products

                        </h2>


                        <p className="mt-3 text-gray-600">

                            Add, edit and delete clothing items.

                        </p>


                    </Link>





                    <div className="border rounded-lg p-8">


                        <h2 className="text-2xl font-bold">

                            Orders

                        </h2>


                        <p className="mt-3 text-gray-600">

                            Manage customer orders.

                        </p>


                    </div>





                    <div className="border rounded-lg p-8">


                        <h2 className="text-2xl font-bold">

                            Analytics

                        </h2>


                        <p className="mt-3 text-gray-600">

                            View store performance.

                        </p>


                    </div>



                </div>


            </div>


        </section>

    );

}


export default Dashboard;