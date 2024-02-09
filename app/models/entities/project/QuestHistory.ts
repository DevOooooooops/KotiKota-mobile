import { Instance, types } from "mobx-state-tree"
import { AccountModel } from "../user/user"
import { QuestModel } from "./Project"

export enum QuestStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAILED = "FAILE",
}

export const QuestHistoryModel = types.model("TransactionStore").props({
  id: types.maybeNull(types.string),
  quest: types.maybeNull(QuestModel),
  user: types.maybeNull(AccountModel),
  status: types.maybeNull(types.enumeration(Object.values(QuestStatus))),
})

export interface QuestHistory extends Instance<typeof QuestHistoryModel> {}
