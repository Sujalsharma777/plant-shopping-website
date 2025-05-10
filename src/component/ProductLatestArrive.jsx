import React from "react";
import { NavLink } from "react-router";
import { useProductContext } from "../context/ProductContext"
import FormatePrice from "../Helper/FormatePrice";

const ProductList = () => {
    const { isLoading, latestArrived } = useProductContext();

    if (isLoading) {
        <div>....Loading</div>

    }

    return (
        <section className="m-5">

            <div className="py-10 px-15 text-left">
                <h1 className="text-2xl font-bold underline ">Latest Arrived</h1>
            </div>
            <div className="my-5  grid grid-cols-1  sm:grid-cols-4 gap-8 *:flex *:flex-col *:items-center">

                {latestArrived.map((data) => {
                    return (

                        <div className="text-center relative shadow-gray-400 shadow-md rounded-2xl p-5 " key={data.id} >
                            <div className="w-50 h-50"><img src={data.image} alt="" className="max-h-50 w-50 rounded-2xl" /></div>
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                {data.Discount}%
                            </span>
                            <h2 className="mt-4 text-lg font-medium">{data.name}</h2>
                            <p className="text-red-700 line-through">{<FormatePrice Price={data.price} />} </p>
                            <p className="text-black">Price {<FormatePrice Price={data.price} />} </p>


                            <NavLink to={`/ProductView/${data.id}`} className="w-full p-2 my-3   bg-green-700 text-white rounded-sm">
                                <button>View</button>
                            </NavLink>

                        </div>

                    );
                })}

            </div>
            <div className=" flex justify-center items-center">
                <NavLink to="/Product  " className="p-2 my-3   bg-green-700 text-white rounded-sm">
                    <button>All Product</button>
                </NavLink>
            </div>
        </section >
    );
}

export default ProductList;
