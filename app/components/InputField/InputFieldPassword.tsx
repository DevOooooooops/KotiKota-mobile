import React, { useState } from "react"
import { KeyboardTypeOptions, View } from "react-native"
import { TextInput } from "react-native-paper"
import { palette } from "app/theme/palette"

interface InputFieldProps {
  text: string
  error: boolean
  value: string
  onChange: ((text: string) => void) & Function
  backgroundColor: string
  width?: number
  rightRender?: boolean
  rightText?: string
  keyboardType?: KeyboardTypeOptions
}

export const InputFieldPassword = ({
  text,
  error,
  value,
  onChange,
  backgroundColor,
  width,
  rightRender,
  rightText,
  keyboardType,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(true)

  const toggleShowPassword = () => {
    setShowPassword((showPasswordInState) => !showPasswordInState)
  }

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={showPassword}
        label={text}
        error={error}
        textColor={palette.primary}
        selectionColor={palette.primary}
        value={value}
        onChangeText={onChange}
        right={
          showPassword ? (
            <TextInput.Icon
              icon="eye"
              onPress={() => toggleShowPassword()}
              color={palette.primary}
            />
          ) : (
            <TextInput.Icon
              icon="eye-off"
              onPress={() => toggleShowPassword()}
              color={palette.primary}
            />
          )
        }
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 5,
          width: width,
          elevation: 10,
          borderBottomWidth: error ? 2 : 0,
          borderBottomColor: error ? palette.pastelRed : palette.primary,
        }}
        theme={{
          colors: {
            primary: palette.primary,
          },
        }}
      />
    </View>
  )
}
