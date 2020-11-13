import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';
import {ListItem, Avatar} from 'react-native-elements';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
// import pt from 'date-fns/locales/pt';
import Icon from 'react-native-vector-icons/FontAwesome';

// function ListProducts() {
//   navigation.navigate('Explore');
// }

const Reldia = ({relat_dia}) => {
  const data_dia = parseISO(relat_dia.fields.Data);
  const data_formated = format(data_dia, "dd/MM/yy '-' HH:mm'H'");
  // const navigation = useNavigation();
  return (
    <View style={styles.clientContainer}>
      <ListItem bottomDivider containerStyle={{backgroundColor: '#fff'}}>
        <Avatar
          rounded
          source={{uri: `${relat_dia.fields.user_avatar[0].url}`}}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Icon name="calendar" color={'#000'} size={15} /> {data_formated}
          </ListItem.Title>
          <ListItem.Title>
            <Icon name="shopping-basket" color={'#000'} size={15} />{' '}
            {relat_dia.fields.Mercado}:{' '}{relat_dia.fields.Cliente_Nome}
          </ListItem.Title>

          <ListItem.Title>
            <Icon name="archive" color={'#000'} size={15} />{' '}
            {relat_dia.fields.Label}:{' '}{relat_dia.fields.Qtd_Atual} |{' '}
             {relat_dia.fields.Qtd_Sugerida}
          </ListItem.Title>
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
  iconStyle: {
    marginRight: 10,
    padding: 20,
  },
});
