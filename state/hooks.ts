import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { useContext } from 'react'
import { LanguageDirectionContext } from '../state/languageDirectionProvider'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useDirection = () => {
    const context = useContext(LanguageDirectionContext)
    if (!context) {
      throw new Error('You forgot the language provider!')
    }
    return context
}