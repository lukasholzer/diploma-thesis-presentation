if (module.hot) {
  module.hot.accept()
}

require('./style.scss')

const _ACTIVE_CLASS = 'slide--active';
const _DISABLED_CLASS = 'button--disabled';
const slides = document.querySelectorAll('.slide');

let _next = true;
let _prev = false;
let current = slides.length-1;

const next = document.querySelector('.slides-controll__next');
const prev = document.querySelector('.slides-controll__prev');

document.onkeydown = keyCheck;
function keyCheck(e) {

  fullScreen();

  switch (e.keyCode) {
    case 37: prevSlide(); break; // left
    case 38: prevSlide(); break; // up
    case 39: nextSlide(); break; // right
    case 40: nextSlide(); break; // down
  }
}

// Event Listeners
next.addEventListener('click', (e) => {
  nextSlide();
});

prev.addEventListener('click', (e) => {
  prevSlide();
});



// Functions

function fullScreen() {
  const element = document.body; //document.querySelector('.slides');

  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}
function nextSlide() {
  if (!_next) {
    return;
  }

  current--;

  slides[current].classList.add(_ACTIVE_CLASS);
  slides[current].classList.add('slide--right');
  slides[current + 1].classList.remove(_ACTIVE_CLASS);
  slides[current + 1].classList.remove('slide--right', 'slide--left');


  if (current < slides.length && !_prev) {
    toggle_prev();
  }

  if (current == 0) {
    toggle_next();
  }

}

function prevSlide() {
  if (!_prev) {
    return;
  }

  current++;

  slides[current].classList.add(_ACTIVE_CLASS);
  slides[current].classList.add('slide--left');
  slides[current - 1].classList.remove(_ACTIVE_CLASS);
  slides[current - 1].classList.remove('slide--right', 'slide--left');


  if (current == slides.length - 1) {
    toggle_prev();
  }

  if (current > 0 && !_next) {
    toggle_next();
  }

}

function toggle_next() {
  _next = (_next) ? false : true;
  next.classList.toggle(_DISABLED_CLASS);
}

function toggle_prev() {
  _prev = (_prev) ? false : true;
  prev.classList.toggle(_DISABLED_CLASS);
}

