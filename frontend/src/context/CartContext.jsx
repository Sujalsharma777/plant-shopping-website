import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/CartReducer"
import { useEffect } from "react";
const CartContext = createContext();
const getLocalCartData = () => {
    let LocalCartData = localStorage.getItem("AddCartProduct");
    if (!LocalCartData) {
        return [];
    } else {
        return JSON.parse(LocalCartData);
    }
};

const initialState = {
    Cart: getLocalCartData() || [],
    total_item: "",
    total_price: "",
    shipping_fee: 10000,
}
export const CartProvider = ({ children }) => {

    const [states, dispatch] = useReducer(reducer, initialState);
    const addtocart = (id, amount, SingleProducts) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, amount, SingleProducts } });

    };
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };
    const RemoveCart = () => {
        dispatch({ type: "CLEAR_CART_ITEM" });
    };
    const SetDicreaces = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id })
    }
    const SetIncreaces = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id })
    }
    useEffect(() => {
        dispatch({ type: "SET_CART_ICON_ITEM" })
        dispatch({ type: "TOTAL_PRICE_ITEM" })
        localStorage.setItem("AddCartProduct", JSON.stringify(states.Cart));
    }, [states.Cart]);

    return <CartContext.Provider value={{ ...states, addtocart, removeItem, RemoveCart, SetDicreaces, SetIncreaces, }}>{children}</CartContext.Provider>
}
export const UseCartContext = () => {
    return useContext(CartContext)
}
