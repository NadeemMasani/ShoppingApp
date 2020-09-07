import React from 'react';
import {View,Text,StyleSheet, FlatList, Platform, Button, Alert} from 'react-native';
import ProductItem from '../../Components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/HeaderButton';
import Colors from '../../Constants/colors';
import  * as cartActions  from '../../store/actions/products';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.product.userProducts)
    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProducts', { productId : id } )

    };
    const deleteHandler =(id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',[
            {text : 'No', style : 'default'},
            {text : 'Yes', style : 'destructive', onPress : ()=> {
                dispatch(cartActions.deleteProduct(id));
            }
        }
        ] );
    }
    return (
        <FlatList
            data =  {userProducts}
            keyExtractor = {item => item.id.toString()}
            renderItem = {itemData => <ProductItem
                                            image = {itemData.item.imageUrl}
                                            title = {itemData.item.title}
                                            price = {itemData.item.price}
                                            onSelect = {()=>{
                                                editProductHandler(itemData.item.id);
                                            }}
                                      >
                                        <Button
                                            color ={Colors.primary}
                                            title="Edit" 
                                            onPress = {()=>{
                                                editProductHandler(itemData.item.id);
                                            }}
                                        />
                                        <Button 
                                            color ={Colors.primary} 
                                            title="Delete Product" 
                                            onPress = {deleteHandler.bind(this,itemData.item.id)}
                                        />                                          
                                      </ProductItem>
                         }
        />   
    );
}

UserProductScreen.navigationOptions = navData =>{
    return {
        headerTitle : 'Your Products',
        headerLeft:()=>(<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item 
                title='Menu'
                iconName = {Platform.os ==='android' ? 'md-menu': 'ios-menu' }
                onPress = {()=>{
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>),
        headerRight:()=>(<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item 
                title='Add'
                iconName = {Platform.os ==='android' ? 'md-create': 'ios-create' }
                onPress = {()=>{
                    navData.navigation.navigate('EditProducts');
                }}
            />
        </HeaderButtons>)       
    }
};

const styles = StyleSheet.create({});

export default UserProductScreen ;