import { createContext } from "react";

export const MainContext = createContext({
    songs: [],
    collections: [],
    currentSong: {},
    isPlaying: false,
    currentMainComponent: "MainHome",
    favoriteSongs: [],
    currentCollection: ""
})