let touch = document.getElementsByClassName("touch")[0]
let circle = document.getElementsByClassName("circle")[0]
let durationbar = document.getElementsByClassName("duration-bar")[0]
function scrollToTarget() {
    var targetElement = document.getElementById("playlist");
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
}


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

document.getElementsByClassName("main-nav")[0].children[0].addEventListener('click', () => {
    document.getElementsByClassName("sidebar")[0].style.left = "0%"
    document.getElementsByClassName("blurBg")[0].style.display = "block"
})
document.getElementsByClassName("blurBg")[0].addEventListener('click', () => {
    document.getElementsByClassName("sidebar")[0].style.left = ""
    document.getElementsByClassName("blurBg")[0].style.display = ""
})
document.getElementById("closeBtn").addEventListener('click', () => {
    document.getElementsByClassName("sidebar")[0].style.left = ""
    document.getElementsByClassName("blurBg")[0].style.display = ""
})

document.querySelector(".a").children[0].addEventListener("click", scrollToTarget);