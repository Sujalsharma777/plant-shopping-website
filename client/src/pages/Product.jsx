import React from "react";
import { NavLink } from "react-router";
import FormatePrice from "../Helper/FormatePrice";
import { useProductContext } from "../context/ProductContext"
import { useFilterContext } from "../context/FilterContext"
/* import FilterSearching from "../component/FilterSearching" */
const ProductList = () => {
    const { isLoading } = useProductContext();
    if (isLoading) {
        <div>.....Loading</div>
    }

    const { filter_products } = useFilterContext()

    return (
        <section>

            <div className="my-5 m-10 grid grid-cols-1  sm:grid-cols-4 gap-8 *:flex *:flex-col *:items-center">
                {/*    <FilterSearching /> */}
                {filter_products.map((data) => {
                    return (

                        <div className="text-center relative shadow-gray-400 shadow-md rounded-2xl p-5 " key={data.id} >
                            <img src={data.image} alt="" className="max-h-50 w-50 rounded-2xl" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                {data.Discount}%
                            </span>
                            <h2 className="mt-4 text-lg font-medium">{data.name}</h2>
                            <p className="text-red-700 line-through">{<FormatePrice Price={data.price} />}</p>
                            <p className="text-black">Price {<FormatePrice Price={data.price} />}</p>
                            <div className="flex justify-center gap-3">
                                <NavLink to="/Cart" className="p-2 my-3   bg-green-700 text-white rounded-sm">
                                    Add to cart
                                </NavLink>
                                <NavLink to={`/ProductView/${data.id}`} className="p-2 my-3   bg-green-700 text-white rounded-sm">
                                    View
                                </NavLink>
                            </div>
                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default ProductList;
