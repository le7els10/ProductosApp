import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, Button} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {ProductStackParams} from '../navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

const ProductScreen = ({route, navigation}: Props) => {
  const {name, id} = route.params;
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Nuevo producto',
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput style={styles.textInput} placeholder="Producto" />

        {/* Picker */}
        <Text style={styles.label}>Seleccione categoría</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

        <Button title="Guardar" onPress={() => {}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Button title="Camara" onPress={() => {}} />
          <Button title="Galeria" onPress={() => {}} />
        </View>
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
