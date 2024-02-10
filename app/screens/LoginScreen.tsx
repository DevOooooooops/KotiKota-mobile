import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { AppStackScreenProps, navigate } from "app/navigators"
import { ErrorBoundary } from "app/screens"
import { KKText } from "app/components/Text/KKText"
import { palette } from "app/theme/palette"
import { InputField } from "app/components/InputField/InputField"
import { InputFieldPassword } from "app/components/InputField/InputFieldPassword"
import { Controller, useForm } from "react-hook-form"
import { Avatar } from "app/components/Avatar/Avatar"
import { useStores } from "app/models"
import { Spinner, YStack } from "tamagui"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

interface LoginData {
  username: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { authStore } = useStores()
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "all",
    defaultValues: { username: "", password: "" },
  })

  const onSubmit = async (loginData: LoginData) => {
    setLoading(true)
    await authStore.login(loginData.username, loginData.password)
    setLoading(false)
  }

  return (
    <ErrorBoundary catchErrors="always">
      {/*<Avatar
        source={require("assets/images/authentication.png")}
        resizeMode="stretch"
        resizeMethod="auto"
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />*/}
      <View
        style={{ height: 250, width: "100%", alignItems: "center", justifyContent: "flex-end" }}
      >
        <Avatar
          source={require("assets/images/kirioka-logo.png")}
          resizeMode="stretch"
          resizeMethod="auto"
          style={{ height: 140, width: 140 }}
        />
      </View>
      <View
        style={{
          height: 200,
          width: "100%",
          backgroundColor: palette.white,
          alignItems: "center",
          marginTop: 80,
        }}
      >
        <View
          style={{
            marginVertical: 5,
            width: "80%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            name="username"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <InputField
                text={"Username"}
                error={!!errors.username}
                value={value}
                onChange={onChange}
                backgroundColor={palette.neutral}
                width={250}
              />
            )}
          />
        </View>
        <View
          style={{
            marginVertical: 5,
            width: "85%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <InputFieldPassword
                text={"Password"}
                error={!!errors.password}
                value={value}
                onChange={onChange}
                backgroundColor={palette.neutral}
                width={250}
              />
            )}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: palette.primary,
              width: 260,
              height: 40,
              borderRadius: 5,
              justifyContent: "center",
              flexDirection: "row",
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <View style={{ justifyContent: "center" }}>
              {loading ? (
                <YStack padding="$3" alignItems="center">
                  <Spinner size="small" color={palette.white} />
                </YStack>
              ) : (
                <KKText
                  style={{
                    color: palette.white,
                    fontSize: 16,
                  }}
                  text={"Connect"}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 100,
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            width: 200,
            height: 40,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "flex-end",
            marginRight: 50,
          }}
          onPress={() => navigate("Registration")}
        >
          <KKText
            style={{
              color: palette.black,
              fontSize: 16,
              textDecorationLine: "underline",
            }}
            text={"Don't have an account? "}
          />
        </TouchableOpacity>
      </View>
    </ErrorBoundary>
  )
})
