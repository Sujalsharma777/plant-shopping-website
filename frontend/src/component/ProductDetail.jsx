import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";
import FormatePrice from "../Helper/FormatePrice.jsx";
import Pagenavigation from "../component/Pagenavigation.jsx"
import CartAmount from "../component/CartAmount.jsx";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { UseCartContext } from "../context/CartContext.jsx"
import { toast } from "react-toastify"
const ProductDetail = () => {
    const { addtocart } = UseCartContext();
    const { getSingleProduct, isSingleLoading, SingleProducts } = useProductContext();

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

        stock,
    } = SingleProducts;

    if (isSingleLoading) {
        <div>...Loading</div>
    };
    const [amount, setAmount] = useState(1);
    const SetDicreaces = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1);
    };
    const SetIncreaces = () => {
        amount < stock ? setAmount(amount + 1) : setAmount(stock);
    };
    /* const addToCart = async (SingleProducts) => {
        const token = localStorage.getItem('token');

        try {
            await axios.post('http://localhost:5000/cart', {
                plantType: SingleProducts.plantType,
                price: SingleProducts.price,
                qty: stock,
                imageUrl: SingleProducts.image,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('Product added to cart');
        } catch (error) {
            alert('Login required');
        }
    }; */


    return (
        <>
            <div className="">
                <Pagenavigation title={name} />
                <div className="min-w-1/2 grid justify-center item-center sm:grid-cols-2 grid-rows-2  m-5">
                    <div id="image-side " className="flex justify-center items-center w-full h-full">
                        <div>
                            <img
                                width={1000}
                                src={image}
                                alt={name}
                                className="rounded-2xl shadow-black shadow-lg object-cover aspect-square"
                            />
                        </div>
                    </div>
                    <div id="description-side" className="grid grid-row-7 gap-5">
                        <div>
                            <span className="font-bold text-3xl">{name}</span>
                        </div>
                        <div>MRP <span className="font-bold text-red-600">{<FormatePrice Price={price} />}</span> </div>
                        <div className="text-sm font-light ">{description}</div>

                        <div className="flex gap-5  justify-center ">
                            <div className="flex justify-center items-center flex-col"><TbTruckDelivery className="text-3xl" /><span className="text-sm ">Fast Delivery</span></div>
                            <div className="flex justify-center items-center flex-col" ><LuPackageCheck className="text-3xl " /><span className="text-sm">7 Day Return</span></div>
                            <div className="flex justify-center items-center flex-col"><MdOutlinePayments className="text-3xl " /><span className="text-sm ">Secure Payment</span></div>
                        </div>
                        <hr />
                        <CartAmount Amount={amount}
                            SetDicreace={SetDicreaces}
                            SetIncreace={SetIncreaces} />

                        <div>
                            Category: <span className="font-medium">{plantType}</span>
                        </div>
                        <div>
                            Available Stock: <span className="font-medium">{stock}</span>
                        </div>
                        <div /* onClick={() => addToCart(product)} */>

                            <NavLink to="/Cart" onClick={() => addtocart(id, amount, SingleProducts,)} className="p-2 my-3 bg-green-700 text-white rounded-sm flex justify-center"><button >Add To Cart </button></NavLink>



                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default ProductDetail;
