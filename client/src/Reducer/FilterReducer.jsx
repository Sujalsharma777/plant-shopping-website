const FilterReducer = (states, action) => {

    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

            return {

                ...states,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            }



        case "UPDATE_FILTER_VALUE":
            const { name, value } = action.payload
            return {
                ...states,
                filter: {
                    ...states.filter,
                    [name]: value,
                },

            }
        case "FILTER_PRODUCTS":
            let { all_products } = states;
            let tempFilterProduct = [...all_products]
            const { text } = states.filter
            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curele) => {
                    return curele.name.toLowerCase().startsWith(text)
                })
            }
            return {
                ...states,
                filter_products: tempFilterProduct,
            }
        default:
            return states;
    }
}
export default FilterReducer