import { createContext, useContext, useReducer } from "react";
import Reducer from "../Reducer/CartReducer"
const CartContext = createContext()
const initialState = {
    Cart: [],
    total_item: "",
    total_amount: "",
    shiping_fess: 500000,
}
export const CartProvider = ({ children }) => {

    const [states, dispatch] = useReducer(Reducer, initialState);
    const addtocart = (id, amount, SingleProducts) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, amount, SingleProducts } });

    };
    return <CartContext.Provider value={{ ...states, addtocart }}
    >{children}</CartContext.Provider>
}
export const UseCartContext = () => {
    return useContext(CartContext)
}
