import React from 'react'
import FormatePrice from '../Helper/FormatePrice'
import CartAmount from './CartAmount'
import { MdDelete } from "react-icons/md";
import { UseCartContext } from '../context/CartContext';
const Cartitem = ({ id, name, image, price, amount, plantType, }) => {
    const { removeItem, SetIncreaces, SetDicreaces, addtocart } = UseCartContext()
    const SetDicreacess = () => {
        /*  amount > 1 ? setAmount(amount - 1) : setAmount(1) ; */
    };
    const SetIncreacess = () => {
        /* amount < stock ? setAmount(amount + 1) : setAmount(stock); */
    }

    return (
        <>

            <div className=' grid sm:grid-cols-5  grid-cols-3  sm:gap-36 gap-10 justify-center  *:text-center ' key={id}>
                <div className=' sm:w-40  grid grid-cols-2 sm:items-center text-left m-1'>
                    <figure><img src={image} alt={name} className='w-14 h-14 ring-2 rounded-lg ' />
                    </figure>
                    <div className='flex justify-between items-center flex-col pl-2 *:text-left'>
                        <div className='font-medium text-sm '><span>{name}</span></div>
                        <div><span className='text-sm '>{plantType}</span></div>
                    </div>
                </div>
                <div className=' sm:block hidden' >{<FormatePrice Price={price} />}</div>
                <div className='sm:w-40 w-full grid grid-cols-2 sm:items-center text-left m-1'> <CartAmount Amount={amount}
                    SetDicreace={() => SetDicreaces(id)}
                    SetIncreace={() => SetIncreaces(id)} /></div>
                <div className=' sm:block hidden'>{<FormatePrice Price={price * amount} />}</div>
                <div className=' sm:items-center text-left m-1'>
                    <span className="text-green-800 text-lg" onClick={() => removeItem(id)}><MdDelete /></span>
                </div>

            </div>
        </>
    )
}

export default Cartitem