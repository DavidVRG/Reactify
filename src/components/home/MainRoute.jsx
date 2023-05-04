import React, { useContext } from 'react'
import MainHome from './mainComponents/MainHome'
import MainCollections from './mainComponents/MainCollections'
import { MainContext } from '../../context/MainContext'
import MainFavoriteSongs from './mainComponents/MainFavoriteSongs'
import MainSearch from './mainComponents/MainSearch'

export default function MainRoute({ setCurrentSong, setIsPlaying, setCurrentMainComponent, setCurrentCollection }) {

  // Import currentMainComponent from MainContext
  const { currentMainComponent } = useContext(MainContext)

  // Set the current component function
  function handleComponentRoute() {
    switch (currentMainComponent) {
      case "MainHome":
        return <MainHome setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} setCurrentMainComponent={setCurrentMainComponent} setCurrentCollection={setCurrentCollection} />
      case "MainCollections":
        return <MainCollections setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} setCurrentMainComponent={setCurrentMainComponent} />
      case "MainFavoriteSongs":
        return <MainFavoriteSongs setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} setCurrentMainComponent={setCurrentMainComponent} />
      case "MainSearch":
        return <MainSearch setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} setCurrentMainComponent={setCurrentMainComponent} />
    }
  }

  return (
    <section className='w-full overflow-y-scroll py-8 px-4 lg:w-[85%] bg-[#141414]'>
      {handleComponentRoute()}
    </section>
  )
}