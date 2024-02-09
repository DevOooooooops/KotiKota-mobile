import * as React from "react"
import { StyleProp, Text as ReactNativeText, TextStyle } from "react-native"

export interface TextProps {
  children?: React.ReactNode

  text?: string

  style?: StyleProp<TextStyle>
}
export function KKText(props: TextProps) {
  const { text, children, style: styleOverride, ...rest } = props
  const content = text || children

  const styles = [styleOverride]

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
