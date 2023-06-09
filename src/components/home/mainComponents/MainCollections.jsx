import React, { useContext, useState } from 'react'
import MobileSideBar from '../MobileSidebar'
import { MainContext } from '../../../context/MainContext'
import { Duration } from '../../utils/Duration'

export default function MainCollections({ setCurrentSong, setIsPlaying, setCurrentMainComponent }) {

  // Show/hide mobile sidebar
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  // Get current collection
  const { currentCollection, songs } = useContext(MainContext)

  return (
    <section>

      <div className={`${showMobileSidebar ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200 lg:hidden fixed h-screen top-0 bottom-0 right-0 left-0 z-50 w-full bg-[#141414] py-8 px-4`}>
        <MobileSideBar setShowMobileSidebar={setShowMobileSidebar} setCurrentMainComponent={setCurrentMainComponent} />
      </div>

      <div className='mb-10 flex justify-between text-white'>
        <div className='flex items-center gap-3'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setCurrentMainComponent("MainHome")}>
            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
          <h1 className='text-3xl text-white font-bold'>{currentCollection}</h1>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 lg:hidden" onClick={() => setShowMobileSidebar(true)}>
          <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
      </div>

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

            {songs.length !== 0 && (
              songs.map((song, id) => {
                return (
                  song.collection === currentCollection && (
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
                )
              })
            )}

          </tbody>

        </table>
      </div>

    </section>
  )
}