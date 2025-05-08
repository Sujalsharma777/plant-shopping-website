import React from 'react'
import { UseCartContext } from '../context/CartContext'
import Cartitem from "../component/Cartitem"
const Cart = () => {
    const { Cart } = UseCartContext()
    console.log(Cart)
    return (
        <>

            <div className=' flex justify-center items-center sm:m-2 m-1'>
                <div className=' grid sm:grid-cols-5  grid-cols-3  sm:gap-36 gap-10   *:m-3' >
                    <p>Product</p>
                    <p className='sm:block hidden'>Price</p>
                    <p>QTY</p>
                    <p className='sm:block hidden'>Subtotal</p>
                    <p>Remove</p>
                </div>
            </div>


            <hr />
            <div className=' grid gap-2 sm:m-2 m-1'>
                {
                    Cart.map((curElem) => {
                        return <Cartitem key={curElem.id} {...curElem} />
                    })
                }
            </div>


        </>
    )
}

export default Cart