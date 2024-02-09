import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoCommunityScreen, Drawer, DemoDebugScreen } from "../screens"
import { ProjectScreen } from "../screens/Project/ProjectScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import FeatherIcon from "react-native-vector-icons/Feather"
import { palette } from "app/theme/palette"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  Project: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.lightGrey,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="DemoShowroom"
        component={Drawer}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="components"
              color={focused ? palette.primary : palette.lightGrey}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="community"
              color={focused ? palette.primary : palette.lightGrey}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          tabBarAccessibilityLabel: "Projects",
          tabBarLabel: "Projects",
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="server"
              size={25}
              color={focused ? palette.primary : palette.lightGrey}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" color={focused ? palette.primary : palette.lightGrey} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
