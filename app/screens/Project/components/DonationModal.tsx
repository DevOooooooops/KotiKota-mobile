import { Adapt, Button, Dialog, Sheet, Unspaced, XStack, Input, TextArea, Ystack } from "tamagui"
import { X } from "@tamagui/lucide-icons"
import { View } from "react-native"
import { palette } from "app/theme/palette"
import { Avatar } from "app/components/Avatar/Avatar"
import React from "react"
import { Text } from "app/components"
import { Controller, useForm } from "react-hook-form"
import { InputField } from "app/components/InputField/InputField"
export function DonationModal() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ amount: string }>({
    mode: "all",
    defaultValues: { amount: "" },
  })

  const onDonate = (amout) => {}

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>

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
                width: "50%",
                height: 150,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 30,
              }}
            >
              <Text
                preset="subheading"
                text={"Thanks for using KotiKota !"}
                style={{ color: palette.lightGrey }}
              />
            </View>
          </View>
          <View
            style={{
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              preset="formLabel"
              text={"You're supporting  "}
              style={{ color: palette.lightGrey }}
            />
            <Text preset="formLabel" text={"Numer Madagascar"} style={{ color: palette.black }} />
          </View>

          <View style={{ width: "100%", height: 200, backgroundColor: palette.greyDarker }}>
            <Controller
              control={control}
              name="amount"
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
                  text={"Amount"}
                  error={!!errors.amount}
                  value={value}
                  onChange={onChange}
                  backgroundColor={palette.white}
                  width={250}
                />
              )}
            />
          </View>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="active" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
