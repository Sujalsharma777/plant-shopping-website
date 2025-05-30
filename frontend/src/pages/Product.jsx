import React from "react";
import { NavLink } from "react-router-dom";
import FormatePrice from "../Helper/FormatePrice";
import { useProductContext } from "../context/ProductContext";
import { useFilterContext } from "../context/FilterContext";
import FilterSearching from "../component/Searching";
import FilterCategory from "../component/Category";


const ProductList = () => {
    const { isLoading } = useProductContext();
    const { filter_products } = useFilterContext();

    if (isLoading) {
        <div>...loading</div>;
    }

    /* return (
        <section className="m-7">
            <div>
                <FilterSearching />
                </div>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-20 *:flex *:flex-col *:items-center">
        return (
            <div className="text-center mt-10 text-xl font-medium">
                Loading products...
            </div>
                );
                );
    */

    return (
        <section className="m-5">
            <div className="flex sm:justify-between sm:flex-row flex-col justify-center ">
                <FilterSearching />
                <FilterCategory />
            </div>
            <div className="my-5 grid grid-cols-1 sm:grid-cols-4 gap-8 *:flex *:flex-col *:items-center">
                {filter_products.map((data) => (
                    <div className="text-center relative shadow-gray-400 shadow-md rounded-2xl p-5" key={data.id}>
                        <div className="w-50 h-50">
                            <img src={data.image} alt={data.name} className="object-cover aspect-square rounded-2xl" />
                        </div>
                        <h2 className="mt-4 text-lg font-medium">{data.name}</h2>
                        <p className="text-red-700 line-through">{<FormatePrice Price={data.price + 50000} />}</p>
                        <p className="text-black">Price{<FormatePrice Price={data.price} />}</p>
                        <NavLink to={`/ProductView/${data.id}`} className="w-full p-2 my-3 bg-green-700 text-white rounded-sm">
                            View
                        </NavLink>


                    </div>
                ))}

            </div>
        </section>
    )
}

export default ProductList