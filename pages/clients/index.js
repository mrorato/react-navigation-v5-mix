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

import Client from '../../components/Client';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function Clients() {
  const [clients, setClients] = useState([]);
  //   const [Qtd_Sugerida_, setQtd_Sugerida] = useState([]);
  useEffect(() => {
    base('Clientes')
      .select({
        view: 'Grid view',
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setClients(records);
        // setQtd_Sugerida(records);
        fetchNextPage();
      });
  }, []);

  return (
    <ScrollView style={styles.clientContainer}>
      {clients.map(client => (
        <Client key={client.id} client={client} />
      ))}
    </ScrollView>
  );
}

export default Clients;
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
