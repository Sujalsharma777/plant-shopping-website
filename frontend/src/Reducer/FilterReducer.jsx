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
            const { all_products,  } = states;
            let tempFilterProduct = [...all_products];
            const { text, plantType } = states.filter;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((item) =>
                    item.name.toLowerCase().includes(text.toLowerCase())
                );
            }
            if(plantType){
                tempFilterProduct = tempFilterProduct.filter((item)=>{
return item.plantType === plantType;
            });
        }
            return {
                ...states,
                filter_products: tempFilterProduct,
            };

        default:
            return states;
    }
};
