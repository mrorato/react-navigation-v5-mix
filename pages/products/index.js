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

import Product from '../../components/Products';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function Products(props) {
  const [products, setProducts] = useState([]);
  //   const [Qtd_Atual, setQtd_Atual] = useState([]);
  //   const [Qtd_Sugerida_, setQtd_Sugerida] = useState([]);
  useEffect(() => {
    base('Estoque')
      .select({
        filterByFormula: `{ID_Cliente} = ${props.id}`,
        view: 'Ver_estoque',
      })
      .eachPage((records, fetchNextPage) => {
        console.log(records);
        setProducts(records);
        // setQtd_Atual(records);
        // setQtd_Sugerida(records);
        fetchNextPage();
      });
  }, [props.id]);

  return (
    <ScrollView style={styles.container}>
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </ScrollView>
  );
}

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#494949',
    padding: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343333',
  },
  list: {
    padding: 20,
  },
  productContainer: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#C89C00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
