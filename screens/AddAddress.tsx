import * as React from 'react';
import { StyleSheet, I18nManager, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TouchableIcon from '../components/TouchableIcon';
import { useDirection, useAppDispatch } from '../state/hooks';
import _ from 'lodash';
import { getAddressFromCoordinates } from '../networking/mapApi';
import { addressSlice } from '../state/address';

export default function AddAddressMapview(props: any) {
const [selectedAddress, setAddress] = React.useState('');
const [region, setRegion] = React.useState({
    latitude: 25.276987,
    longitude: 55.296249,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
});
const [latlng, setLatLng] = React.useState({
    latitude: 25.0,
    longitude: 55.0,
});
const { direction } = useDirection()
const dispatch = useAppDispatch();
const onChangeUserLocation = event => {
const coordinateObj = event.nativeEvent.coordinate;
// if (_.isEmpty(latlng) && !_.isUndefined(coordinateObj)) {
    setRegion({
    latitude: coordinateObj.latitude,
    longitude: coordinateObj.longitude,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
    });
    setLatLng({
    latitude: coordinateObj.latitude,
    longitude: coordinateObj.longitude,
    });
// }
};

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const address = await getAddressFromCoordinates({  
            latitude: lat,
            longitude: long
         })
        setAddress(address);
        setLatLng({
            latitude: lat,
            longitude: long,
        });
    });
  }

  const onDragEnd = async (event: any) => {
    const coordinateObj = event.nativeEvent.coordinate;
    const address = await getAddressFromCoordinates(coordinateObj)
    setAddress(address);
  }

  React.useEffect(() => {
    getCurrentLocation()
  },[])

  const addAddress = () => {
    dispatch(addressSlice.actions.addAddress(selectedAddress))
    props.navigation.pop()
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map} 
        loadingEnabled={true}
        showsUserLocation
        onUserLocationChange={onChangeUserLocation}
      >
          <Marker 
            coordinate={{ latitude: latlng.latitude, longitude: latlng.longitude }}
            onDragEnd={onDragEnd}
            draggable
          />
      </MapView>
      <View style={[styles.addressContainer, { direction }]}>
         <Text style={styles.address}>{selectedAddress}</Text>
         <TouchableIcon onPress={addAddress}>
            <Text>
                <Ionicons size={30} name="add" />
            </Text>
         </TouchableIcon>
      </View>
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
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  addressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 50,
    backgroundColor:'#ffff',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  address: {
      width: '80%',
  }
});
