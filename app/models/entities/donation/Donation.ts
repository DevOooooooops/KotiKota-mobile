import { Instance, types } from "mobx-state-tree"

export const DonationModel = types.model("Donation").props({
  id: types.maybeNull(types.string),
  creationDatetime: types.maybeNull(types.string),
  amount: types.maybeNull(types.number),
  source: types.maybeNull(types.string),
  destination: types.maybeNull(types.string),
  reason: types.maybeNull(types.string),
})

export interface Donation extends Instance<typeof DonationModel> {}
