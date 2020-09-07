import PRODUCTS from '../../data/dummy-data';
import  {DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS}  from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts : [],
    userProducts : [],
};


export default (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS :
            return {
                availableProducts : action.products,
                userProducts : action.userProducts
            }
        case CREATE_PRODUCT :
            const newProduct = new Product(
                                    action.productData.id,
                                    action.productData.ownerId,
                                    action.productData.title,
                                    action.productData.imageUrl,
                                    action.productData.description,
                                    action.productData.price
                                );
            console.log("hey  " + action.productData.title + " : " + action.productData.description);
            console.log("Hi create........");
            return {
                ...state,
                availableProducts : state.availableProducts.concat(newProduct),
                userProducts : state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT :
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                                    action.pid,
                                    state.userProducts[productIndex].ownerId,
                                    action.productData.title,
                                    action.productData.imageUrl,
                                    action.productData.description,
                                    state.userProducts[productIndex].price,

                                   );
            console.log("Hiiiiiiiiiii edit");
            const updateUserProducts = [...state.userProducts];
            updateUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updateAvailableProducts = [...state.availableProducts];
            updateAvailableProducts[availableProductIndex] = updatedProduct;


            return {
                ...state,
                availableProducts : updateAvailableProducts,
                userProducts : updateUserProducts
            };
        case DELETE_PRODUCT :
            return {
                ...state,
                userProducts : state.userProducts.filter(product => product.id !== action.pid),
                availableProducts : state.availableProducts.filter(product => product.id !== action.pid)
            }
    }
    return state;
};