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
        dispatch({ type: "FILTER_PRODUCTS" })
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });

    }, [products, states.filter]);  // optional: you might want to rerun if products change
    // searching value
    const updateFilterValue = (event) => {
        let name = event.target.value;
        let value = event.target.value;
        return dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } })

    }
    return (
        <FilterContext.Provider value={{ ...states, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    );

};

export const useFilterContext = () => {
    return useContext(FilterContext);
};


