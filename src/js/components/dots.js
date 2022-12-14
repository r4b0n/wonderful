const dots = document.querySelectorAll('.dots');
let row = 0;
const rows = 12;
const dots_per_row = 12;
const dot_gap = 25;
let increment_x = 0;
let increment_y = 0;

const get_random = (min, max) => {
  return min + Math.random() * (max - min);
};

const flickerOn = (dot, dot2) => {
  gsap.to([dot, dot2], {
    delay: get_random(0, 7),
    duration: get_random(1, 3),
    opacity: 1,
    ease: 'none',
    onComplete: flickerOff,
    onCompleteParams: [dot, dot2],
  });
};

const flickerOff = (dot, dot2) => {
  gsap.to([dot, dot2], {
    delay: get_random(0, 7),
    duration: get_random(1, 3),
    opacity: 0,
    ease: 'none',
    onComplete: flickerOn,
    onCompleteParams: [dot, dot2],
  });
};

for (let i = 0; i < rows * dots_per_row; i++) {
  if (i % dots_per_row === 0) {
    if (row > 0) {
      increment_y += dot_gap;
    }
    row++;
    increment_x = 0;
  }
  let dot = document.createElement('div');
  let dot2 = document.createElement('div');
  dot.setAttribute('class', 'dot');
  dot2.setAttribute('class', 'dot');
  dots[0].appendChild(dot);
  dots[1].appendChild(dot2);
  gsap.set([dot, dot2], {
    x: dot_gap * increment_x,
    y: increment_y,
    opacity: get_random(0, 0.9),
  });
  gsap.to([dot, dot2], {
    delay: get_random(0, 7),
    duration: get_random(1, 3),
    opacity: 0,
    ease: 'none',
    onComplete: flickerOn,
    onCompleteParams: [dot, dot2],
  });
  increment_x++;
}

document.onblur = function () {
  gsap.killTweensOf('.dot');
};

document.onfocus = function () {
  let dots = document.getElementsByClassName('dot');
  for (let i = 0; i < dots.length; i++) {
    gsap.to(dots[i], {
      delay: get_random(0, 7),
      duration: get_random(1, 3),
      opacity: 0,
      ease: 'none',
      onComplete: flickerOn,
      onCompleteParams: [dots[i]],
    });
  }
};
