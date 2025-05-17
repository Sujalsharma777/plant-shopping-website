import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const CartAmount = ({ Amount, SetDicreace, SetIncreace }) => {
    return (
        <div className=''>
            <div className=' flex item-center flex-row *:m-2'>
                <button onClick={() => SetDicreace()}><FaMinus /></button>
                <div className=' flex justify-center items-center'>{Amount}</div>
                <button onClick={() => SetIncreace()}><FaPlus /></button>
            </div>
        </div>
    )
}

export default CartAmount