import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RelatDia from '../pages/relatorio/relat_dia';
import {Icon, BottomSheet, ListItem, Button} from 'react-native-elements';
function refreshPage() {
  window.refreshPage();
}
const ReportScreen = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const list = [
    {title: 'List Item 1'},
    {title: 'List Item 2'},
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <View style={styles.container}>
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <Text style={styles.clientTitle}> Relatório Diário </Text>
      <Button
        title="Solid Button"
        onPress={() => {
          // window.refreshPage();
          // setIsVisible(true);
        }}
      />
      <RelatDia />
    </View>
  );
};

export default ReportScreen;

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
