import * as React from 'react';
// import { NavigationScreenProps } from '@react-navigation/stack';
import { StyleSheet, SectionList, Text, Image, TouchableOpacity, SectionListData, RefreshControl } from 'react-native';
import { useAppDispatch, useAppSelector, useDirection } from '../state/hooks';
import { fetchProductList, ProductItem } from '../state/product';
import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import Loader from '../components/Loader';
import _ from 'lodash';

interface ProductListItem {
 item: ProductItem,
 index: number
}

interface HomeScreenProps {
  navigation: Object
}

export default function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props
  const [refreshing, setRefresh] = React.useState(false)
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);
  const loading = _.get(productState, ['loading'], false);
  const { direction } = useDirection()
  console.log('the direction result is',direction);
  const getProductList  = () => {
    dispatch(fetchProductList())
  }

  React.useEffect(() => {
    getProductList();
  },[])

  const goToProfileDetails = (item: ProductItem) => {
    navigation.navigate('profileDetails', { productObject: {...item} })
  }

  const renderItem = ({ item, index } : ProductListItem) => (
    <TouchableOpacity onPress={() => goToProfileDetails(item)} key={index} style={styles.productItem}>
      <Image source={{ uri: item.image}} style={[styles.image, { alignSelf: direction === 'ltr' ? 'flex-start' : 'flex-end' }]} />
      <Text style={[styles.title, { writingDirection: direction }]} >{item.title}</Text>
      <Text style={{ writingDirection: direction }}>{item.description}</Text>
    </TouchableOpacity>
  )

  const renderSection = ({ section } : { section: SectionListData<ProductItem, ProductItem> }) => (
    <View style={styles.section}>
      <Text style={[styles.title, { writingDirection: direction }]}>{section.title}</Text>
    </View>
  )

  if(loading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getProductList}
          />
        }
        sections={productState.productList}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  productItem: {
    width: '100%',
    padding: 15,
    // flexDirection: 'row',
    minHeight: 200
  },
  image: {
    width: 60,
    height: 60,
    // borderRadius: 30
  },
  section: {
    width: '100%',
    backgroundColor: '#ffff'
  }
});
