import { types } from "mobx-state-tree"
import { flow } from "mobx"
import { User, UserModel } from "app/models/entities/user/user"

export const AuthStoreModel = types
  .model("Auth")
  .props({
    currentUser: types.maybeNull(UserModel),
  })
  .actions((self) => ({
    reset: () => {
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
    setUser(user: User) {
      self.currentUser = user
    },
  }))
  .actions((self) => ({
    logout: flow(function* () {
      self.reset()
    }),
  }))
