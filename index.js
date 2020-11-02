// const { get } = require("http")
let continueWatching
let topMovies 
function loadHomeScreen() {
    console.log("loading homescreen")
    let myVideo = document.getElementById("video")
    fetch("https://api.jsonbin.io/b/5fa00ad247077d298f5bb6fa/4",{
        method : "GET",
        headers : {
            "secret-key" : "$2b$10$3bWZePWQ5dqXtKJmluXF8OsCtN4NhCb1ac3XSlPTcjrG0AJw9LuY."
        }
    }
    )
    .then((response) => response.json())
    .then((data) => {
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

    })
}

function playVideo() {
    let homeScreen = document.getElementById("homeContainer")
    homeScreen.style.display= "none"
    let myVideo = document.getElementById("video")
    myVideo.style.display = "block"
    myVideo.src = continueWatching[0].videos[0].videoURL
    myVideo.load()
    myVideo.play()
}