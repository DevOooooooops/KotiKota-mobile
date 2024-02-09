import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo } from "react"
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
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
import { Project, ProjectHealthType, ProjectStatus } from "app/models/entities/project/Project"
import { palette } from "app/theme/palette"
import { DonationModal } from "app/screens/Project/components/DonationModal"

const ICON_SIZE = 14

const rnrImage1 = require("assets/images/demo/rnr-image-1.png")
const rnrImage2 = require("assets/images/demo/rnr-image-2.png")
const rnrImage3 = require("assets/images/demo/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

const projects: Project[] = [
  {
    id: "",
    name: "AWS CIRT",
    description: "It's a beautiful life",
    targetAmount: 80,
    deadline: "2024-02-09T21:58:07.208Z",
    ownerId: "",
    status: ProjectStatus.OPEN,
    health: ProjectHealthType.IN_PROGRESS,
  },
  {
    id: "",
    name: "Nudacy Records",
    description: "The music is life",
    targetAmount: 80,
    deadline: "2024-02-09T21:58:07.208Z",
    ownerId: "",
    status: ProjectStatus.OPEN,
    health: ProjectHealthType.IN_PROGRESS,
  },
  {
    id: "",
    name: "Fanilo project",
    description: "Ho fifaliana no ameno ny tany",
    targetAmount: 80,
    deadline: "2024-02-09T21:58:07.208Z",
    ownerId: "",
    status: ProjectStatus.OPEN,
    health: ProjectHealthType.IN_PROGRESS,
  },
]

export const ProjectScreen: FC<DemoTabScreenProps<"Project">> = observer(
  function DemoPodcastListScreen(_props) {
    const { episodeStore } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // initially, kick off a background refresh without the refreshing UI
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
          <View style={{ justifyContent: "center", width: "34%", marginLeft: 25 }}>
            <Text preset="subheading" text={"May interest you"} />
          </View>
          <MaterialIcon name="star-shooting" size={25} />
        </View>
        <ListView<Project>
          contentContainerStyle={$listContentContainer}
          data={projects}
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
          renderItem={({ item }) => <ProjectCard project={item} onPressContribute={() => {}} />}
        />
        <View>
          <DonationModal />
        </View>
      </Screen>
    )
  },
)

const ProjectCard = observer(function ProjectCard({
  project,
  onPressContribute,
}: {
  project: Project
  onPressContribute: () => void
}) {
  const imageUri = useMemo<ImageSourcePropType>(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

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
    onPressContribute()
  }

  const handlePressCard = () => {
    // openLinkInBrowser(episode.enclosure.link)
  }

  const ButtonLeftAccessory: ComponentType<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonLeftAccessory() {
        return (
          <View>
            <Animated.View
              style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
            >
              <Icon
                icon="community"
                size={ICON_SIZE}
                color={colors.palette.neutral800} // dark grey
              />
            </Animated.View>
            <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
              <Icon
                icon="heart"
                size={ICON_SIZE}
                color={colors.palette.primary400} // pink
              />
            </Animated.View>
          </View>
        )
      },
    [],
  )

  return (
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
      onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            accessibilityLabel={project?.deadline ?? new Date().toISOString()}
          >
            {project?.deadline}
          </Text>
        </View>
      }
      content={`${project.description}`}
      RightComponent={<Image source={imageUri} style={$itemThumbnail} />}
      FooterComponent={
        <Button
          onPress={handlePressFavorite}
          onLongPress={handlePressFavorite}
          style={[$favoriteButton]}
          accessibilityLabel={"Donate"}
          LeftAccessory={ButtonLeftAccessory}
        >
          <Text size="xxs" weight="medium" text={"Donate"} style={{ color: palette.black }} />
        </Button>
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
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.md,
  marginBottom: spacing.xs,
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
