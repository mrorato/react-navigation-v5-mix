import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

// function ListProducts() {
//   navigation.navigate('Explore');
// }

const Client = ({client}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.clientContainer}>
      <Text style={styles.clientTitle}>{client.fields.Nome}</Text>
      <TouchableOpacity
        style={styles.clientButton}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Explore', {
            itemId: client.fields.ID,
            nomeMercado: client.fields.Nome,
          });
        }}>
        <Text style={styles.clientButtonText}>Ver produtos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Client;

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
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  clientButton: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#C89C00',
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
