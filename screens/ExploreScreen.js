import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Products from '../pages/products';

const ExploreScreen = ({route}) => {
  const {itemId, nomeMercado, Rede} = route.params;
  console.log('retorno id: ', itemId);
  return (
    <View style={styles.container}>
      <Text style={styles.clientTitle}>{nomeMercado}</Text>
      <Text style={styles.clientSubTitle}>{Rede}</Text>
      <Products id={itemId} />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8aa62',
  },
  clientTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20,
  },
  clientSubTitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
