import React, { FC, useEffect, useRef } from "react"
import { SectionList, TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import * as Demos from "app/screens/Drawer/demos"

export const DemoDebugScreen: FC<DemoTabScreenProps<"DemoDebug">> = function DemoDebugScreen(
  _props,
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const listRef = useRef<SectionList>(null)

  const scrollToIndexFailed = (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => {
    listRef.current?.getScrollResponder()?.scrollToEnd()
    timeout.current = setTimeout(
      () =>
        listRef.current?.scrollToLocation({
          animated: true,
          itemIndex: info.index,
          sectionIndex: 0,
        }),
      50,
    )
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
      <SectionList
        ref={listRef}
        contentContainerStyle={$sectionListContentContainer}
        stickySectionHeadersEnabled={false}
        sections={Object.values(Demos)}
        renderItem={({ item }) => item}
        renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demoShowroomScreen.jumpStart" />
          </View>
        }
        onScrollToIndexFailed={scrollToIndexFailed}
        renderSectionHeader={({ section }) => {
          return (
            <View>
              <Text preset="heading" style={$demoItemName}>
                {section.name}
              </Text>
              <Text style={$demoItemDescription}>{section.description}</Text>
            </View>
          )
        }}
      />
    </Screen>
  )
}
const $screenContainer: ViewStyle = {
  flex: 1,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.xxxl,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.md,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.xxl,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.xxl,
}
