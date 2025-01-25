const navbar = document.querySelector("#navbar");
const closer = document.querySelector(".close");
const menu = document.querySelector(".menu");

menu.addEventListener("click", function () {
  navbar.classList.add("active");
});
closer.addEventListener("click", function () {
  navbar.classList.remove("active");
});
