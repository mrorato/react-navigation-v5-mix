import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {ListItem, Avatar} from 'react-native-elements';
import {Icon} from 'react-native-elements';
// function ListProducts() {
//   navigation.navigate('Explore');
// }

const Reldia = ({relat_dia}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.clientContainer}>
      <ListItem bottomDivider containerStyle={{backgroundColor: '#fff'}}>
        {/* <Avatar rounded source={{uri: `${client.fields.Foto[0].url}`}} /> */}
        <ListItem.Content>
          <ListItem.Title>
            {relat_dia.fields.Nome} - {relat_dia.fields.Data}
          </ListItem.Title>
          <ListItem.Subtitle>
            {relat_dia.fields.Cliente_Nome} - {relat_dia.fields.Label} - {relat_dia.fields.Qtd_Atual}
          </ListItem.Subtitle>
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

export default Reldia;

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
    backgroundColor: 'grey',
    // borderWidth: 1,
    // borderColor: '#DDD',
    // borderRadius: 5,
    // padding: 20,
    // marginBottom: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
