import { Instance, types } from "mobx-state-tree"

export const ProfileModel = types.model("Profile").props({
  first_name: types.maybeNull(types.string),
  last_name: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
})

export const BankInfoModel = types.model("BankInfo").props({
  amount: types.maybeNull(types.number),
})

export const UserModel = types.model("User").props({
  id: types.maybeNull(types.string),
  firebaseId: types.maybeNull(types.string),
  birthDate: types.maybeNull(types.string),
  profile: types.maybeNull(ProfileModel),
  bankInfo: types.maybeNull(BankInfoModel),
})

export interface User extends Instance<typeof UserModel> {}
