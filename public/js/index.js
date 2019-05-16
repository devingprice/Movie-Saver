$(document).ready(function() {
  $(".sidenav").sidenav();

  $(".modal").modal();

  // eslint-disable-next-line no-unused-vars
  var swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    initialSlide: 2,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: ".swiper-pagination"
    }
  });
});
