window.onload = () => {
  const scrollToIdOnClick = (event) => {
    event.preventDefault();
    const tag = event.target;
    const id = tag.getAttribute("href");
    const section = document.querySelector(id).offsetTop;

    window.scroll({
      top: section,
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
    menu.classList.toggle("change");
    nav.classList.toggle("change");
    menuBg.classList.toggle("change-bg");
  });

  let tag = document.querySelectorAll("#nav li a");
  for (var element in tag) {
    tag[element].addEventListener("click", () => {
      menu.classList.toggle("change");
      nav.classList.toggle("change");
      menuBg.classList.toggle("change-bg");
    });
  }
  

};
