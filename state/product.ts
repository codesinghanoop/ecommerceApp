import { ImageSourcePropType, SectionListData } from 'react-native';
import { createAction, createReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSectionData } from '../transformer/product'
import { makeNetworkCall } from '../networking'
import { FETCH_PRODUCT_LIST } from '../constants/Endpoints'

export interface ProductItem {
    category: string,
    description: string,
    id: Number,
    image: ImageSourcePropType,
    price: Number,
    title: string,
}

interface ProductState {
    productList: SectionListData<ProductItem, ProductItem>[],
    productDetail: ProductItem,
    loading: Boolean,
    error: string
}

const initialState : ProductState = {
  productList: [],
  productDetail: {
    category: '',
    description: '',
    id: -1,
    image: '',
    price: 0,
    title: '',
  },
  loading: false,
  error: ''
}

// const addTodo = createAction<Todo>('todos/add')
// const toggleTodo = createAction<number>('todos/toggle')
// export const getProductList = createAction('product/list')
// export const successProductList = createAction<Array<Object>>('product/list/success')
// export const errorProductList = createAction('product/list/error')
export const fetchProductList = createAsyncThunk(
  'product/list',
  async () => {
    const config = {
      method: 'get',
      url: FETCH_PRODUCT_LIST,
    };
    const response = await makeNetworkCall(config);
    console.log('the response of categories is',response.data);
    
    return response.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProductList.pending]: (state, action) => {
      state.loading = true
      state.error = ''
      state.productList = []
    },
    [fetchProductList.fulfilled]: (state, action) => {
      state.loading = false;
      state.productList = createSectionData(action.payload);
    },
    [fetchProductList.rejected]: (state, action) => {
      state.loading = false;
      state.error = 'ERROR_FOUND';
    }
  }
})

// export const ProductReducer = createReducer(initialState as ProductState, (builder) => {
//   builder
//     .addCase(getProductList, (state, action) => {
//       state.loading = true;
//       state.error = '';
//     })
//     .addCase(successProductList, (state, action) => {
//       state.loading = false;
//       state.productList = action.payload;
//     })
//     .addCase(errorProductList, (state, action) => {
//       state.loading = false;
//       state.error = 'ERROR_FOUND';
//     })
//     .addDefaultCase((state, action) => {})
// })