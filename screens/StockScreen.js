import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Products from '../pages/products';
import {Avatar} from 'react-native-elements';

const StockScreen = ({route}) => {
  const navigation = useNavigation();
  const {itemId, nomeMercado, Rede, Logo} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="medium"
          // eslint-disable-next-line react-native/no-inline-styles
          containerStyle={{
            padding: 5,
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 20,
            marginRight: 10,
          }}
          rounded
          source={{
            uri: `${Logo}`,
          }}
        />
        <Text style={styles.clientTitle}>{nomeMercado}</Text>
        {/* <Text style={styles.clientSubTitle}>{Rede}</Text> */}
      </View>
      <Button
        title="Voltar"
        color="#c8aa62"
        onPress={() => navigation.goBack()}
      />
      <Products id={itemId} />
    </View>
  );
};

export default StockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8aa62',
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  clientTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 0,
  },
  clientSubTitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
