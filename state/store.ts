import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './product'
import { cartSlice } from './cart'
import { addressSlice } from './address'

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch