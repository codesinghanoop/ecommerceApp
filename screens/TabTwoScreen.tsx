import * as React from 'react';
import { StyleSheet, I18nManager, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TouchableIcon from '../components/TouchableIcon';
import { useDirection } from '../state/hooks';

export default function TabTwoScreen(props: any) {

  const { toggleDirection } = useDirection()

  const toggleRtl = () => {
    toggleDirection()
  }

  const goToAddress = () => {
    props.navigation.navigate('AddressList')
  }

  const goToSetting = () => {
    Linking.openURL('app-settings://notification/myapp')
  }

  const ActionButtons = () => {
    return (
      <>
        <TouchableIcon style={styles.button} onSelect={toggleRtl}>
          <Text style={styles.title}>Toggle RTL</Text>
        </TouchableIcon>
        <TouchableIcon style={styles.button} onSelect={goToSetting}>
          <Text style={styles.title}>Enable Push Notifications</Text>
        </TouchableIcon>
        <TouchableIcon style={styles.button} onSelect={goToSetting}>
          <Text style={styles.title}>Enable Locations</Text>
        </TouchableIcon>
        <TouchableIcon style={styles.button} onSelect={goToAddress}>
          <Text style={styles.title}>Addresses</Text>
        </TouchableIcon>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <MaterialIcons size={120} name='face' />
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {ActionButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffff'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: Colors.light.tabIconSelected,
    marginBottom: 18,
    borderRadius: 3,
    justifyContent: 'center',
  }
});
