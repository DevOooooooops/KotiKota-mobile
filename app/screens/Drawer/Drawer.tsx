import { Link, RouteProp, useRoute } from "@react-navigation/native"
import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { Image, ImageStyle, Platform, SectionList, View, ViewStyle } from "react-native"
import { Drawer as DrawerLayout } from "react-native-drawer-layout"
import { type ContentStyle } from "@shopify/flash-list"
import { ListItem, ListView, ListViewRef, Screen, Text } from "app/components"
import { isRTL } from "app/i18n"
import { DemoTabParamList, DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"
import { palette } from "app/theme/palette"
import { KKText } from "app/components/Text/KKText"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()

  return (
    <View>
      <Link to={`/showroom/${sectionSlug}`} style={$menuContainer}>
        <Text preset="bold">{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link key={`section${sectionIndex}-${u}`} to={`/showroom/${sectionSlug}/${itemSlug}`}>
            <Text>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => (
  <View>
    <Text onPress={() => handleScroll?.(sectionIndex)} preset="bold" style={$menuContainer}>
      {item.name}
    </Text>
    {item.useCases.map((u, index) => (
      <ListItem
        key={`section${sectionIndex}-${u}`}
        onPress={() => handleScroll?.(sectionIndex, index + 1)}
        text={u}
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
      />
    ))}
  </View>
)

const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })

export const Drawer: FC<DemoTabScreenProps<"DemoShowroom">> = function DemoShowroomScreen(_props) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const listRef = useRef<SectionList>(null)
  const menuRef = useRef<ListViewRef<DemoListItem["item"]>>(null)
  const route = useRoute<RouteProp<DemoTabParamList, "DemoShowroom">>()
  const params = route.params

  // handle Web links
  React.useEffect(() => {
    if (params !== undefined && Object.keys(params).length > 0) {
      const demoValues = Object.values(Demos)
      const findSectionIndex = demoValues.findIndex(
        (x) => x.name.toLowerCase() === params.queryIndex,
      )
      let findItemIndex = 0
      if (params.itemIndex) {
        try {
          findItemIndex =
            demoValues[findSectionIndex].data.findIndex(
              (u) => slugify(u.props.name) === params.itemIndex,
            ) + 1
        } catch (err) {
          console.error(err)
        }
      }
      handleScroll(findSectionIndex, findItemIndex)
    }
  }, [params])

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current?.scrollToLocation({
      animated: true,
      itemIndex,
      sectionIndex,
    })
    toggleDrawer()
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <DrawerLayout
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      renderDrawerContent={() => (
        <View style={[$drawer, $drawerInsets]}>
          <View
            style={{
              justifyContent: "center",
              height: 100,
              width: 250,
              paddingHorizontal: spacing.lg,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                height: "100%",
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={logo} style={$logoImage} />
            </View>
            <View
              style={{
                height: "100%",
                width: "50%",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <KKText
                  style={{ fontSize: 16, color: palette.black, fontWeight: "bold" }}
                  text={"Calendar"}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <KKText
                  style={{ fontSize: 12, color: palette.black, marginTop: 2 }}
                  text={"View profile"}
                />
              </View>
            </View>
          </View>

          <ListView<DemoListItem["item"]>
            ref={menuRef}
            contentContainerStyle={$listContentContainer}
            estimatedItemSize={250}
            data={Object.values(Demos).map((d) => ({
              name: d.name,
              useCases: d.data.map((u) => u.props.name as string),
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
            )}
          />
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
        <View
          style={{
            height: 60,
            width: "100%",
            borderBottomWidth: 3,
            borderColor: palette.lighterGrey,
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 20,
          }}
        >
          <View>
            <KKText
              style={{ fontSize: 16, color: palette.black, fontWeight: "bold" }}
              text={"Calendar"}
            />
          </View>
          <View style={{ position: "absolute", right: 15 }}>
            <DrawerIconButton onPress={toggleDrawer} />
          </View>
        </View>
      </Screen>
    </DrawerLayout>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
}
