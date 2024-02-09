import React, { useLayoutEffect, useState } from "react"
import {
  ImageProps as DefaultImageProps,
  ImageURISource,
  Platform,
  Image as RNImage,
} from "react-native"

type ImageProps = DefaultImageProps & {
  source: ImageURISource
}

export function Avatar(props: ImageProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    let mounted = true

    if (props.source?.uri) {
      RNImage.getSize(props.source.uri as any, (width, height) => {
        if (mounted) setImageSize({ width, height })
      })
    } else if (Platform.OS === "web") {
      // web requires a different method to get it's size
      RNImage.getSize(props.source as any, (width, height) => {
        if (mounted) setImageSize({ width, height })
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(props.source)
      setImageSize({ width, height })
    }

    return () => {
      mounted = false
    }
  }, [props.source])

  return (
    <RNImage
      {...props}
      style={[imageSize, props.style]}
      onError={() => console.log("Failed to get size of Image")}
    />
  )
}
