import React, { useContext, useEffect, useState } from 'react'
import MobileSideBar from '../MobileSidebar'
import { MainContext } from '../../../context/MainContext'
import { Duration } from '../../utils/Duration'

export default function MainSearch({ setCurrentMainComponent, setCurrentSong, setIsPlaying }) {

  // Show/hide mobile sidebar
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  // Import songs from MainContext
  const { songs } = useContext(MainContext)

  // Set founded songs
  const [foundedSongs, setFoundedSongs] = useState(songs)

  // Search value
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (searchValue !== "") {
      const foundedSongs = []
      songs.forEach((song) => {
        if (song.title.toLowerCase().includes(searchValue.toLowerCase()) || song.author.toLowerCase().includes(searchValue.toLowerCase())) {
          foundedSongs.push(song)
        }
      })
      setFoundedSongs(foundedSongs)
    } else {
      setFoundedSongs(songs)
    }
  }, [searchValue])

  return (
    <section>

      <div className={`${showMobileSidebar ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200 lg:hidden fixed h-screen top-0 bottom-0 right-0 left-0 z-50 w-full bg-[#141414] py-8 px-4`}>
        <MobileSideBar setShowMobileSidebar={setShowMobileSidebar} setCurrentMainComponent={setCurrentMainComponent} />
      </div>

      <div className='mb-10 flex justify-between text-white'>
        <h1 className='text-3xl text-white font-bold'>Search songs</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 lg:hidden" onClick={() => setShowMobileSidebar(true)}>
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
      </div>

      <input
        type="text"
        name="search"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder='Type the music name or author name'
        className='w-full p-4 rounded-md shadow-sm bg-[#242323] border-[1px] border-[#383737] placeholder:text-white text-white focus:outline-white focus:outline' />


      <div className="relative overflow-x-auto text-white min-h-screen mt-6">
        <table className="w-full text-sm">

          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-2 py-3 text-left">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Length
              </th>
            </tr>
          </thead>

          <tbody>

            {foundedSongs.length !== 0 && (
              foundedSongs.map((song, id) => {
                return (
                  <tr key={id} className='hover:bg-gray-500 hover:bg-opacity-5 transition ease-in-out duration-150 cursor-pointer' onClick={() => {
                    setCurrentSong({
                      mp3: song.mp3,
                      title: song.title,
                      author: song.author,
                      image: song.image
                    }), setIsPlaying(true)
                  }}>
                    <th scope="row" className="px-2 py-2 text-left">
                      <div className='flex gap-2 items-center'>
                        <img src={song.image} alt="Tobu" className='h-12 w-[50px] object-cover' />
                        <div>
                          <span className='block font-medium text-white'>{song.author}</span>
                          <span className='block font-medium text-xs text-[#8e8e8e]'>{song.title}</span>
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-right">
                      <Duration song={song.mp3} />
                    </td>
                  </tr>
                )
              })
            )}

          </tbody>

        </table>
      </div>

    </section>
  )
}