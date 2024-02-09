import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TouchableOpacity, View } from "react-native"
import { AppStackScreenProps, navigate } from "app/navigators"
// import { Avatar } from "app/components/Avatar/Avatar"
import { ErrorBoundary } from "app/screens"
import { KKText } from "app/components/Text/KKText"
import { palette } from "app/theme/palette"
import { InputField } from "app/components/InputField/InputField"
import { InputFieldPassword } from "app/components/InputField/InputFieldPassword"
import { Controller, useForm } from "react-hook-form"
import IoniconIcon from "react-native-vector-icons/Ionicons"
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
// import { useStores } from "app/models"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

interface LoginData {
  username: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  /*const { authStore } = useStores()*/
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "all",
    defaultValues: { username: "", password: "" },
  })

  const onSubmit = async (loginData: LoginData) => {
    /*console.tron.log(loginData)
    await authStore.login(loginData.username, loginData.password)*/
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
        style={{ height: 170, width: "100%", alignItems: "center", justifyContent: "flex-end" }}
      >
        <KKText
          style={{ fontSize: 50, color: palette.black, fontWeight: "bold" }}
          text={"Sign In"}
        ></KKText>
      </View>
      <View
        style={{
          height: 200,
          width: "100%",
          backgroundColor: palette.white,
          alignItems: "center",
          marginTop: 150,
        }}
      >
        <View
          style={{
            marginVertical: 10,
            width: "70%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <FontAwesomeIcon name="user-o" size={33} color={palette.deepPink} />
          </View>
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
                backgroundColor={palette.white}
                width={250}
              />
            )}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            width: "70%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <IoniconIcon name="lock-closed-outline" size={35} color={palette.deepPink} />
          </View>
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
                backgroundColor={palette.white}
                width={250}
              />
            )}
          />
        </View>
        <View style={{ width: "100%", justifyContent: "center", alignItems: "flex-end" }}>
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
              backgroundColor: palette.deepPink,
              width: 150,
              height: 40,
              borderRadius: 5,
              justifyContent: "center",
              flexDirection: "row",
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <View style={{ justifyContent: "center" }}>
              <KKText
                style={{
                  color: palette.white,
                  fontSize: 16,
                }}
                text={"Connect"}
              />
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
        <KKText
          style={{
            color: palette.black,
            fontSize: 30,
          }}
          text={"CashQuest"}
        />
        {/*<Avatar
          source={require("assets/images/cash-quest-logo.png")}
          resizeMode="stretch"
          resizeMethod="auto"
          style={{ height: 50, width: 50, marginLeft: 10 }}
        />*/}
      </View>
    </ErrorBoundary>
  )
})
