import { Adapt, Dialog, Sheet, TextArea } from "tamagui"
import { TouchableOpacity, View } from "react-native"
import { palette } from "app/theme/palette"
import { Avatar } from "app/components/Avatar/Avatar"
import React from "react"
import { Text } from "app/components"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { InputField } from "app/components/InputField/InputField"
interface ProjectCreationModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileModal = ({ open, setOpen }: ProjectCreationModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ name: string; description: string; targetAmount: string }>({
    mode: "all",
    defaultValues: { name: "", description: "", targetAmount: "" },
  })

  const onCreate: SubmitHandler<{ name: string; description: string; targetAmount: string }> = (
    data,
  ) => {
    const { name, description, targetAmount } = data
    console.tron.log(name, description, targetAmount)
    setOpen(false)
  }

  return (
    <Dialog modal open={open}>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "tooltip",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <View
            style={{
              height: 120,
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "40%",
                height: 150,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <Avatar
                source={require("assets/images/kirioka-logo.png")}
                resizeMode="stretch"
                resizeMethod="auto"
                style={{ height: 100, width: 100 }}
              />
            </View>
            <View
              style={{
                width: "60%",
                height: 150,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 30,
              }}
            >
              <Text
                preset="subheading"
                text={"Create new project"}
                style={{ color: palette.lightGrey }}
              />
              <Text preset="subheading" text={"With us !"} style={{ color: palette.lightGrey }} />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 300,
              flexDirection: "column",
              paddingLeft: 40,
            }}
          >
            <View style={{ marginVertical: 20 }}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: "Name is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    text={"Name"}
                    error={!!errors.name}
                    value={value}
                    onChange={onChange}
                    backgroundColor={palette.lighterGrey}
                    width={300}
                  />
                )}
              />
            </View>
            <View>
              <Controller
                control={control}
                name="targetAmount"
                rules={{
                  validate: {
                    isValidNumber: (value) => {
                      const intValue = parseInt(value, 10)
                      return !isNaN(intValue)
                    },
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    text={"Target"}
                    error={!!errors.targetAmount}
                    value={value}
                    onChange={onChange}
                    backgroundColor={palette.lighterGrey}
                    width={300}
                  />
                )}
              />
            </View>
            <View style={{ marginVertical: 20 }}>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    size="$6"
                    borderWidth={2}
                    style={{ width: "95%", backgroundColor: palette.lighterGrey }}
                    placeholder={"Description"}
                  />
                )}
              />
            </View>
          </View>

          <View
            style={{
              height: 50,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: palette.primary,
                width: 80,
                height: 40,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => setOpen(false)}
            >
              <Text preset="default" text={"Cancel"} style={{ color: palette.black }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: palette.primary,
                width: 80,
                height: 40,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={handleSubmit(onCreate)}
            >
              <Text preset="default" text={"Donate"} style={{ color: palette.black }} />
            </TouchableOpacity>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
