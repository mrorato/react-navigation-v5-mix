import * as React from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function updateProducts(data, product, userId) {
  // eslint-disable-next-line radix
  const qtd = parseInt(data);
  console.log('id-to-base:', userId);
  base('Estoque').update(
    [
      {
        id: product.getId(),
        fields: {
          Qtd_Atual: qtd,
          Colaborador: [userId],
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
  const [userId, setUserId] = React.useState([]);
  const [data, setData] = React.useState([]);
  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        setUserId(value);
      }
    } catch (error) {
      console.log('value');
      // Error retrieving data
    }
  };
  getUserId();
  const textInputQtd = val => {
    setData(val);
  };
  return (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{product.fields.Produto_Nome}</Text>
      <Image
        style={styles.productImage}
        source={{
          uri: `${product.fields.Foto[0].url}`,
        }}
      />
      <Text>Qtd atual:</Text>
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
          updateProducts(data, product, userId);
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
    width: 85,
    height: 85,
    flex: 1,
    alignSelf: 'center',
  },
  productTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343333',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEADD',
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
