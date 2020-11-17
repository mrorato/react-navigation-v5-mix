import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Clients from '../pages/clients';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.clientTitle}> Mercados </Text>
      </View>
      <View style={{marginBottom: 50, paddingBottom:1}}>
        <Clients />
      </View>
      {/* <Button title="Click Here" onPress={() => alert('Button Clicked!')} /> */}
    </View>
  );
};

export default ProfileScreen;

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
