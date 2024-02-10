import { types } from "mobx-state-tree"
import { flow } from "mobx"
import { User, UserModel } from "app/models/entities/user/user"
import { AuthApi } from "app/services/api/auth-api"

export const AuthStoreModel = types
  .model("Auth")
  .props({
    accessToken: types.maybeNull(types.string),
    currentUser: types.maybeNull(UserModel),
  })
  .actions((self) => ({
    reset: () => {
      self.accessToken = null
      self.currentUser = null
    },
  }))
  .actions((self) => ({
    catchOrThrow: (error: Error) => {
      const errorMessage = error.message

      if (errorMessage === "forbidden") {
        return self.reset()
      }
    },
  }))
  .actions((self) => ({
    setAccessToken(token: string) {
      self.accessToken = token
    },
  }))
  .actions((self) => ({
    setUser(user: User) {
      self.currentUser = user
    },
  }))
  .actions((self) => ({
    setUser(user: User) {
      self.currentUser = user
    },
  }))
  .actions((self) => ({
    logout: flow(function* () {
      self.reset()
    }),
  }))
  .actions((self) => ({
    login: flow(function* (username: string, password: string) {
      const signInApi = new AuthApi()
      try {
        const getTokenResult = yield signInApi.getToken(username, password)
        self.setAccessToken(getTokenResult.accessToken)
        const getWhoAmIResult = yield signInApi.whoami(getTokenResult.accessToken)
        self.setUser({
          id: getWhoAmIResult.user.id,
          firebaseId: getWhoAmIResult.user.firebaseId,
          birthDate: getWhoAmIResult.user.birthDate,
          profile: {
            first_name: getWhoAmIResult.user.birthDate,
            last_name: getWhoAmIResult.user.birthDate,
            email: getWhoAmIResult.user.birthDate,
          },
          bankInfo: {
            amount: getWhoAmIResult.user.amount,
          },
        })
      } catch (e) {
        console.tron.log(e)
      }
    }),
  }))
