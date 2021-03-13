import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TouchableIcon from '../components/TouchableIcon';
import { useDirection, useAppSelector } from '../state/hooks';

export default function AddressList(props: any) {

  const addressList = useAppSelector((state) => state.address.addressList);
  const { direction } = useDirection();
  
  const renderItem = ({ item, index } : { item: string, index: number }) => (
      <>
      <View key={index} style={[styles.addressItem, { direction }]}>
          <Text>
              <MaterialCommunityIcons size={30} name="card-account-details" />
          </Text>
          <Text style={styles.title}>
            {item}
          </Text>
      </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </>
  )

  const isAddressListEmpty = addressList.length === 0

  if(isAddressListEmpty) {
    return (
      <View style={[styles.emptyContainer, { direction }]}>
        <Text>Address List is Empty</Text>
        <Text>
          <MaterialIcons size={30} name="hourglass-empty" />
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={addressList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '90%',
    marginLeft: 8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: Colors.light.tabIconSelected,
    marginBottom: 18,
    borderRadius: 3,
    justifyContent: 'center',
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
