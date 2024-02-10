import { types } from "mobx-state-tree"
import { flow } from "mobx"
import { User, UserModel } from "app/models/entities/user/user"
import { AuthApi } from "app/services/api/auth-api"
import { Project, ProjectModel } from "app/models/entities/project/Project"
import { ProjectApi } from "app/services/api/project-api"
import { Donation } from "app/models/entities/donation/Donation"

export const AuthStoreModel = types
  .model("Auth")
  .props({
    accessToken: types.maybeNull(types.string),
    currentUser: types.maybeNull(UserModel),
    allProjects: types.optional(types.array(ProjectModel), []),
    selfProjects: types.optional(types.array(ProjectModel), []),
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
    setAllProjects(projects: Project[]) {
      self.allProjects.replace(projects)
    },
  }))
  .actions((self) => ({
    setSelfProjects(projects: Project[]) {
      self.selfProjects.replace(projects)
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
  .actions((self) => ({
    getAllProjects: flow(function* () {
      const projectApi = new ProjectApi()
      try {
        const getProjectsResult = yield projectApi.getProjects(self?.accessToken ?? "")
        self.setAllProjects(getProjectsResult.projects)
      } catch (e) {
        console.tron.log(e)
      }
    }),
  }))
  .actions((self) => ({
    getSelfProjects: flow(function* () {
      const projectApi = new ProjectApi()
      try {
        const getProjectsResult = yield projectApi.getProjects(self?.accessToken ?? "", {
          ownerId: self.currentUser?.id,
        })
        self.setSelfProjects(getProjectsResult.projects)
      } catch (e) {
        console.tron.log(e)
      }
    }),
  }))
  .actions((self) => ({
    createDonation: flow(function* (projectId: string, donation: Donation) {
      const projectApi = new ProjectApi()
      try {
        yield projectApi.createDonation(self?.accessToken ?? "", projectId, donation)
      } catch (e) {
        console.tron.log(e)
      }
    }),
  }))
