/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import Airtable from 'airtable';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  Linking,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

//import User from '../components/User';
const supportedURL =
  'https://drive.google.com/file/d/1CssYJ44iA2UKyz88FVMiZmgyMhSnnXT8/view?usp=sharing';
const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Erro ao abrir: ${url}`);
    }
  }, [url]);

  return (
    // <Button
    //   style={{borderRadius: 80}}
    //   title={children}
    //   onPress={handlePress}
    //   color="#C89C00"
    // />
    <TouchableOpacity style={styles.productButton} onPress={handlePress}>
      <Text style={styles.productButtonText}>{children}</Text>
      <Icon name="refresh" color={'white'} size={30} />
    </TouchableOpacity>
  );
};

function DetailsScreen() {
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = React.useState([]);
  const [e_mail, setE_mail] = React.useState([]);
  const [pass_word, setPass_word] = React.useState([]);
  const [data, setData] = React.useState({
    isEmpty: true,
    Nome: '',
    Avatar: '',
    Password: '',
    Email: '',
    Id: '',
    isAdmin: false,
  });
  //   const [Qtd_Sugerida_, setQtd_Sugerida] = useState([]);
  function updateUser(pass, mail, id) {
    base('Colaboradores').update(
      [
        {
          id: id,
          fields: {
            password: pass,
            email: mail,
          },
        },
      ],
      function(err, user) {
        if (err) {
          console.error(err);
          return;
        }
      },
    );
    Alert.alert('Sucesso!', 'Dados atualizados!', [{text: 'Ok'}]);
  }
  function searchId(idUser) {
    base('Colaboradores').find(idUser, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      setUserId(record);
      console.log('Retrieved', record);
    });
    setData({
      ...data,
      isEmpty: false,
      Id: userId.id,
      Nome: userId.fields.Nome,
      Password: userId.fields.password,
      Email: userId.fields.email,
      Avatar: userId.fields.user_avatar[0].url,
      isAdmin: userId.fields.isAdmin,
    });
    setPass_word(userId.fields.password);
    setE_mail(userId.fields.email);
    return userId;
  }

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        searchId(value);
        console.log('value', value);
      }
    } catch (error) {
      console.log('value');
      // Error retrieving data
    }
  };
  if (data.isEmpty) {
    getUserId();
  }

  const textInputQtd = val => {
    setPass_word(val);
  };
  const textInputQtdSug = val => {
    setE_mail(val);
  };

  return (
    <ScrollView style={styles.productContainer}>
      <Text style={styles.productTitle}>{data.Nome}</Text>
      <Image
        style={styles.productImage}
        source={{
          uri: `${data.Avatar}`,
        }}
      />
      <View>
        <Input
          label="Nova senha"
          placeholder={data.Password}
          leftIcon={{type: 'font-awesome', name: 'key', color: '#C89C00'}}
          // numeric
          // value // This prop makes the input to get numeric only
          // keyboardType={'numeric'} // This prop help to open numeric keyboard
          onChangeText={val => textInputQtd(val)}
        />
        <Input
          label="Trocar email"
          placeholder={data.Email}
          leftIcon={{type: 'font-awesome', name: 'envelope', color: '#C89C00'}}
          // numeric
          // value // This prop makes the input to get numeric only
          // keyboardType={'numeric'} // This prop help to open numeric keyboard
          onChangeText={val => textInputQtdSug(val)}
        />
      </View>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          updateUser(pass_word, e_mail, data.Id);
        }}>
        <Text style={styles.productButtonText}>ATUALIZAR</Text>
        <Icon name="upload" color={'white'} size={30} />
      </TouchableOpacity>
      <View style={{paddingTop: 20, marginBottom: 80}}>
        <Text style={{fontSize: 20, padding: 10}}>Aplicativo</Text>
        <OpenURLButton url={supportedURL}>ATUALIZAR</OpenURLButton>
      </View>
    </ScrollView>
  );
}
export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  InputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 85,
    height: 85,
    borderRadius: 100,
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
