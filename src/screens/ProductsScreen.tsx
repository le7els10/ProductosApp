import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
import {FlatList, Text, View} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {ProductStackParams} from '../navigator/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const [refresh, setrefresh] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text style={{marginRight: 10}}>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const loadProductsFromBackend = async () => {
    setrefresh(true);
    await loadProducts();
    setrefresh(false);
  };

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
      }}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={loadProductsFromBackend}
          />
        }
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              });
            }}>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    borderColor: '#eeee',
    marginBottom: 2,
  },
});

export default ProductsScreen;
