import { act } from "react";

const CartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, amount, SingleProducts } = action.payload;

        let uniqueId = `${id}_${SingleProducts.amount}`;
        let existingProduct = state.Cart.find(
            (curE) => curE.id === uniqueId
        );
        if (existingProduct) {
            let updateProduct = state.Cart.map((curE) => {
                if (curE.id === uniqueId) {
                    let newamount = curE.amount + amount
                    if (newamount >= curE.max) {
                        newamount = curE.max
                    }
                    return {
                        ...curE,
                        amount: newamount,
                    }
                } else {
                    return curE;
                }

            });
            return {
                ...state,
                Cart: updateProduct,

            }
        } else {

            let cartproduct = {
                id: uniqueId,
                name: SingleProducts.name,
                amount,
                image: SingleProducts.image,
                price: SingleProducts.price,
                max: SingleProducts.stock,
                plantType: SingleProducts.plantType,

            };
            return {
                ...state,
                Cart: [...state.Cart, cartproduct],

            }
        }


    };

    /* logic of amount qty decrement and increment  */


    if (action.type === "SET_DECREMENT") {
        let updateProduct = state.Cart.map((CURM) => {
            if (CURM.id === action.payload) {
                let decamount = CURM.amount - 1;
                if (decamount <= 1) {
                    decamount = 1;
                }
                return {
                    ...CURM,
                    amount: decamount
                }
            } else {
                return CURM;
            }
        }
        )
        return { ...state, Cart: updateProduct }
    }
    if (action.type === "SET_INCREMENT") {
        let updateProduct = state.Cart.map((CURM) => {
            if (CURM.id === action.payload) {
                let Incamount = CURM.amount + 1;
                if (Incamount >= CURM.max) {
                    Incamount = CURM.max
                }
                return {
                    ...CURM,
                    amount: Incamount
                }
            } else {
                return CURM;
            }
        }
        )
        return { ...state, Cart: updateProduct }
    }

    /* Update Cart Icon Value */
    if (action.type === "SET_CART_ICON_ITEM") {
        let updatecartValue = state.Cart.reduce((initialVal, CurElm) => {
            let { amount } = CurElm
            initialVal = initialVal + amount;
            return initialVal
        }, 0)
        return {
            ...state,
            total_item: updatecartValue,
        }
    }
    if (action.type === "REMOVE_ITEM") {
        let updatedCart = state.Cart.filter((curt) => curt.id !== action.payload)
        return {
            ...state,
            Cart: updatedCart,
        }

    }
    if (action.type === "CLEAR_CART_ITEM") {
        return {
            ...state,
            Cart: []
        }
    }
    /* total item price and shipping logic */
    if (action.type === "TOTAL_PRICE_ITEM") {
        let total_price = state.Cart.reduce((initialVal, CurElm) => {
            let { price, amount } = CurElm
            initialVal = initialVal + price * amount;
            return initialVal
        }, 0)
        return {
            ...state,
            total_price,
        }
    }
    return state;
}
export default CartReducer