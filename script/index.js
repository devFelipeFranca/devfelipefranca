window.onload = () => {
  const scrollToIdOnClick = (event) => {
    event.preventDefault();
    const tag = event.target;
    const id = tag.getAttribute("href");
    const section = document.querySelector(id).offsetTop;

    window.scroll({
      top: section -100,
      behavior: "smooth",
    });
  };
  const animationScroll = document.querySelectorAll('a[href^="#"]');
  animationScroll.forEach((link) => {
    link.addEventListener("click", scrollToIdOnClick);
  });

  let menu = document.getElementById("menu"),
    nav = document.getElementById("nav"),
    menuBg = document.getElementById("menu-bg");
  menu.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    console.log('Clicado');
    // nav.classList.toggle("is-active");
    // menuBg.classList.toggle("change-bg");
  });

  // let tag = document.querySelectorAll("#nav li a");
  // for (var element in tag) {
  //   tag[element].addEventListener("click", () => {
  //     menu.classList.toggle("change");
  //     nav.classList.toggle("change");
  //     menuBg.classList.toggle("change-bg");
  //   });
  // }
  document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });
};
