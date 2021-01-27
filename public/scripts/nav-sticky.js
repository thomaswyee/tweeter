$(document).ready(function () {
  //
  $(window).scroll(function () {
    //if you hard code, then use console
    //.log to determine when you want the
    //nav bar to stick.
    if ($(window).scrollTop() > 10) {
      $('#nav_bar').addClass('sticky');
    }
    if ($(window).scrollTop() < 10) {
      $('#nav_bar').removeClass('sticky');
    }
  });
});
