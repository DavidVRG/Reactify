import React, { useEffect, useState } from 'react'
import MusicPlayer from '../components/home/MusicPlayer'
import Sidebar from '../components/Home/Sidebar'
import MainRoute from '../components/home/MainRoute'
import { MainContext } from '../context/MainContext'
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { db } from '../firebase/firebase'

export default function Home() {

  // Imprt auth from firebase
  const auth = getAuth()

  // Set favorite songs
  const [favoriteSongs, setFavoriteSongs] = useState([])

  // Set data from sounds.json
  const [songs, setSongs] = useState([])

  // Set data from collections.json
  const [collections, setCollections] = useState([])

  // Set current collection
  const [currentCollection, setCurrentCollection] = useState("")

  // Current main component state
  const [currentMainComponent, setCurrentMainComponent] = useState("MainHome")

  // Set the default current song
  const [currentSong, setCurrentSong] = useState({
    mp3: "songs/TobuHope.mp3",
    title: "Hope",
    author: "Tobu",
    image: "songs/TobuHope.jpg"
  })

  // Set isplaying
  const [isPlaying, setIsPlaying] = useState(false)

  // Fetch data from songs.json
  useEffect(() => {
    async function getSongs() {
      const res = await fetch('songs.json')
      const data = await res.json()
      setSongs(data)
    }
    getSongs()
  }, [])

  // Fetch data from collections.json
  useEffect(() => {
    async function getCollections() {
      const res = await fetch('collections.json')
      const data = await res.json()
      setCollections(data)
    }
    getCollections()
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      setFavoriteSongs(doc.data().favoriteSongs)
    })
    return () => unsub
  }, [])

  return (
    <MainContext.Provider
      value={{
        songs: songs,
        currentSong: currentSong,
        isPlaying: isPlaying,
        collections: collections,
        currentMainComponent: currentMainComponent,
        favoriteSongs: favoriteSongs,
        currentCollection: currentCollection
      }}>
      <main className='bg-black h-screen w-screen flex'>
        <Sidebar setCurrentMainComponent={setCurrentMainComponent} />
        <MainRoute setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} setCurrentMainComponent={setCurrentMainComponent} setCurrentCollection={setCurrentCollection} />
        <MusicPlayer setIsPlaying={setIsPlaying} />
      </main>
    </MainContext.Provider>
  )
}