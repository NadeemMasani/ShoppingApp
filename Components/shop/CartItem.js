import React from 'react';
import {View,Text,StyleSheet, Button, TouchableOpacity, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const CartItem = props => {
    return(
        <View style = {styles.cartItem}>
            <View style ={styles.itemData}>
                <Text stylestyle ={styles.quantiy}>{props.quantity} </Text>
                <Text stylestyle ={styles.title}>{props.title}</Text>
            </View>
            <View style ={styles.itemData}>
                <Text style ={styles.ammount}>{props.ammount.toFixed(2)}</Text>
                {props.deletable && (<TouchableOpacity
                    style = {styles.deleteButton}
                    onPress = {props.onRemove}
                >
                    <Ionicons 
                        name = {Platform.OS === 'android' ? 'md-trash': 'ios-trash'}
                        size = {23}
                        color = 'red'

                    />
                </TouchableOpacity>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem : {
        padding : 10,
        backgroundColor : 'white',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 20
    },
    itemData : {
        flexDirection : 'row',
        alignItems : 'center',

    },
    quantiy : {
        fontSize : 16,
    },
    title : {
        fontSize : 16,
    },
    deleteButton : {

    },
    ammount : {
        fontSize : 16,
    }
});

export default CartItem;