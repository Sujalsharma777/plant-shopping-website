const ProductReducer = (states, action) => {
    switch (action.type) {
        case "Loading_Api":
            return {
                ...states,
                isLoading: true,
            };
        case "Set_Api_Data":
            const isArray = Array.isArray(action.payload);
            const Arrived = isArray
                ? action.payload.filter((curele) => curele.latestArrived === true)
                : [];


            return {
                ...states,
                isLoading: true,
                products: action.payload,
                latestArrived: Arrived,

            };

        case "Api_Error":
            return {
                ...states,
                isLoading: false,
                isError: true,
            };


        //single product 

        case "Set_Single_Loading":
            return {
                ...states,
                isSingleLoading: true,
            };
        case "Set_Single_Product":
            return {
                ...states,
                isSingleLoading: false,
                SingleProducts: Array.isArray(action.payload) ? action.payload[0] : action.payload,
            };
        case "Set_Single_Error":
            return {
                ...states,
                isSingleLoading: false,
                isError: true,
            };
        default:
            return states;
    }
};
export default ProductReducer;
