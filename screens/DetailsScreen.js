import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Stock from '../pages/Stock';
const DetailsScreens = () => {
  return (
    <View style={styles.container}>
      <Stock />
      {/* <Button title="Click Here" onPress={() => alert('Button Clicked!')} /> */}
    </View>
  );
};

export default DetailsScreens;

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
    padding: 20,
  },
});
