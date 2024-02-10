import axios from "axios"

const baseURL = "http://192.168.0.245:8080/"

export const apiBase = axios.create({
  baseURL,
})
