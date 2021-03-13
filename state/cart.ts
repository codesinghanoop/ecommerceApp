import { ImageSourcePropType, SectionListData } from 'react-native';
import { createAction, createReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { createSectionData } from '../transformer/product'
import { makeNetworkCall } from '../networking'
import { FETCH_PRODUCT_LIST } from '../constants/Endpoints'

interface InitialState {
    selectedItemList: any
}

const initialState : InitialState = {
    selectedItemList: {}
}

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            if(!_.has(state.selectedItemList, action.payload.id)) {
                state.selectedItemList[action.payload.id] = []
            }
            state.selectedItemList[action.payload.id].push(action.payload)
        },
        deleteItem(state, action) {
            state.selectedItemList[action.payload.id].pop()
        }
    },
  })
  