import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Stock from '../pages/Stock';
import {Avatar} from 'react-native-elements';

const BookmarkScreen = ({route}) => {
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
            marginRight: 1,
          }}
          rounded
          source={{
            uri: `${Logo}`,
          }}
        />
        <Text style={styles.clientTitle}>{nomeMercado}</Text>

        {/* <Text style={styles.clientSubTitle}>{Rede}</Text> */}
      </View>
      <View style={{marginBottom: 0}}>
        <Button
          title="Voltar"
          color="#c8aa62"
          onPress={() => navigation.goBack()}
        />
        <Stock id={itemId} active={true} />
      </View>
      {/* <Button title="Click Here" onPress={() => alert('Button Clicked!')} /> */}
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8aa62',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
  },
});
