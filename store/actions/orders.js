import { SET_PRODUCTS } from "./products";
import Order from "../../models/oders";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS'


export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://shoppingappp-3b6d8.firebaseio.com/orders/${userId}.json`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Something Went Wrong Sorry!');
            }
            const resData = await response.json();
            console.log(resData);
            const loadedOrders = [];
            for (const key in resData) {
                loadedOrders.push( new Order(
                   key,
                   resData[key].cartItems,
                   resData[key].totalAmmount,
                   new Date(resData[key].date)
                ));
            }
            dispatch({ type : SET_ORDERS, orders : loadedOrders});
        } catch(err){
            throw err;
        }    
    };
};


export const addOrder = (cartItems, totalAmmount) => {
    return async (dispatch, getState) => {
        const date = new Date();
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://shoppingappp-3b6d8.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmmount,
                date: date.toISOString()
            })
        });

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                ammount: totalAmmount,
                date: date
            }
        });
    };
};