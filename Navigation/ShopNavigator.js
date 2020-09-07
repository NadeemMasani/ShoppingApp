import  React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems, DrawerNavigatorItems} from 'react-navigation-drawer'

import ProductsOverviewScreen from '../Screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../Screens/shop/ProductDetailsScreen';
import CartScreen from '../Screens/shop/CartScreen';
import OrdersScreen from '../Screens/shop/OrdersScreen';
import UserProductScreen from '../Screens/user/UserProductScreen';
import EditProductScreen from '../Screens/user/EditProductScreen';
import AuthScreen from '../Screens/user/AuthScreen';
import StartupScreen from '../Screens/StartupScreen';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import Colors from '../Constants/colors';
import { Ionicons } from '@expo/vector-icons';
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'; 

const defaultNavOptions = {
    headerStyle : {
        backgroundColor : Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor : Platform.OS ==='android' ? 'white' : Colors.primary

}

const ProductsNavigator = createStackNavigator({
    ProductsOverview : ProductsOverviewScreen,
    ProductDetail : ProductDetailsScreen,
    Cart: CartScreen,
},{
    navigationOptions : {
        drawerIcon : drawerConfig => <Ionicons
                                        name ={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
                                        size = {23}
                                        color = {drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions : defaultNavOptions

});

const OrdersNavigator = createStackNavigator({
    Orders : OrdersScreen,
},{
    navigationOptions : {
        drawerIcon : drawerConfig => <Ionicons 
                                        name ={Platform.OS === 'android' ? 'md-list': 'ios-list'}
                                        size = {23}
                                        color = {drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions : defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProducts : UserProductScreen,
    EditProducts : EditProductScreen,
},{
    navigationOptions : {
        drawerIcon : drawerConfig => <Ionicons 
                                        name ={Platform.OS === 'android' ? 'md-create': 'ios-create'}
                                        size = {23}
                                        color = {drawerConfig.tintColor}
                                    />
    },
    defaultNavigationOptions : defaultNavOptions
});


const shopNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders : OrdersNavigator,
    Admin : AdminNavigator
},{
    contentOptions : {
        activeTintColor : Colors.primary,
    },
    contentComponent : props => {
        const dispatch = useDispatch();
        return (
            <View style = {{flex : 1, paddingTop : 20}}>
                <SafeAreaView forceInset = {{top : 'always', horizontal : 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                        <Button 
                            title ='Logout'
                            color = {Colors.primary}
                            onPress = {() =>{
                                dispatch(authActions.logout());
                                //props.navigation.navigate('Auth');
                            }}
                        />
                </SafeAreaView>
            </View>
        );

    }
});

const AuthNavigator = createStackNavigator({
    Auth : AuthScreen
},{
    defaultNavigationOptions : defaultNavOptions
});
const MainNavigator = createSwitchNavigator({
    Startup : StartupScreen,
    Auth :AuthNavigator,
    Shop : shopNavigator
});

export default createAppContainer(MainNavigator);