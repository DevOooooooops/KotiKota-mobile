import React from "react"
import { View } from "react-native"
import { Avatar } from "app/components/Avatar/Avatar"
import { Text } from "app/components"

export interface ContributionCardProps {
  label: string
}

export function ContributionCard(props: ContributionCardProps) {
  const { label } = props
  return (
    <View
      style={{
        width: 140,
        height: 150,
        marginHorizontal: 15,
        flexDirection: "column",
      }}
    >
      <View>
        <Avatar
          source={require("assets/images/project-green.png")}
          style={{
            width: 140,
            height: 110,
            borderRadius: 20,
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text preset="default" text={label} />
      </View>
    </View>
  )
}
