import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, Button} from 'react-native';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import useCategories from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {useContext} from 'react';
import {ProductsContext} from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

const ProductScreen = ({route, navigation}: Props) => {
  const {name = '', id = ''} = route.params;
  const {categories, isLoading} = useCategories();
  const {loadProductById, addProduct, updateProduct} =
    useContext(ProductsContext);
  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nombre del producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;

    let product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
    console.log(product);
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      let temCategory = categoriaId || categories[0]._id;
      let res = await addProduct(temCategory, nombre);
      onChange(res._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Producto"
          value={nombre}
          onChangeText={val => onChange(val, 'nombre')}
        />

        {/* Picker */}
        <Text style={styles.label}>Seleccione categoría</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(e => (
            <Picker.Item label={e.nombre} value={e._id} key={e._id} />
          ))}
        </Picker>

        <Button title="Guardar" onPress={saveOrUpdate} />

        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Button title="Camara" onPress={() => {}} />
            <Button title="Galeria" onPress={() => {}} />
          </View>
        )}

        {img.length > 0 && (
          <Image
            style={{
              marginTop: 20,
              width: '100%',
              height: 300,
            }}
            source={{
              uri: img,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: '#eee',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default ProductScreen;
