const FilterReducer = (states, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...states,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            };

        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload;
            return {
                ...states,
                filter: {
                    ...states.filter,
                    [name]: value,
                },
            };

        case "FILTER_PRODUCTS":
            const { all_products, filter } = states;
            const { text } = filter;

            let tempFilterProduct = [...all_products];

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((item) =>
                    item.name.toLowerCase().includes(text.toLowerCase())
                );
            }

            return {
                ...states,
                filter_products: tempFilterProduct,
            };

        default:
            return states;
    }
};

export default FilterReducer;
