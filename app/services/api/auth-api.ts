import { apiBase } from "./base"
import { GetWhoAmIResult } from "app/services/api/api.types"

export class AuthApi {
  async whoami(email: string): Promise<GetWhoAmIResult> {
    const response = await apiBase.get("whoami", {
      headers: {
        Authorization: `EMAIL ${email}`,
      },
    })
    const user = response.data
    return { user: user }
  }
}
