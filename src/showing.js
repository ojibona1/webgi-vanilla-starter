class addMovie {
    constructor(name, duration, color){
         this.name = name
         this.duration = duration 
         this.color = color 
    }
}

const movies = [
    new addMovie("Creed 3", 1.3, 'black'),
    new addMovie("SpiderMan", 2.5, 'red'),
    new addMovie("Black Panther", 2.45, 'black'),
    new addMovie("Avatar", 2.5, 'purple'),
    new addMovie("Battle on Buka Street", 3.5, "orange")
]

const moviePlate = document.querySelector(".third")



movies.forEach((movie)=>{
    const banner = document.createElement('li')
    banner.innerHTML = `${movie.name}`
    moviePlate.appendChild(banner)
})