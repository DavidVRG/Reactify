import React, { useState } from 'react'

export function Duration({ song }) {

    const [duration, setDuration] = useState("00:00")
    const audio = new Audio(song)
    audio.onloadedmetadata = (e) => {
        if (audio.readyState > 0) {
            let minutes = "0" + parseInt(audio.duration / 60, 10);
            let seconds = "0" + parseInt(audio.duration % 60);
            setDuration(minutes + ":" + seconds.slice(-2))
        }
    }
    return duration
}
