import React, {useEffect, useState} from 'react';
import Airtable from 'airtable';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Stock from '../../components/Stock';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function Stock_general(props) {
  const [stock_general, setStock_general] = useState([]);
  const [isLoading, setIsLoading] = useState(props.active);
  const [propsId, setPropsId] = useState(props.id);

  if (propsId !== props.id) {
    setPropsId(props.id);
    setIsLoading(true);
  }

  //   const [Qtd_Sugerida_, setQtd_Sugerida] = useState([]);
  useEffect(() => {
    base('Estoque')
      .select({
        view: 'Ver_estoque',
        filterByFormula: `{ID_Cliente} = ${props.id}`,
        sort: [{field: 'Cliente_Nome', direction: 'asc'}],
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setStock_general(records);
        // setQtd_Sugerida(records);
        fetchNextPage();
      });
    setIsLoading(false);
  }, [props.id]);

  if (isLoading) {
    return (
      <ScrollView style={styles.clientContainer}>
        <View style={styles.horizontal}>
          <ActivityIndicator
            size="large"
            color="#C89C00"
            animating={isLoading}
          />
          <Text style={{color:'white', fontWeight:'800'}}>AGUARDE...</Text>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.clientContainer}>
        {stock_general.map(stock => (
          <Stock key={stock.id} stock={stock} />
        ))}
      </ScrollView>
    );
  }
}

export default Stock_general;
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
    borderColor: '#DDD',
    borderRadius: 0,
    padding: 20,
    marginBottom: 200,
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
  horizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
});
