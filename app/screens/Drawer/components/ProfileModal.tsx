import { Adapt, Dialog, Sheet } from "tamagui"
import { TouchableOpacity, View } from "react-native"
import { palette } from "app/theme/palette"
import { Avatar } from "app/components/Avatar/Avatar"
import React from "react"
import { KKText } from "app/components/Text/KKText"
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import { LabelWithTextRow } from "app/components/LabelWithText/label-with-text"
interface ProjectCreationModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileModal = ({ open, setOpen }: ProjectCreationModalProps) => {
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
                width: "100%",
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
              <KKText
                style={{ fontSize: 14, color: palette.black, fontWeight: "bold", marginTop: 10 }}
                text={"Louis Vy Thon"}
              />
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  top: 10,
                  right: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => setOpen(false)}
              >
                <AntDesignIcon name="closecircleo" size={30} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <LabelWithTextRow label={"Nom"} text={"Jean Du Jardin"} />
            <LabelWithTextRow label={"Nom"} text={"Jean Du Jardin"} />
            <LabelWithTextRow label={"Nom"} text={"Jean Du Jardin"} />
            <LabelWithTextRow label={"Nom"} text={"Jean Du Jardin"} />
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
