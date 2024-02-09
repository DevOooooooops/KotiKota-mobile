import { Instance, types } from "mobx-state-tree"

export enum ProjectStatus {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export enum ProjectHealthType {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
}

export const ProjectModel = types.model("Project").props({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  targetAmount: types.maybeNull(types.number),
  deadline: types.maybeNull(types.string),
  ownerId: types.maybeNull(types.string),
  status: types.maybeNull(types.enumeration(Object.values(ProjectStatus))),
  health: types.maybeNull(types.enumeration(Object.values(ProjectHealthType))),
})

export interface Project extends Instance<typeof ProjectModel> {}
