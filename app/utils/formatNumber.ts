export const formatNumber = (num = 0) => {
  const numAbs = Math.abs(num)

  if (numAbs >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"
  } else if (numAbs >= 1e3) {
    return (num / 1e3).toFixed(1) + "k"
  } else {
    return num.toString()
  }
}
