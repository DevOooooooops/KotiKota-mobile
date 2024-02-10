import * as React from "react"
import { View } from "react-native"

import { palette } from "app/theme/palette"
import { Text } from "app/components"

export function LabelWithTextRow(props: { label: any; text: any }) {
  const { label, text } = props

  return (
    <View
      style={{
        height: 60,
        marginHorizontal: "5%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        text={label}
        style={{
          fontSize: 13,
          color: palette.lighterBlack,
          fontFamily: "Geometria",
          width: "50%",
          textTransform: "uppercase",
        }}
      />
      <Text
        text={text}
        style={{
          fontSize: 15,
          color: palette.darkBlack,
          fontFamily: "Geometria",
        }}
      />
    </View>
  )
}
