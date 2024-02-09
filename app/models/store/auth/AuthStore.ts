import { types } from "mobx-state-tree"
import { flow } from "mobx"

export const AuthStoreModel = types
  .model("Auth")
  .props({
    accessToken: types.maybeNull(types.string),
    currentUser: types.maybeNull(types.string),
    currentAccount: types.maybeNull(types.string),
  })
  .actions((self) => ({
    reset: () => {
      self.accessToken = null
      self.currentUser = null
      self.currentAccount = null
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
    setUser(user: string) {
      self.currentUser = user
    },
  }))
  .actions((self) => ({
    setAccount(account: string) {
      self.currentAccount = account
    },
  }))
  .actions((self) => ({
    logout: flow(function* () {
      self.reset()
    }),
  }))
/*.actions(self => ({
    signUp: flow(function* (birthdate: string, username: string, password: string) {
      const signUpApi = new AuthApi();
      try {
        const payload = {
          birthDate: birthdate,
          username: username,
          password: password,
        };
        const getTokenResult = yield signUpApi.signUp(payload);
        self.setUser(getTokenResult.user);
      } catch (e) {
        console.tron.log(e);
      }
    }),
  }))*/
