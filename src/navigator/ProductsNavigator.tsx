import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ProductScreen from '../screens/ProductScreen';
import ProductsScreen from '../screens/ProductsScreen';

export type ProductStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};
const {Navigator, Screen} = createStackNavigator<ProductStackParams>();

const ProductsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#fff',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{title: 'Productos'}}
      />
      <Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{title: 'Producto'}}
      />
    </Navigator>
  );
};

export default ProductsNavigator;
