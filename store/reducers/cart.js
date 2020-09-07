import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/CartItem";
import { REMOVE_FROM_CART } from "../actions/cart";
import {ADD_ORDER} from '../actions/orders';
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items : {} ,
    totalAmmount : 0,
};

export default cartReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_TO_CART :
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if(state.items[addedProduct.id]){
                 updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                );
                return {
                    ...state,
                    items : { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                    totalAmmount : state.totalAmmount + productPrice
                };

            } else {
                 updatedOrNewCartItem = new CartItem(1,productPrice,productTitle,productPrice);
                return {
                    ...state,
                    items : { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                    totalAmmount : state.totalAmmount + productPrice
                };
            };
        case REMOVE_FROM_CART :
            const selectedCartItem = state.items[action.pid]
            const currentQuantity = selectedCartItem.quantity;
            let updatedCartItems;
            if(currentQuantity > 1) {
                // need to reduct Qty by 1 and decrease amt...
                const updatedCartItem = new CartItem(
                                                        selectedCartItem.quantity-1,
                                                        selectedCartItem.productPrice,
                                                        selectedCartItem.productTitle,
                                                        selectedCartItem.sum - selectedCartItem.productPrice
                                                    );
                updatedCartItems = {...state.items , [action.pid]: updatedCartItem}
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }

            return {
                ...state,
                items : updatedCartItems,
                totalAmmount : state.totalAmmount - selectedCartItem.productPrice
            };
        case ADD_ORDER :
            return initialState;
        case DELETE_PRODUCT :
            if( !state.items[action.pid]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum
            delete updatedItems[action.pid];
            return {
                ...state,
                items: updatedItems,
                totalAmmount : state.totalAmmount - itemTotal
            };
    }
    return state;
};