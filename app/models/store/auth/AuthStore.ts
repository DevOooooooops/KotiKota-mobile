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
        console.tron.log(password)
        const getWhoAmIResult = yield signInApi.whoami(username)
        self.setAccessToken(username)
        self.setUser(getWhoAmIResult.user.user)
      } catch (e) {
        console.tron.log(e)
      }
    }),
  }))
