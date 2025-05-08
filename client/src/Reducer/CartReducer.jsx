const CartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, amount, SingleProducts } = action.payload;

        let cartproduct = {
            id,
            name: SingleProducts.name,
            amount,
            image: SingleProducts.image,
            price: SingleProducts.price,
            max: SingleProducts.stock,
            plantType: SingleProducts.plantType,

        }

        return {
            ...state,
            Cart: [...state.Cart, cartproduct],

        }
    }
    return state;
}
export default CartReducer