let nowPlaying = new Audio()

function minSec(seconds) {
    // Calculate minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Add leading zeros if necessary
    var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
    var formattedSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;

    // Return formatted string
    return formattedMinutes + ":" + formattedSeconds;
}

async function songFetch() {
    let song = await fetch("http://127.0.0.1:3000/Assignments/Audiopulse/songs/")
    let result = await song.text();
    let div = document.createElement("div")
    div.innerHTML = result
    let songURL = div.getElementsByTagName("a")

    let songArr = []
    for (const item of songURL) {
        if (item.href.endsWith(".mp3"))
            songArr.push(item.href)
    }
    return songArr
}

const playSong = (name) => {
    if (!name) {
        console.log("name is undefined");
        return -1;
    }
    nowPlaying.src = `songs/${name}.mp3`;
    nowPlaying.play()
    play.src = "svg/pause_cyan.svg"
    document.getElementsByClassName("song-title")[0].getElementsByTagName("h3")[0].innerHTML = name
    document.getElementsByClassName("song-title")[0].getElementsByTagName("p")[0].innerHTML = "Audiopulse"
    nowPlaying.addEventListener('loadeddata', () => {
        document.getElementById("time-left").innerHTML= minSec(nowPlaying.currentTime)
        document.getElementById("total-time").innerHTML= `${minSec(nowPlaying.duration)}`
    })
}

function noSong() {
    setTimeout(() => {
        document.getElementsByClassName("song-title")[0].getElementsByTagName("h3")[0].innerHTML = "Select a song"
    }, 1500);
    document.getElementsByClassName("song-title")[0].getElementsByTagName("h3")[0].innerHTML = "No selected song"
} 

async function main() {
    let songList = await songFetch()
    let firstTimeNoSong = true

    for (const url of songList) {
        let name = url.split("/songs/")[1].split(".mp3")[0].replaceAll("%20", " ")
        let libCard = `<div class="music">
                        <img src="svg/music.svg" alt="Music">
                        <div class="music-title">
                            <span>${name}</span>
                            <p>Artist name Lorem ipsum dolor sit amet.</p>
                        </div>
                        <img src="svg/playSong.svg" alt="Play">
                        </div>`
        document.getElementById("mysongs").innerHTML += libCard
    }

    Array.from(document.getElementsByClassName("music")).forEach(e => {
        e.getElementsByTagName("img")[1].addEventListener('click', () => {
            console.log(`http://127.0.0.1:3000/Assignments/Audiopulse/songs/${e.getElementsByTagName("span")[0].innerHTML.replaceAll(" ","%20")}.mp3`)
            playSong(e.getElementsByTagName("span")[0].innerHTML)
            firstTimeNoSong = false;
        })
    })

    document.getElementById("play").addEventListener('click', () => {
        if (firstTimeNoSong) {
            noSong()
        }
        else if (nowPlaying.paused) {
            console.log("Trying to play "+nowPlaying.src)
            nowPlaying.play().then(() => {
                console.log("Now Playing ...")
                play.src = "svg/pause_cyan.svg"
            }).catch((error) => {
                console.log("Error is : "+error)
                noSong()
            })
        }
        else {
            console.log("Trying to pause "+nowPlaying.src)
            nowPlaying.pause()
            play.src = "svg/playSong_cyan.svg"
        }
    })

    nowPlaying.addEventListener('timeupdate', () => {
        console.log(minSec(nowPlaying.duration)+" "+minSec(nowPlaying.currentTime)+" "+(nowPlaying.currentTime / nowPlaying.duration)*100)
        document.getElementById("time-left").innerHTML = minSec(nowPlaying.currentTime)
        document.getElementsByClassName("duration-bar")[0].style.width = (nowPlaying.currentTime / nowPlaying.duration)*100 + "%"
        if (nowPlaying.currentTime === nowPlaying.duration) {
            document.getElementById("play").src = "svg/playSong_cyan.svg"
        }
    })

    document.getElementsByClassName("touch")[0].addEventListener('click', e => {
        console.log(e.offsetX,e.target.getBoundingClientRect().width,(e.offsetX/e.target.getBoundingClientRect().width)*100)
        
        let changedTime = (e.offsetX/e.target.getBoundingClientRect().width)*100

        document.getElementsByClassName("duration-bar")[0].style.width = changedTime + "%"
        nowPlaying.currentTime = (nowPlaying.duration * changedTime)/100
    })
}
main()