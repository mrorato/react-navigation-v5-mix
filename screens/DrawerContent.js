import React from 'react';
import Airtable from 'airtable';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from '../components/context';

const base = new Airtable({apiKey: 'keyTkRzZch5L5fRBj'}).base(
  'appzbWSyUGrDmyr4A',
);

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const [userId, setUserId] = React.useState([]);
  const [data, setData] = React.useState({
    isEmpty: true,
    Nome: '',
    Avatar: '',
    Id: '',
    isAdmin: false,
  });
  function searchId(idUser) {
    base('Colaboradores').find(idUser, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      setUserId(record);
      console.log('Retrieved', record);
    });
    setData({
      ...data,
      isEmpty: false,
      Id: userId.fields.userToken,
      Nome: userId.fields.Nome,
      Avatar: userId.fields.user_avatar[0].url,
      isAdmin: userId.fields.isAdmin,
    });
   // return userId;
  }

  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        searchId(value);
        console.log('value', value);
      }
    } catch (error) {
      console.log('value');
      // Error retrieving data
    }
  };
  if (data.isEmpty) {
    getUserId();
  }
  // getUserId();
  // searchId(userFound);
  const {signOut, toggleTheme} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: `${data.Avatar}`,
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{data.Nome}</Title>
                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color}) => (
                <Icon name="shopping-basket" color={color} size={20} />
              )}
              label="Mercados"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="user" color={color} size={20} />
              )}
              label="Conta Usuário"
              onPress={() => {
                props.navigation.navigate('Notifications');
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            /> */}
            <SafeAreaView>
              {data.isAdmin ? (
                <DrawerItem
                  icon={({color}) => (
                    <Icon name="calendar-check-o" color={color} size={20} />
                  )}
                  label="Relatório Diário"
                  onPress={() => {
                    props.navigation.navigate('ReportScreen');
                  }}
                />
              ) : null}
            </SafeAreaView>
            {/* <SafeAreaView>
              {data.isAdmin ? ( */}
            {/* <DrawerItem
              icon={({color}) => (
                <Icon name="list-alt" color={color} size={20} />
              )}
              label="Estoque"
              onPress={() => {
                props.navigation.navigate('Notifications');
              }}
            /> */}
            {/* ) : null} */}
            {/* </SafeAreaView> */}
          </Drawer.Section>
          <Drawer.Section title="Preferências">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Tema escuro</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="sign-out" color={color} size={size} />
          )}
          label="Sair"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#bd9c4e',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
