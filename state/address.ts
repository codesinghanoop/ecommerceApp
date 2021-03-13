import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    addressList: Array<string>
}

const initialState : InitialState = {
    addressList: []
}

  export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress(state, action) {
            state.addressList.push(action.payload)
        },
    },
  })
  