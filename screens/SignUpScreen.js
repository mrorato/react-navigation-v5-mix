import React from 'react';
import Airtable from 'airtable';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
  });
  const [emailUser, setEmailUser] = React.useState([]);
  console.log('email init:', emailUser);
  function searchEmail(mailUser) {
    console.log(mailUser);

    base('Colaboradores')
      .select({
        view: 'Users',
        filterByFormula: `NOT({email} != '${mailUser}')`,
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setEmailUser(records);
        fetchNextPage();
      });
    // console.log('result', emailUser[0].fields.email);
    if (emailUser.length === 0) {
      console.log('vazio');
      Alert.alert('Email não encontrado, confira o email digitido!', [
        {text: 'Ok'},
      ]);
    } else {
      console.log('cheio');
      Alert.alert('Sua senha foi enviada para ', `${mailUser}`, [{text: 'Ok'}]);
    }

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#bd9c4e" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Preencha seu email cadastrado</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>E-mail</Text>
          <View style={styles.action}>
            <FontAwesome name="mail" color="#05375a" size={20} />
            <TextInput
              placeholder="digite seu e-mail"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                searchEmail(data.email);
              }}>
              <LinearGradient
                colors={['#bd9c4e', '#bd9c4e']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Solicitar senha
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#bd9c4e',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#bd9c4e',
                  },
                ]}>
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bd9c4e',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#bd9c4e',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bd9c4e',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
