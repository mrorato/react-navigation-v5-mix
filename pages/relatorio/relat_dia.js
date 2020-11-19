import React, {useEffect, useState} from 'react';
import Airtable from 'airtable';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import Reldia from '../../components/Reldia';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function RelatDia() {
  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const [isGetReport, setIsGetReport] = React.useState(true);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getReport();
  }, []);
  const [relatDia, setRelat_dia] = useState([]);
  function getReport() {
    base('Estoque')
      .select({
        view: 'Relat_dia',
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setRelat_dia(records);

        // setQtd_Sugerida(records);
        fetchNextPage();
      });
    setIsGetReport(false);
    setRefreshing(false);
  }
  //   const [Qtd_Sugerida_, setQtd_Sugerida] = useState([]);
  if (isGetReport) {
    getReport();
  }

  return (
    <ScrollView
      style={styles.clientContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {relatDia.map(relat_dia => (
        <Reldia key={relat_dia.id} relat_dia={relat_dia} />
      ))}
    </ScrollView>
  );
}

export default RelatDia;
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
