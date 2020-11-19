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

import Product from '../../components/Products';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

function Products(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [propsId, setPropsId] = useState(props.id);

  if (propsId !== props.id) {
    setPropsId(props.id);
    setIsLoading(true);
  }
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
    setIsLoading(false);
  }, [props.id]);

  if (isLoading) {
    return (
      <ScrollView style={styles.container}>
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
      <ScrollView style={styles.container}>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ScrollView>
    );
  }

  // return (
  //   <ScrollView style={styles.container}>
  //     <View style={styles.horizontal}>
  //       <ActivityIndicator size="large" color="#C89C00" animating={isLoading} />
  //     </View>
  //     <ListProducts />
  //   </ScrollView>
  // );
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
  horizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
});
