import React, { useState,useEffect, useCallback} from 'react';
import {FlatList,Text,Platform, Button, ActivityIndicator, View, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../Components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import {HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Constants/colors';
const ProductOverviewScreen = props => {
    console.log("Loading Producst.......");
    const products = useSelector(state => state.product.availableProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isRefereshing, setIsRefersehing] = useState(false);
    const loadProducts = useCallback( async () => {
        setError(null);
        setIsRefersehing(true);
        try{
        await dispatch(productActions.fetchProducts());
        } catch (err){
            setError(err.message)
        }
        setIsRefersehing(false)
    },[dispatch,setIsLoading, setError]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove();
        };
    },[loadProducts,]);
    
    useEffect(()=>{
        setIsLoading(true);
        loadProducts().then(()=> {
            setIsLoading(false)
        });
    },[dispatch, loadProducts]);

    const selectItemsHandler = (id,title) => {
            props.navigation.navigate('ProductDetail',{
                productId : id ,
                productTitle : title,
            });

    }

    if( error){
        return <View style = {styles.loading}>
        <Text> An error Occured!!!</Text>
        <Button title = 'Try Again' onPress = {loadProducts} color = {Colors.primary}/>
    </View>  

    }

    if (isLoading){
        return <View style = {styles.loading}>
            <ActivityIndicator size= 'large' color = {Colors.primary} />
        </View>
    }

    if (! isLoading && products.length === 0){
        return <View style = {styles.loading}>
            <Text> No Products Found Maybe start adding some!!!</Text>
        </View>
    }

    return (<FlatList
                onRefresh = {loadProducts}
                refreshing = {isRefereshing}
                data = {products}
                keyExtractor = {item => item.id}
                renderItem =    {itemData =><ProductItem
                                                title = {itemData.item.title}
                                                price = {itemData.item.price}
                                                image = {itemData.item.imageUrl}
                                                onSelect = {()=>{
                                                    selectItemsHandler(itemData.item.id, itemData.item.title);
                                                }}
                                            >
                                                <Button
                                                    color ={Colors.primary}
                                                    title="view details" 
                                                    onPress = {()=>{
                                                        selectItemsHandler(itemData.item.id, itemData.item.title);
                                                    }}
                                                />
                                                <Button 
                                                    color ={Colors.primary} 
                                                    title="To cart" 
                                                    onPress = {()=>{
                                                        dispatch(cartActions.addToCart(itemData.item))
                                                    }}
                                                />
                                            </ProductItem>
                                }
             />
    );
};

ProductOverviewScreen.navigationOptions = navData => {
    return {
    headerTitle : 'All Products',
    headerRight:()=>(<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item 
            title='cart'
            iconName = {Platform.os ==='android' ? 'ios-cart': 'ios-cart' }
            onPress = {()=>{
                navData.navigation.navigate('Cart')
            }}
        />
    </HeaderButtons>),
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item 
            title='Menu'
            iconName = {Platform.os ==='android' ? 'md-menu': 'ios-menu' }
            onPress = {()=>{
                navData.navigation.toggleDrawer();
            }}
        />
    </HeaderButtons>)
    
};
}

const styles = StyleSheet.create({
    loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default ProductOverviewScreen;