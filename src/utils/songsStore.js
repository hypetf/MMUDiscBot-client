import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

let store = (set) => ({
  songs: [],
  updateSongsList: (newSong) => {set((state) => ({songs: [newSong, ...state.songs].slice(0,3)}))},
  clearSongs: () => set({songs: []})
})

store = devtools(store)
store = persist(store, {name : 'songs'})

const useSongsStore = create(store);

export default useSongsStore;