import _ from 'lodash';

// "electronics",
//   "jewelery",
//   "men clothing",
//   "women clothing",

export enum categories {
    ELECTRONICS = 'electronics',
    JEWELERY = 'jewelery',
    MEN_CLOTHING = 'men clothing',
    WOMEN_CLOTHING = 'women clothing',
}

export function createSectionData (productList) {
    // const productList = _.get(product, ['payload'], []);
    const groupedProducts = _.groupBy(productList, product => {
      const groupedKey = _.get(product, ['category'])
      if (_.isEqual(groupedKey, categories.ELECTRONICS)) return categories.ELECTRONICS
      if (_.isEqual(groupedKey, categories.JEWELERY)) return categories.JEWELERY
      if (_.isEqual(groupedKey, categories.MEN_CLOTHING)) return categories.MEN_CLOTHING
      if (_.isEqual(groupedKey, categories.WOMEN_CLOTHING)) return categories.WOMEN_CLOTHING
    })
    return [
      {
        title: _.capitalize(categories.ELECTRONICS),
        name: _.capitalize(categories.ELECTRONICS),
        data: _.get(groupedProducts, [categories.ELECTRONICS], [])
      },
      {
        title: _.capitalize(categories.JEWELERY),
        name: _.capitalize(categories.JEWELERY),
        data: _.get(groupedProducts, [categories.JEWELERY], [])
      },
      {
        title: _.capitalize(categories.MEN_CLOTHING),
        name: _.capitalize(categories.MEN_CLOTHING),
        data: _.get(groupedProducts, [categories.MEN_CLOTHING], [])
      },
      {
        title: _.capitalize(categories.WOMEN_CLOTHING),
        name: _.capitalize(categories.WOMEN_CLOTHING),
        data: _.get(groupedProducts, [categories.WOMEN_CLOTHING], [])
      }
    ]
  }