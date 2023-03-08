import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

let store = (set) => ({
  user: {},
  updateUser: (newUser) => set(() => ({user: newUser})),
  clearUser: () => set({user: {}})
})

store = devtools(store)
store = persist(store, {name : 'user'})

const useUserStore = create(store);

export default useUserStore;