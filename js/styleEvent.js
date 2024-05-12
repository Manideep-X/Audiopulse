let touch = document.getElementsByClassName("touch")[0]
let circle = document.getElementsByClassName("circle")[0]
let durationbar = document.getElementsByClassName("duration-bar")[0]

touch.addEventListener('mouseenter', () => {
    circle.style.width = "15px"
    circle.style.height = "15px"
    circle.style.top = "-50%"
    durationbar.style.height = "8px"
    durationbar.style.top = "10%"
})
touch.addEventListener('mouseleave', () => {
    circle.style.width = ""
    circle.style.height = ""
    circle.style.top = ""
    durationbar.style.height = ""
    durationbar.style.top = ""
})