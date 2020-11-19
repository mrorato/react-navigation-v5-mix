import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';
import {ListItem, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// function ListProducts() {
//   navigation.navigate('Explore');
// }

const Stock = ({stock}) => {
  //const navigation = useNavigation();
  return (
    <View style={styles.clientContainer}>
      <ListItem bottomDivider containerStyle={{backgroundColor: '#fff'}}>
        <Avatar size={50} rounded source={{uri: `${stock.fields.Foto[0].url}`}} />
        <ListItem.Content>
          <ListItem.Title
            style={{fontSize: 20, paddingBottom: 5, fontWeight: '500'}}>
            {stock.fields.Produto_Nome}
          </ListItem.Title>
          <ListItem.Title style={{fontSize: 23}}>
            <Icon name="clipboard" color={'#000'} size={20} />{' '}
            {stock.fields.Qtd_Atual}
            {'  '}
            <Icon name="cart-plus" color={'#000'} size={20} />{' '}
            {stock.fields.Qtd_Sugerida}
          </ListItem.Title>
          {/* <ListItem.Subtitle>{stock.fields.Mercado}{' '}{stock.fields.Cliente_Nome}</ListItem.Subtitle> */}
        </ListItem.Content>
        {/* <TouchableOpacity
          style={styles.clientButton}
          onPress={() => {
            navigation.navigate('Explore', {
              itemId: client.fields.ID,
              nomeMercado: client.fields.Nome,
              Rede: client.fields.Mercado,
              Logo: client.fields.Foto[0].url,
            });
          }}>
          <ListItem.Chevron name="send" color="#C89C00" size={30} />
          <Text style={styles.clientButtonText}>Ver produtos</Text>
        </TouchableOpacity> */}
      </ListItem>
      {/* <Text style={styles.clientTitle}>{client.fields.Nome}</Text> */}
      {/* <TouchableOpacity
        style={styles.clientButton}
        onPress={() => {
          navigation.navigate('Explore', {
            itemId: client.fields.ID,
            nomeMercado: client.fields.Nome,
          });
        }}>
        <Text style={styles.clientButtonText}>Ver produtos</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Stock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  clientTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343333',
  },
  list: {
    padding: 20,
  },
  clientContainer: {
    color: '#fff',
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#DDD',
    // borderRadius: 5,
    // padding: 20,
    marginBottom: 20,
  },
  clientButton: {
    height: 42,
    width: 42,
    borderRadius: 5,
    // backgroundColor: '#C89C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  clientButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
