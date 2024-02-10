import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo } from "react"
import {
  ActivityIndicator,
  ImageStyle,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { type ContentStyle } from "@shopify/flash-list"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import {
  Button,
  ButtonAccessoryProps,
  Card,
  EmptyState,
  Icon,
  ListView,
  Screen,
  Text,
} from "app/components"
import { isRTL } from "app/i18n"
import { useStores } from "app/models"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { colors, spacing } from "app/theme"
import { delay } from "app/utils/delay"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { ContributionCard } from "app/screens/Project/components/ContributionCard"
import { Project, ProjectHealthType } from "app/models/entities/project/Project"
import { palette } from "app/theme/palette"
import { DonationModal } from "app/screens/Project/components/DonationModal"
import { convertDate } from "app/utils/convertDate"
import { formatNumber } from "app/utils/formatNumber"
import { renderBase64 } from "app/utils/base64ToString"
import { Avatar } from "app/components/Avatar/Avatar"

const ICON_SIZE = 14

export const ProjectScreen: FC<DemoTabScreenProps<"Project">> = observer(
  function DemoPodcastListScreen(_props) {
    const { episodeStore, authStore } = useStores()
    const { allProjects } = authStore

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [currentProject, setCurrentProject] = React.useState<Project>()

    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await episodeStore.fetchEpisodes()
        setIsLoading(false)
      })()
    }, [episodeStore])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([episodeStore.fetchEpisodes(), delay(750)])
      setRefreshing(false)
    }

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <View
          style={{
            width: "100%",
            height: 50,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ justifyContent: "center", width: "34%", marginLeft: 25 }}>
            <Text preset="subheading" text={"Contribution"} />
          </View>
          <MaterialIcon name="star-shooting" size={25} />
        </View>
        <View style={{ height: 150 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ContributionCard label={"Projet Tatezana"} />
            <ContributionCard label={"Télé feérique"} />
            <ContributionCard label={"LEI"} />
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ justifyContent: "center", width: "45%", marginLeft: 25 }}>
            <Text preset="subheading" text={"May interest you"} />
          </View>
          <MaterialIcon name="star-shooting" size={25} />
        </View>
        <ListView<Project>
          contentContainerStyle={$listContentContainer}
          data={allProjects}
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
          renderItem={({ item }) => (
            <ProjectCard project={item} setCurrentProject={setCurrentProject} setOpen={setOpen} />
          )}
        />
        <View>
          {currentProject && (
            <DonationModal open={open} setOpen={setOpen} project={currentProject} />
          )}
        </View>
      </Screen>
    )
  },
)

const ProjectCard = observer(function ProjectCard({
  project,
  setCurrentProject,
  setOpen,
}: {
  project: Project
  setCurrentProject: React.Dispatch<React.SetStateAction<Project | undefined>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(0, [0, 1], [1, 0], Extrapolate.EXTEND),
        },
      ],
      opacity: interpolate(0, [0, 1], [1, 0], Extrapolate.CLAMP),
    }
  })

  // Pink heart
  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: 0,
        },
      ],
      opacity: 0,
    }
  })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */

  const handlePressFavorite = () => {
    setCurrentProject(project)
    setOpen(true)
  }

  const handlePressCard = () => {
    // openLinkInBrowser(episode.enclosure.link)
  }

  const convertedDate = convertDate(project?.deadline ?? new Date().toISOString())

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            <Animated.View
              style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
            >
              <Icon icon="community" size={ICON_SIZE} color={colors.palette.neutral800} />
            </Animated.View>
            <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
              <Icon icon="heart" size={ICON_SIZE} color={colors.palette.primary400} />
            </Animated.View>
          </View>
        )
      },
    [],
  )

  const image = renderBase64(project?.logo ?? "")

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
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
          <Button
            onPress={handlePressFavorite}
            onLongPress={handlePressFavorite}
            style={[$favoriteButton]}
            accessibilityLabel={"Donate"}
            LeftAccessory={ButtonLeftAccessory}
          >
            <Text size="xxs" weight="medium" text={"Donate"} style={{ color: palette.black }} />
          </Button>
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

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: 5,
  paddingBottom: spacing.lg,
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
const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.sm,
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

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.md,
  justifyContent: "flex-start",
  backgroundColor: palette.secondary,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxxs,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
// #endregion
