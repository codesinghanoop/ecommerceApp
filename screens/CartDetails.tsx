import * as React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import { useAppDispatch, useAppSelector, useDirection } from '../state/hooks';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { ProductItem } from '../state/product';
import { cartSlice } from '../state/cart';
import TouchableIcon from '../components/TouchableIcon';

export default function CartDetails(props : any) {
  const selectedProductItems = useAppSelector((state) => state.cart.selectedItemList)
  const dispatch = useAppDispatch();
  const { direction } = useDirection()

  const removeItem = (params: ProductItem) => {
    dispatch(cartSlice.actions.deleteItem(params));
  }

  const getPrice = (price : Number, quantity: Number) => price*quantity
  const keysArr = Object.keys(selectedProductItems);
  const isCartEmpty = _.filter(keysArr, (productKey) => selectedProductItems[productKey].length > 0).length === 0

  if(isCartEmpty) {
    return (
      <View style={[styles.emptyContainer, { direction }]}>
        <Text>Cart is Empty</Text>
        <Text>
          <MaterialIcons size={30} name="hourglass-empty" />
        </Text>
      </View>
    )
  }

  return (
      <ScrollView style={styles.container}>
          {Object.keys(selectedProductItems).map((productId) => {
            const productAggregate : ProductItem = selectedProductItems[productId][0]
            const quantity : number = selectedProductItems[productId].length
            if(_.isUndefined(productAggregate)) {
                return null
            }
            return (
                <View key={productId} style={[styles.productContainer]}>
                <View style={[styles.productRow, { direction }]}>
                    <View style={[styles.imageContainer, { direction }]}>
                        <Image source={{ uri: productAggregate.image}} style={styles.image} />
                        <Text style={styles.title}>{productAggregate.title}</Text>
                    </View>
                    <TouchableIcon onSelect={() => removeItem(productAggregate)}>
                        <Text>
                            <Ionicons size={20} name='remove-sharp' />
                        </Text>
                    </TouchableIcon>
                </View>
                    <Text style={{ writingDirection: direction}}>Quantity: {quantity}</Text>
                    <Text style={{ writingDirection: direction}}>Price: ${getPrice(productAggregate.price, quantity)}</Text>
                </View>
            )
          })}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 18,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 30,
    backgroundColor: '#ffff'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    width: '70%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: 40,
    height: 40,
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
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
