import React, { useContext, useEffect, useRef, useState } from 'react'
import { MainContext } from '../../context/MainContext'
import { Duration } from '../utils/Duration'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { getAuth } from 'firebase/auth'

export default function MusicPlayer({ setIsPlaying }) {

    // Import auth from firebase
    const auth = getAuth()

    // Ref for audio
    const audioRef = useRef()

    // Set volume
    const [volume, setVolume] = useState(10)

    // Set current time
    const [currentTime, setCurrentTime] = useState("00:00")

    // Set duration 
    const [duration, setDuration] = useState(0)
    const [durationTrigger, setDurationTrigger] = useState(0)

    // Import currentSong and isPlaying from MainContext
    const { currentSong, isPlaying, favoriteSongs } = useContext(MainContext)

    // If isPlaying then set the volume and play
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
            if (volume < 10) {
                audioRef.current.volume = `0.00${volume}`
            } else {
                audioRef.current.volume = `0.0${volume}`
            }
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying, currentSong, volume])

    // Set current time with range
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.currentTime = (audioRef.current.duration / 100) * duration
        }
    }, [durationTrigger])

    // Set current time range
    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                let minutes = "0" + parseInt(audioRef.current.currentTime / 60, 10)
                let seconds = "0" + parseInt(audioRef.current.currentTime % 60)
                setCurrentTime(minutes + ":" + seconds.slice(-2))
                setDuration(audioRef.current.currentTime / audioRef.current.duration * 100)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [isPlaying, currentSong])

    // If mobile then set the volume full
    useEffect(() => {
        function handleVolume() {
            if (window.innerWidth < 768) {
                setVolume(99)
            } else {
                setVolume(10)
            }
        }
        window.addEventListener("resize", handleVolume)
    }, [])

    // Update user favorite songs
    function updateFavoriteSongs(type) {
        const userRef = doc(db, "users", auth.currentUser.uid)
        if (type === "add") {
            updateDoc(userRef, {
                favoriteSongs: arrayUnion(currentSong.mp3)
            });
        } else {
            updateDoc(userRef, {
                favoriteSongs: arrayRemove(currentSong.mp3)
            });
        }
    }

    return (
        currentSong && (
            <footer className='fixed bottom-0 left-0 right-0 h-24 w-full bg-[#181818] border-t-[1px] border-[#1f1f1f] text-white'>

                <audio ref={audioRef} src={currentSong.mp3} onEnded={() => setIsPlaying(false)} />

                {/* Desktop player */}
                <div className='hidden md:flex px-4 w-full h-full items-center'>

                    {/* Footer player left section */}
                    <section className='w-1/4 flex items-center gap-4'>
                        <img src={currentSong.image} alt="Tobu" className='w-14 h-14 rounded-md shadow-sm' />
                        <div>
                            <span className='block font-medium'>{currentSong.author}</span>
                            <span className='block font-medium text-xs text-[#8e8e8e]'>{currentSong.title}</span>
                        </div>

                        {favoriteSongs.includes(`${currentSong.mp3}`) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-white" onClick={() => updateFavoriteSongs("remove")}>
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => updateFavoriteSongs("add")}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        )}

                    </section>

                    {/* Footer player center section */}
                    <section className='w-2/4 space-y-2'>
                        <div className='flex justify-center items-center gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                                <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                            </svg>

                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 cursor-pointer" onClick={() => setIsPlaying(prevState => !prevState)}>
                                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 cursor-pointer" onClick={() => setIsPlaying(prevState => !prevState)}>
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                            )}

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                                <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                            </svg>
                        </div>
                        <div className='flex gap-2'>
                            <div>{currentTime}</div>
                            <input
                                type="range"
                                name="duration"
                                id="duration"
                                value={duration}
                                onChange={(e) => {
                                    setDuration(e.target.value)
                                    setDurationTrigger(prevState => prevState + 1)
                                }}
                                min={0}
                                step={1}
                                max={100}
                                className='w-full' />
                            <div>
                                <Duration song={currentSong.mp3} />
                            </div>
                        </div>
                    </section>

                    {/* Footer player right section */}
                    <section className='w-1/4 flex justify-end items-center gap-2'>
                        {volume > 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setVolume(0)}>
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => setVolume(50)}>
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                            </svg>
                        )}
                        <input
                            type="range"
                            min={0}
                            max={99}
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            name="volume"
                            id="volume" />
                    </section>

                </div>

                {/* Mobile player */}
                <div className='block px-4 md:hidden w-full h-full'>

                    <div className='flex w-full h-[75%] items-center justify-between'>

                        {/* Footer player left section */}
                        <section className='flex items-center gap-4'>
                            <img src={currentSong.image} alt="Tobu" className='w-14 h-14 rounded-md shadow-sm' />
                            <div>
                                <span className='block font-medium'>{currentSong.author}</span>
                                <span className='block font-medium text-xs text-[#8e8e8e]'>{currentSong.title}</span>
                            </div>
                        </section>

                        {/* Footer player right section */}
                        <section className='flex justify-center items-center gap-4'>
                            {favoriteSongs.includes(`${currentSong.mp3}`) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer text-white" onClick={() => updateFavoriteSongs("remove")}>
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => updateFavoriteSongs("add")}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            )}
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" onClick={() => setIsPlaying(prevState => !prevState)}>
                                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" onClick={() => setIsPlaying(prevState => !prevState)}>
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                            )}
                        </section>

                    </div>

                    {/* Footer player full range */}
                    <input
                        type="range"
                        name="duration"
                        id="duration"
                        value={duration}
                        onChange={(e) => {
                            setDuration(e.target.value)
                            setDurationTrigger(prevState => prevState + 1)
                        }}
                        min={0}
                        step={1}
                        max={100}
                        className='w-full' />
                </div>

            </footer>
        )
    )
}