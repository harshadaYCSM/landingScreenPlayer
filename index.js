// const { get } = require("http")
let continueWatching
let topMovies 
let continueWatchingTime
let playedId 
let dataPayload

function loadHomeScreen() {
    console.log("loading homescreen")
    fetch("https://api.jsonbin.io/b/5fa0f4cba03d4a3bab0bc8c6",{
        method : "GET",
        headers : {
            "secret-key" : "$2b$10$3bWZePWQ5dqXtKJmluXF8OsCtN4NhCb1ac3XSlPTcjrG0AJw9LuY."
        }
    }
    )
    .then((response) => response.json())
    .then((data) => {
        dataPayload = data
        console.log(data)
        continueWatching = data.filter((list) => list.type === "continuewatching")
        console.log(continueWatching[0].videos)
        topMovies = data.filter((list) => list.type === "topmovies")
        console.log(topMovies[0].videos)
        document.getElementById("1").src = continueWatching[0].videos[0].banner
        document.getElementById("2").src = continueWatching[0].videos[1].banner
        document.getElementById("3").src = continueWatching[0].videos[2].banner
        document.getElementById("4").src = topMovies[0].videos[0].banner
        document.getElementById("5").src = topMovies[0].videos[1].banner
        document.getElementById("6").src = topMovies[0].videos[2].banner
        document.getElementById("ct1").innerHTML = "Coninue watching from: " + Math.floor(continueWatching[0].videos[0].continueWatchingDuration) + "s"
        document.getElementById("ct2").innerHTML = "Coninue watching from: " + Math.floor(continueWatching[0].videos[1].continueWatchingDuration) + "s"
        document.getElementById("ct3").innerHTML = "Coninue watching from: " + Math.floor(continueWatching[0].videos[2].continueWatchingDuration) + "s"
    })
}

function playVideo(id) {
    console.log("playing video")
    playedId = id
    let homeScreen = document.getElementById("homeContainer")
    let myVideo = document.getElementById("video")
    let backButton = document.getElementById("back")
    backButton.style.display = "block"
    homeScreen.style.display= "none"
    myVideo.style.display = "block"
    if (id < 4) {
        myVideo.src = continueWatching[0].videos[id-1].videoURL
        if (continueWatching[0].videos[id-1].isContinueWatching) {
            myVideo.currentTime = continueWatching[0].videos[id-1].continueWatchingDuration
        }
    }
    else {
        myVideo.src = topMovies[0].videos[id-4].videoURL
    }
    myVideo.load()
    myVideo.addEventListener('ended', goBack)
    myVideo.play()
}

function goBack() {
    console.log("going back")
    let homeScreen = document.getElementById("homeContainer")
    let myVideo = document.getElementById("video")
    let backButton = document.getElementById("back")
    backButton.style.display = "none"
    homeScreen.style.display= "block"
    myVideo.style.display = "none"
    if(myVideo.currentTime === myVideo.duration) {
        continueWatchingTime = 0
    }
    else {
        continueWatchingTime = myVideo.currentTime
    }
    myVideo.src = "";
    if(playedId < 4) {
        dataPayload[0].videos[playedId-1].isContinueWatching = true
        dataPayload[0].videos[playedId-1].continueWatchingDuration = continueWatchingTime
    }

    let newData =  JSON.stringify(dataPayload)
    console.log("updating continue watching info")
    fetch("https://api.jsonbin.io/b/5fa0f4cba03d4a3bab0bc8c6",{
        method : "PUT",
        headers : {
            "secret-key" : "$2b$10$3bWZePWQ5dqXtKJmluXF8OsCtN4NhCb1ac3XSlPTcjrG0AJw9LuY.",
            "versioning" : "false",
            "Content-Type":"application/json"
        },
        body : newData
    }
    )
    .then((response) => {
        response.json()
        console.log("updated")
    })
    .then((data) => {
        console.log("updated data")
        loadHomeScreen()
    })
}