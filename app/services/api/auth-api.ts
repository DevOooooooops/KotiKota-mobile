import { apiBase } from "./base"
import { GetTokenResult, GetWhoAmIResult } from "app/services/api/api.types"

export class AuthApi {
  async getToken(username: string, password: string): Promise<GetTokenResult> {
    const response: string = await apiBase.post("token", {
      username: username,
      password: password,
    })
    const accessToken = response
    return { accessToken: accessToken }
  }
  async whoami(token: string): Promise<GetWhoAmIResult> {
    const response = await apiBase.get("whoami", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const user = response.data
    return { user: user }
  }
}
