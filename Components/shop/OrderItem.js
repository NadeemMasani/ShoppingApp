import React, {useState} from 'react';
import {View,Text,StyleSheet, Button} from 'react-native';
import CartItem  from './CartItem';
import Colors from '../../Constants/colors';
import Card from '../UI/card';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return <Card style = {styles.OrderItem}>
        <View style = {styles.summary}>
            <Text style ={styles.totalAmmount}>${props.ammount.toFixed(2)}</Text>
            <Text style = {styles.date}>{props.date}</Text>
        </View>
        <Button 
            color = {Colors.primary}
            title = { showDetails ? 'hide details' : 'Show Details'}
            onPress = {()=>{
                setShowDetails(prevState => !prevState);
            }}
        />
        {showDetails && <View style = {styles.deatils}> 
                {   props.items.map( cartItem =><CartItem 
                                                    key = {cartItem.productId}
                                                    quantity = {cartItem.quantity}
                                                    ammount = {cartItem.sum}
                                                    title = {cartItem.productTitle}
                                                    deltable = {false}
                                                />

                )}
            </View>}
    </Card>
};

const styles = StyleSheet.create({
    OrderItem :{
        margin : 20,
        padding : 10
    },
    summary : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : '100%',
        marginBottom : 15
    },
    totalAmmount : {
        fontSize : 16
    },
    date : {
        fontSize : 16,
        color : '#888'
    },
    deatils :{
        width : '100%'
    }

});

export default OrderItem;