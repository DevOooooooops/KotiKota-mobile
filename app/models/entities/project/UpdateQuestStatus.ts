import { Instance, types } from 'mobx-state-tree';

export enum QuestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILE',
}

export const UpdateQuestModel = types.model('TransactionStore').props({
  id: types.maybeNull(types.string),
  questId: types.maybeNull(types.string),
  userId: types.maybeNull(types.string),
  status: types.maybeNull(types.enumeration(Object.values(QuestStatus))),
});

export interface UpdateQuest extends Instance<typeof UpdateQuestModel> {}
