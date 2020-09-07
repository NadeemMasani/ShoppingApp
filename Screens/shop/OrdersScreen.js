import  React, {useEffect, useState} from 'react';
import {FlatList,Text,Platform, ActivityIndicator,View,StyleSheet} from 'react-native';
import {useSelector, useDispatch }  from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/HeaderButton';
import OrderItem from '../../Components/shop/OrderItem';
import * as oderActions from '../../store/actions/orders';
import Colors from '../../Constants/colors';
const OrdersScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    useEffect( () => {
        setIsLoading(true);
        dispatch(oderActions.fetchOrders()).then(()=>{
            setIsLoading(false);
        });
    },[dispatch]);

    if(isLoading){
        return (<View style = {styles.loading}>
            <ActivityIndicator size='large' color = {Colors.primary} />
        </View>)
    }

    if (orders.length === 0){
        return <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
            <Text> No Orders Found , Pleaser Oder some products!!</Text>
        </View>
    }
    return (<FlatList
                data = {orders}
                keyExtractor = {item => item.id}
                renderItem = {itemData => <OrderItem 
                                            ammount ={itemData.item.totalAmmount}
                                            date = {itemData.item.readableDate}
                                            items = {itemData.item.items}
                                         /> 
                             }        
           />
    );    
};

OrdersScreen.navigationOptions = navData =>{
    return {
        headerTitle : 'Your Orders',
        headerLeft:()=>(<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item 
                title='Menu'
                iconName = {Platform.os ==='android' ? 'md-menu': 'ios-menu' }
                onPress = {()=>{
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>)
    

    }
    
};

const styles = StyleSheet.create({
    loading :{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});
export default OrdersScreen;

