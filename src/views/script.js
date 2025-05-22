const header = document.querySelector(".header_right");
searchIcon = document.querySelector(".search-icon2");

searchIcon.addEventListener("click", () => {
    header.classList.toggle("openSearch");
})

let list = document.querySelector('.slide .list');
let item = document.querySelectorAll('.slide .list .item');
let dots = document.querySelectorAll('.slide .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;

next.onclick = function () {
    active += 1;
    if (active >= item.length) active = 0;
    reloadSlide();
}

prev.onclick = function () {
    active -= 1;
    if (active < 0) active = item.length - 1;
    reloadSlide();
}

let refreshSlide = setInterval(() => { next.click() }, 3000)
function reloadSlide() {
    let checkLeft = item[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector('.slide .dots li.active')
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', function () {
        active = key;
        reloadSlide();
    })
})