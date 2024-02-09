import { Adapt, Button, Dialog, Sheet, XStack } from "tamagui"
import { View } from "react-native"
import { palette } from "app/theme/palette"
import { Avatar } from "app/components/Avatar/Avatar"
import React from "react"
import { Text } from "app/components"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { InputField } from "app/components/InputField/InputField"

interface DonationModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DonationModal = ({ open, setOpen }: DonationModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ amount: string }>({
    mode: "all",
    defaultValues: { amount: "" },
  })

  const onDonate: SubmitHandler<{ amount: string }> = (amount) => {
    console.tron.log(amount)
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

          <View
            style={{
              width: "100%",
              height: 120,
              justifyContent: "center",
              flexDirection: "column",
              paddingLeft: 40,
            }}
          >
            <View style={{ marginBottom: 2 }}>
              <Text preset="default" text={"Ariary"} style={{ color: palette.primary }} />
            </View>
            <View>
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
                    backgroundColor={palette.lighterGrey}
                    width={300}
                  />
                )}
              />
            </View>
          </View>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                style={{ backgroundColor: palette.primary }}
                theme="active"
                aria-label="Close"
                onPress={handleSubmit(onDonate)}
              >
                Donate
              </Button>
            </Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
