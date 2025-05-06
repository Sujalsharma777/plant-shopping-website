import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";
import FormatePrice from "../Helper/FormatePrice.jsx";
const API = "https://product-7d4b.onrender.com/Products";

const ProductDetail = () => {
    const { getSingleProduct, isSingleLoading, SingleProducts } =
        useProductContext();
    console.log(SingleProducts);
    const { id } = useParams();

    useEffect(() => {
        getSingleProduct(`https://product-7d4b.onrender.com/Products?id=${id}`);
    }, []);
    const {
        id: alies,
        name,
        price,
        description,
        plantType,
        image,
        Care,
        stock,
    } = SingleProducts;

    /* const incrementButton = document.getElementById("increment");
        const decrementButton = document.getElementById("decrement");
        const quantityInput = document.getElementById("qty");
    
        incrementButton.addEventListener("click", () => {
            const currentVal = parseInt(quantityInput.value) || 0;
            quantityInput.value = currentVal + 1;
        });
    
        decrementButton.addEventListener("click", () => {
            const currentVal = parseInt(quantityInput.value) || 1;
            if (currentVal > 1) { // Ensure quantity doesn't go below 1
                quantityInput.value = currentVal - 1;
            }
        }); */
    return (
        <>
            <div className="grid justify-center item-center grid-cols-2  m-5">
                <div id="image-side " className="flex justify-center items-center">
                    <div>
                        <img
                            src={image}
                            alt={name}
                            className="rounded-2xl shadow-black shadow-lg w-80 h-80"
                        />
                    </div>
                </div>
                <div id="description-side" className="grid grid-row-7 gap-5">
                    <div>
                        Best Quality plant <span className="font-bold">{name}</span>
                    </div>
                    <div>MRP <span className="font-bold">{<FormatePrice Price={price} />}</span> </div>
                    <div className="text-sm font-light ">{description}</div>
                    <div>
                        <label htmlFor="">QTY</label>
                        <button id="increment" className="ring-1 p-1 m-2 ring-gray-400">
                            +
                        </button>
                        <input
                            type="number"
                            id="qty"
                            value="1"
                            min="1"
                            className="w-10 h-auto"
                            i
                        />

                        <button id="decrement" className="ring-1 p-1 m-2 ring-gray-400">
                            -
                        </button>
                    </div>
                    <div>
                        Category: <span className="font-bold">{plantType}</span>
                    </div>
                    <div>
                        Avalaibity {stock}
                    </div>
                    <div>

                        <NavLink to="/Cart" className="p-2 my-3   bg-green-700 text-white rounded-sm">Add To Cart </NavLink>



                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
