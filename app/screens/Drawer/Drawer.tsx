import { RouteProp, useRoute } from "@react-navigation/native"
import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  SectionList,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Drawer as DrawerLayout } from "react-native-drawer-layout"
import { EmptyState, Icon, ListItemActionProps, ListView, Screen, Text } from "app/components"
import { isRTL } from "app/i18n"
import { DemoTabParamList, DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import * as Demos from "./demos"
import FeatherIcon from "react-native-vector-icons/Feather"
import { palette } from "app/theme/palette"
import { KKText } from "app/components/Text/KKText"
import { TamaguiProvider } from "tamagui"
import tamaguiConfig from "../../../tamagui.config"
import { Card } from "tamagui"
import { Avatar } from "app/components/Avatar/Avatar"
import { ProjectCreationModal } from "app/screens/Drawer/components/ProjectCreationModal"
import { ProfileModal } from "./components/ProfileModal"
import { useStores } from "app/models"
import { Project, ProjectHealthType } from "app/models/entities/project/Project"
import { ContentStyle } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import { convertDate } from "app/utils/convertDate"
import { renderBase64 } from "app/utils/base64ToString"
import { formatNumber } from "app/utils/formatNumber"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

export const Drawer: FC<DemoTabScreenProps<"DemoShowroom">> = function DemoShowroomScreen(_props) {
  const [open, setOpen] = useState(false)
  const [openCreation, setOpenCreation] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const listRef = useRef<SectionList>(null)
  const route = useRoute<RouteProp<DemoTabParamList, "DemoShowroom">>()
  const params = route.params
  const { episodeStore, authStore } = useStores()
  const { currentUser, selfProjects } = authStore

  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading /*setIsLoading*/] = React.useState(false)
  useEffect(() => {
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

  useEffect(() => {
    ;(async () => {
      await authStore.getSelfProjects()
      await authStore.getAllProjects()
    })()
  }, [])

  async function manualRefresh() {
    setRefreshing(true)
    await authStore.getSelfProjects()
    await authStore.getAllProjects()
    setRefreshing(false)
  }

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
              marginBottom: 30,
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
              <Image source={require("assets/images/kirioka-logo.png")} style={$logoImage} />
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
                  style={{ fontSize: 14, color: palette.black, fontWeight: "bold" }}
                  text={`${currentUser?.profile?.last_name} ${currentUser?.profile?.first_name}`}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onPress={() => setOpenProfile(true)}
              >
                <KKText
                  style={{ fontSize: 12, color: palette.black, marginTop: 2 }}
                  text={"View profile"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                height: 50,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setOpenCreation(true)}
            >
              <Text
                text={"New Project"}
                style={{
                  alignSelf: "center",
                  flexGrow: 1,
                  flexShrink: 1,
                  marginLeft: 50,
                }}
              />
              <View style={{ marginRight: 50 }}>
                <ListItemAction
                  side="right"
                  size={20}
                  icon={"caretRight"}
                  iconColor={palette.greyDarker}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
          <View
            style={{
              height: 60,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 20,
            }}
          >
            <View>
              <Avatar
                source={require("assets/images/kirioka-logo.png")}
                resizeMode="stretch"
                resizeMethod="auto"
                style={{ height: 60, width: 60 }}
              />
            </View>
            <TouchableOpacity style={{ position: "absolute", right: 20 }} onPress={toggleDrawer}>
              <FeatherIcon name="align-center" size={25} />
            </TouchableOpacity>
          </View>
          <View
            style={{ width: "100%", height: 600, justifyContent: "center", alignItems: "center" }}
          >
            <ListView<Project>
              contentContainerStyle={$listContentContainer}
              data={selfProjects}
              extraData={episodeStore.favorites.length + episodeStore.episodes.length}
              refreshing={refreshing}
              estimatedItemSize={177}
              onRefresh={manualRefresh}
              ListEmptyComponent={
                isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <EmptyState
                    preset="generic"
                    style={$emptyState}
                    headingTx={
                      episodeStore.favoritesOnly
                        ? "demoPodcastListScreen.noFavoritesEmptyState.heading"
                        : undefined
                    }
                    contentTx={
                      episodeStore.favoritesOnly
                        ? "demoPodcastListScreen.noFavoritesEmptyState.content"
                        : undefined
                    }
                    button={episodeStore.favoritesOnly ? "" : undefined}
                    buttonOnPress={manualRefresh}
                    imageStyle={$emptyStateImage}
                    ImageProps={{ resizeMode: "contain" }}
                  />
                )
              }
              renderItem={({ item }) => <ProjectSelfCard project={item} />}
            />
          </View>
          <ProjectCreationModal open={openCreation} setOpen={setOpenCreation} />
          <ProfileModal open={openProfile} setOpen={setOpenProfile} />
        </Screen>
      </TamaguiProvider>
    </DrawerLayout>
  )
}

const ProjectSelfCard = observer(function ProjectCard({ project }: { project: Project }) {
  const handlePressCard = () => {
    // openLinkInBrowser(episode.enclosure.link)
  }

  const convertedDate = convertDate(project?.deadline ?? new Date().toISOString())

  const image = renderBase64(project?.logo ?? "")

  return (
    <Card
      style={$item}
      // @ts-ignore
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={{
              ...$metadataText,
              color:
                project.health === ProjectHealthType.SUCCESS
                  ? palette.green
                  : project.health === ProjectHealthType.IN_PROGRESS
                  ? palette.cheese
                  : palette.pastelRed,
            }}
            size="xs"
          >
            {project.name}
          </Text>
          <MaterialIcon
            name="clock-alert-outline"
            size={15}
            color={palette.lightGrey}
            style={{ height: "80%", justifyContent: "center", alignItems: "center" }}
          />
          <Text style={$metadataText} size="xxs">
            {convertedDate}
          </Text>
        </View>
      }
      content={`${project.description}`}
      RightComponent={<Avatar source={image} style={$itemThumbnail} />}
      FooterComponent={
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginLeft: 50,
              alignItems: "flex-end",
              paddingBottom: 7,
              flexDirection: "row",
            }}
          >
            <Text
              size="xs"
              weight="medium"
              text={formatNumber(project.targetAmount ?? 0)}
              style={{ color: palette.black, marginRight: 5 }}
            />
            <Text size="xxs" weight="medium" text={"mga"} style={{ color: palette.black }} />
          </View>
        </View>
      }
    />
  )
})

function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props

  const $iconContainerStyles = [$iconContainer]

  if (Component) return Component

  if (icon !== undefined) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={[
          $iconContainerStyles,
          side === "left" && $iconContainerLeft,
          side === "right" && $iconContainerRight,
          { height: size },
        ]}
      />
    )
  }

  return null
}

const $iconContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 0,
}

const $iconContainerLeft: ViewStyle = {
  marginEnd: spacing.md,
}

const $iconContainerRight: ViewStyle = {
  marginStart: spacing.md,
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $logoImage: ImageStyle = {
  height: 77,
  width: 77,
}
const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: 5,
  paddingBottom: spacing.lg,
}
const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.xs,
  flexDirection: "row",
  alignItems: "center",
}

const $metadataText: TextStyle = {
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
  marginLeft: 2,
}

const $item: ViewStyle = {
  padding: spacing.md,
  marginTop: spacing.md,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.sm,
  borderRadius: 50,
  alignSelf: "flex-start",
  width: 50,
  height: 50,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion
