export const convertDate = (dateISO8601: string) => {
  const dateObj = new Date(dateISO8601)
  const annee = dateObj.getFullYear()
  const mois = (dateObj.getMonth() + 1).toString().padStart(2, "0")
  const jour = dateObj.getDate().toString().padStart(2, "0")
  return `${annee}-${mois}-${jour}`
}
