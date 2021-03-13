import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { ProductItem } from '../state/product';
import { cartSlice } from '../state/cart';
import { useAppDispatch, useDirection } from '../state/hooks';

export default function ProfileDetails(props : any) {
  const params = props.route?.params.productObject || null;
  const dispatch = useAppDispatch();
  const { direction } = useDirection()

  const addItem = (params: ProductItem) => {
    dispatch(cartSlice.actions.addItem(params));
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: params.image}} style={styles.image} />
      <View style={[styles.priceContainer, { flexDirection: direction === 'ltr' ? 'row' : 'row-reverse' }]}>
        <Text>Price: <Text style={styles.price}>${params.price}</Text></Text>
        <TouchableOpacity onPress={() => addItem(params)}>
            <Text>
                <Ionicons size={30} name='add' />
            </Text>
        </TouchableOpacity>
        {/* <>
        </> */}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={[styles.title, { writingDirection: direction }]}>
            {params.title}
        </Text>
      <Text style={{ writingDirection: direction, textAlign: 'center' }}>
          {params.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 230,
    height: 230,
    // borderRadius: 30
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    width: '100%',
    alignItems: 'center'
  },
  price: {
      fontWeight: 'bold',
  }
});
