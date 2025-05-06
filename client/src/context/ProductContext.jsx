import React, { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import axios from "axios";
import reducer from "../Reducer/ProductReducer"
const AppContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    latestArrived: [],
    isSingleLoading: false,
    SingleProducts: {},
};
const AppProvider = ({ children }) => {
    const API = "https://product-7d4b.onrender.com/Products";
    const [states, dispatch] = useReducer(reducer, initialState);
    const getProducts = async (URL) => {
        dispatch({ type: "Loading_Api" });
        try {
            const res = await axios.get(URL);
            const products = await res.data


            dispatch({ type: "Set_Api_Data", payload: products })
        } catch (error) {
            dispatch({ type: "Api_Error" });
        }
    };
    // Singel api call
    const getSingleProduct = async (urk) => {
        dispatch({ type: "Set_Single_Loading" });
        try {
            const res = await axios.get(urk);
            const SingleProducts = await res.data;

            dispatch({ type: "Set_Single_Product", payload: SingleProducts })
        } catch (error) {
            dispatch({ type: "Set_Single_Error" });
        }
    }

    useEffect(() => {
        getProducts(API);

    }, []);
    return (
        <AppContext.Provider value={{ ...states, getSingleProduct }}>
            {children}
        </AppContext.Provider>
    );
};
const useProductContext = () => {
    return useContext(AppContext)
};
export { AppProvider, AppContext, useProductContext }
