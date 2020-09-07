import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart'
import Colors  from '../../Constants/colors';


const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.product.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();
    return(
        <ScrollView>
            <Image style = {styles.image} source = { {uri : selectedProduct.imageUrl} } />
            <View style = {styles.buttonContainer}>
                <Button color = {Colors.primary} title ="Add to Cart"
                        onPress = {()=>{
                            dispatch(cartActions.addToCart(selectedProduct));
                        }}
                />
            </View>
            <Text style = {styles.price}> ${selectedProduct.price.toFixed(2)} </Text>
            <Text style = {styles.price}> {selectedProduct.description} </Text>
        </ScrollView>
    );
};

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle : navData.navigation.getParam('productTitle')
    };

};

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 300
    },
    price : {
        fontSize : 20,
        color : '#888',
        textAlign : 'center',
        marginVertical : 20
    },

    description : {
        fontSize : 14,
        textAlign : 'center',
        marginHorizontal : 20
    },
    buttonContainer : {
        marginVertical : 10,
        alignItems : 'center'
    }
});

export default ProductDetailsScreen;