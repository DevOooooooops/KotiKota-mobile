import React from "react"
import { KeyboardTypeOptions, View } from "react-native"
import { TextInput } from "react-native-paper"
import { palette } from "app/theme/palette"

interface InputFieldProps {
  text: string
  error: boolean
  value: string
  onChange: ((text: string) => void) & Function
  width?: number
  backgroundColor: string
  rightRender?: boolean
  rightText?: string
  keyboardType?: KeyboardTypeOptions
}

export const InputField = ({
  text,
  error,
  value,
  onChange,
  width,
  backgroundColor,
  rightRender,
  rightText,
  keyboardType,
}: InputFieldProps) => {
  return (
    <View>
      <TextInput
        keyboardType={keyboardType ?? "default"}
        autoCapitalize="none"
        label={text}
        textColor={palette.deepPink}
        selectionColor={palette.deepPink}
        value={value}
        onChangeText={onChange}
        error={error}
        right={
          rightRender && (
            <TextInput.Affix
              text={rightText}
              textStyle={{
                fontSize: 16,
                color: palette.deepPink,
                fontFamily: "Geometria-Bold",
              }}
            />
          )
        }
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 5,
          width: width,
          elevation: 5,
          borderBottomWidth: error ? 2 : 0,
          borderBottomColor: error ? palette.pastelRed : palette.greyDarker,
        }}
        theme={{
          colors: {
            primary: palette.deepPink,
          },
        }}
      />
    </View>
  )
}
