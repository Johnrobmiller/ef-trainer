import { atom, RecoilState } from 'recoil'

export const hasTheGameStarted: RecoilState<boolean> = atom({
  key: 'hasTheGameStarted',
  default: Boolean(false),
})

export const triggerForNewTrial: RecoilState<{ trigger: boolean, didTheyGetItRight: boolean }> = atom({
  key: 'triggerForNewTrial',
  default: {
    trigger: Boolean(false),
    didTheyGetItRight: Boolean(false)
  }
})

const typed1: RecoilState<boolean> = atom({
  key: 'typed1',
  default: Boolean(false)
})
const typed2: RecoilState<boolean> = atom({
  key: 'typed2',
  default: Boolean(false)
})
const typed3: RecoilState<boolean> = atom({
  key: 'typed3',
  default: Boolean(false)
})
const typed4: RecoilState<boolean> = atom({
  key: 'typed4',
  default: Boolean(false)
})

export const playerUsedKeyboardArray: RecoilState<boolean>[] = [typed1, typed2, typed3, typed4]
