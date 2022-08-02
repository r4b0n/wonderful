const data = [
  {
    name: 'Start',
    heading: 'Development is <span>80%</span> about fundamentals',
    info: 'Without strong attention to the basics, websites become brittle and eventually catch on fire. Therefore, we should always take the time to set ourselves up for success.',
  },
  {
    name: 'Plan',
    heading: '<span>Plan your approach</span> for success',
    info: 'There is no such thing as “luck”. All good development paths start with a well documented plan of attack. Never skip this step!',
  },
  {
    name: 'Code',
    heading: 'Crack your knuckles and <span>start codin’.</span>',
    info: 'Now it’s time to get down to business. Find a solid mixtape and plugin.',
  },
  {
    name: 'QA',
    heading: 'Don’t forget to <span>QA!</span>',
    info: 'Even the best engineers need a second set of eyes on their work. Find a peer, sit them down, and force them to make sure you are as awesome as you think!',
  },
  {
    name: 'Launch',
    heading: 'Everything good? Then <span>launch it!</span>',
    info: 'Everybody wants their site delivered “yesterday” - which means there is no time to lose in getting your work live!',
  },
  {
    name: 'Win!',
    heading: '<span>You did it!</span> We always believed in you.',
    info: 'Now go grab a treat (maybe a doughnut) and enjoy the fruits of your labor!',
  },
];

const heading = document.querySelector('.heading');
const info = document.querySelector('.info');
const info_container = document.querySelector('.info-container');
const info_items = document.querySelector('.info-items');
const plan_copy = document.querySelector('.plan-copy');
const carousel_nav_items = document.querySelector('.carousel-nav-items');
let anim_width = window.innerWidth;
let cur_pos = 0;
let anim_dir = '';
let reverse = false;

heading.innerHTML = data[0].heading;
info.innerHTML = data[0].info;

const resetNavItemsClass = (class_name) => {
  [...carousel_nav_items.children].forEach((item) =>
    item.classList.remove(class_name)
  );
};

const addNavItemClass = (nav_item, class_name) => {
  nav_item.classList.add(class_name);
};

const handleNavItemClick = (e) => {
  const index = [...carousel_nav_items.children].indexOf(e.target);
  if (index > cur_pos && index !== cur_pos) {
    anim_dir = 'left';
    animateCarousel();
  }
  if (index < cur_pos && index !== cur_pos) {
    anim_dir = 'right';
    animateCarousel();
  }
  cur_pos = index;
  resetNavItemsClass('selected');
  addNavItemClass(e.target, 'selected');
};

data.map((item, index) => {
  let elem = document.createElement('li');
  elem.setAttribute('class', 'carousel-nav-item');
  if (index === 0) {
    elem.setAttribute('class', 'selected');
  }
  elem.innerHTML = item.name;
  elem.addEventListener('click', handleNavItemClick);
  carousel_nav_items.appendChild(elem);
});

const animateCarousel = () => {
  let to_pos;
  let from_pos;
  switch (anim_dir) {
    case 'left':
      to_pos = -anim_width;
      from_pos = anim_width;
      break;
    case 'right':
      to_pos = anim_width;
      from_pos = -anim_width;
      break;
    default:
      break;
  }
  carousel_tl
    .set('.info-container', { x: 0 })
    .add('start', '<')
    .to(
      '.info-container',
      { duration: 0.4, x: to_pos, ease: 'power4.in' },
      'start'
    )
    .set('.info-container', { x: from_pos }, 'start+=0.4')
    .add(() => {
      heading.innerHTML = data[cur_pos].heading;
      info.innerHTML = data[cur_pos].info;
      if (!reverse) {
        info_container.classList.add('reverse');
        reverse = true;
      } else {
        info_container.classList.remove('reverse');
        reverse = false;
      }
    }, 'start+=0.4')
    .to(
      '.info-container',
      { duration: 0.4, x: 0, ease: 'power4.out' },
      'start+=0.4'
    );
};

const carousel_tl = gsap.timeline();
const graphic_one_tl = gsap.timeline();
graphic_one_tl
  .add('start', '<')
  .to(
    '#gear_big',
    {
      duration: 4,
      rotate: 360,
      repeat: -1,
      transformOrigin: 'center',
      ease: 'none',
    },
    'start'
  )
  .to(
    '#gear_small',
    {
      duration: 2,
      rotate: 360,
      repeat: -1,
      transformOrigin: 'center',
      ease: 'none',
    },
    'start'
  )
  .to(
    '#arrow',
    {
      duration: 1,
      y: 35,
      yoyo: true,
      repeat: -1,
      transformOrigin: 'center',
      ease: 'power1.inOut',
    },
    'start'
  )
  .to(
    '.elipse-anim',
    {
      duration: 3,
      rotate: 360,
      repeat: -1,
      transformOrigin: 'center',
      ease: 'none',
    },
    'start'
  );

const getRightPos = (elem) => {
  return Math.round(
    3000 - elem.getBoundingClientRect().left - elem.offsetWidth / 2 - 20
  );
};

const handleResize = (e) => {
  anim_width = window.innerWidth;
  plan_copy.style.marginLeft = info_items.offsetLeft + 'px';
  info_container.classList.remove('reverse');
  reverse = false;
  cur_pos = 0;
  heading.innerHTML = data[cur_pos].heading;
  info.innerHTML = data[cur_pos].info;
  gsap.set('.info-container', { x: 0 });
  gsap.set('.wave-btm', {
    x: -getRightPos([...carousel_nav_items.children][5]),
  });
  gsap.set('.wave-mid', {
    x: -getRightPos([...carousel_nav_items.children][4]),
  });
  gsap.set('.wave-top', {
    x: -getRightPos([...carousel_nav_items.children][3]),
  });
};

handleResize();
plan_copy.style.marginLeft = info_items.offsetLeft + 'px';

window.addEventListener('resize', handleResize);

window.onblur = function () {
  // do some stuff after tab was changed e.g.
  graphic_one_tl.pause();
};

window.onfocus = function () {
  graphic_one_tl.resume();
};
