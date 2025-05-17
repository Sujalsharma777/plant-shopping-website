import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "../context/ProductContext";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    filter: {
        text: "",
    },
};

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();
    const [states, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
    }, [products]);

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
    }, [states.filter]);

    const updateFilterValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
    };

    return (
        <FilterContext.Provider value={{ ...states, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    return useContext(FilterContext);
};
