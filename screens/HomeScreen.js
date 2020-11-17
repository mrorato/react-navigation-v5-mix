import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Text style={styles.welcome}>Bem Vindo!</Text>
      {/* <Text style={{color: colors.text}}>Home Screen</Text> */}
      <Text style={styles.subtitle}>
        Navege através do menu lateral ou inferior.
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 40,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
  },
});
