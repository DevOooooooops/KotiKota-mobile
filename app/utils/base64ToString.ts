import { ImageSourcePropType, ImageURISource } from "react-native"

export const renderBase64 = (value = ""): ImageSourcePropType | ImageURISource => {
  const imageUri = `data:image/png;base64,${value}`
  return { uri: imageUri }
}
