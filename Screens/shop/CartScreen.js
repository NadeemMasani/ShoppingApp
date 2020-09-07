import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Constants/colors';
import CartItem from '../../Components/shop/CartItem';
import Card from '../../Components/UI/card';
import * as CartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders';

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const cartTotalAmmount = useSelector(state => state.cart.totalAmmount);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => {
        const transFormedCartItems = [];
        for (const key in state.cart.items) {
            transFormedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transFormedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, cartTotalAmmount));
        setIsLoading(false);
    }
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total :
                    <Text style={styles.ammount}>$ {Math.round(cartTotalAmmount.toFixed(2) * 100) / 100} </Text>
                </Text>
                {isLoading ?
                    (<ActivityIndicator size='small' color={Colors.primary} />
                    ) : (
                        <Button
                            color={Colors.accent}
                            title="Order Now"
                            disabled={cartItems.length === 0}
                            onPress={sendOrderHandler}
                        />
                    )
                }

            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    ammount={itemData.item.sum}
                    price={itemData.item.productPrice}
                    onRemove={() => {
                        dispatch(CartActions.removeFromCart(itemData.item.productId));
                    }}
                    deletable={true}
                />
                }
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontSize: 18
    },
    ammount: {
        color: Colors.primary
    }

});

export default CartScreen;