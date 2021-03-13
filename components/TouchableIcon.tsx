import React from 'react'
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface TouchableIcon {
    onSelect: any,
    children: React.ReactNode,
    style: object
}

const TouchableIcon = (props: TouchableIcon) => {
    const { onSelect, ...rest } = props
    return (
        <TouchableOpacity onPress={props.onSelect} {...rest}>
            {props.children}
        </TouchableOpacity>
    )
}
  

export default TouchableIcon;
