import { apiBase } from "./base"
import { GetWhoAmIResult } from "app/services/api/api.types"

export class AuthApi {
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
