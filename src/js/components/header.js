const logo = document.querySelector('.logo');
const menu_items = document.querySelectorAll('.menu-item');
const menu_btn_open = document.querySelector('.fa-bars');
const menu_btn_close = document.querySelector('.fa-xmark');
const nav = document.querySelector('.nav');

const resetMenuItemsClass = (class_name) => {
  menu_items.forEach((item) => item.classList.remove(class_name));
};

const addMenuItemClass = (menu_item, class_name) => {
  menu_item.classList.add(class_name);
};

const handleMenuItemClick = (e) => {
  resetMenuItemsClass('selected');
  addMenuItemClass(e.target, 'selected');
};

const handleLogoclick = (e) => {
  resetMenuItemsClass('selected');
};

const handleMenuBtnOpenclick = (e) => {
  nav.style.display = 'flex';
  e.target.style.display = 'none';
  menu_btn_close.style.display = 'block';
};

const handleMenuBtnCloseclick = (e) => {
  nav.style.display = 'none';
  e.target.style.display = 'none';
  menu_btn_open.style.display = 'block';
};

const handleResize = (e) => {
  if (window.innerWidth >= 768) {
    nav.style.display = 'flex';
    menu_btn_open.style.display = 'block';
    menu_btn_close.style.display = 'none';
  } else {
    nav.style.display = 'none';
    menu_btn_open.style.display = 'block';
    menu_btn_close.style.display = 'none';
  }
};

menu_items.forEach((item) =>
  item.addEventListener('click', handleMenuItemClick)
);

logo.addEventListener('click', handleLogoclick);

menu_btn_open.addEventListener('click', handleMenuBtnOpenclick);

menu_btn_close.addEventListener('click', handleMenuBtnCloseclick);

window.addEventListener('resize', handleResize);
