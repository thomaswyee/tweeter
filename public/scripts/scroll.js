$(document).ready(function () {
  //when the window scroll more than 300, show the up-to-top button
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      $('#scroll-up').css({ display: 'block' });
    }
    if ($(window).scrollTop() < 300) {
      $('#scroll-up').css({ display: 'none' });
    }
  });
});
