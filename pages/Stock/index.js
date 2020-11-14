import React, {useEffect, useState} from 'react';
import Airtable from 'airtable';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Stock from '../../components/Stock';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function Stock_general() {
  const [stock_general, setStock_general] = useState([]);
  //   const [Qtd_Sugerida_, setQtd_Sugerida] = useState([]);
  useEffect(() => {
    base('Estoque')
      .select({
        view: 'Ver_estoque',
        sort: [{field: 'Cliente_Nome', direction: 'asc'}],
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setStock_general(records);
        // setQtd_Sugerida(records);
        fetchNextPage();
      });
  }, []);

  return (
    <ScrollView style={styles.clientContainer}>
      {stock_general.map(stock => (
        <Stock key={stock.id} stock={stock} />
      ))}
    </ScrollView>
  );
}

export default Stock_general;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    borderColor: '#DDD',
    borderRadius: 0,
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
