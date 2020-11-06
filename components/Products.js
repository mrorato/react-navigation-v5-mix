import React, {useEffect, useState} from 'react';
import Airtable from 'airtable';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function updateProducts(data, product) {
  // eslint-disable-next-line radix
  const qtd = parseInt(data);
  base('Estoque').update(
    [
      {
        id: product.getId(),
        fields: {
          Qtd_Atual: qtd,
        },
      },
    ],
    function(err, product) {
      if (err) {
        console.error(err);
        return;
      }
    },
  );
  Alert.alert('Sucesso!', `${product.fields.Produto_Nome} atualizado!`, [
    {text: 'Ok'},
  ]);
}

const Product = ({product}) => {
  const [data, setData] = React.useState([]);
  const textInputQtd = val => {
    setData(val);
  };
  return (
    <View style={styles.productContainer}>
      <Image
        style={styles.productImage}
        source={{
          uri: `${product.fields.Foto[0].url}`,
        }}
      />
      <Text style={styles.productTitle}>{product.fields.Produto_Nome}</Text>
      <TextInput
        style={styles.textInputProduct}
        placeholder={product.fields.Qtd_Atual.toString()}
        numeric
        value // This prop makes the input to get numeric only
        keyboardType={'numeric'} // This prop help to open numeric keyboard
        onChangeText={val => textInputQtd(val)}
      />
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          updateProducts(data, product);
        }}>
        <Text style={styles.productButtonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: 50,
    height: 50,
  },
  productTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343333',
  },
  textInputProduct: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  productContainer: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#C89C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
