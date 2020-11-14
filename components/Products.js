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
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function updateProducts(data, dataSug, product, userId) {
  // eslint-disable-next-line radix
  const qtd = parseInt(data);
  // eslint-disable-next-line radix
  const qtdSug = parseInt(dataSug);
  console.log('id-to-base:', userId);
  base('Estoque').update(
    [
      {
        id: product.getId(),
        fields: {
          Qtd_Atual: qtd,
          Qtd_Sugerida: qtdSug,
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
  const [data, setData] = React.useState([product.fields.Qtd_Atual]);
  const [dataSug, setDataSug] = React.useState([product.fields.Qtd_Sugerida]);
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
  const textInputQtdSug = val => {
    setDataSug(val);
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
      <View style={styles.InputContainer}>
        <Input
          label="Qtd Atual"
          placeholder={product.fields.Qtd_Atual.toString()}
          leftIcon={{type: 'font-awesome', name: 'clipboard', color: '#C89C00'}}
          numeric
          value // This prop makes the input to get numeric only
          keyboardType={'numeric'} // This prop help to open numeric keyboard
          onChangeText={val => textInputQtd(val)}
        />
        <Input
          label="Qtd Sugerida"
          placeholder={product.fields.Qtd_Sugerida.toString()}
          leftIcon={{type: 'font-awesome', name: 'cart-plus', color: '#C89C00'}}
          numeric
          value // This prop makes the input to get numeric only
          keyboardType={'numeric'} // This prop help to open numeric keyboard
          onChangeText={val => textInputQtdSug(val)}
        />
      </View>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          // checkInput();
          updateProducts(data, dataSug, product, userId);
        }}>
        <Text style={styles.productButtonText}>ATUALIZAR</Text>
        <Icon name="upload" color={'white'} size={30} />
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
  InputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 85,
    height: 85,
    marginTop: 10,
    marginBottom: 10,
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
  textInputTitleProduct: {
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textInputProduct: {
    fontSize: 25,
    color: '#bd9c4e',
    fontWeight: 'bold',
  },
  productContainer: {
    color: 'grey',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#DDD',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  productButton: {
    height: 52,
    borderRadius: 25,
    backgroundColor: '#C89C00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});
