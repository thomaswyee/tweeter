$(document).ready(function () {
  let toggle = false;
  $('#downArrow').on('click', function () {
    toggle = !toggle;
    if (toggle) {
      document.getElementById('newTweetSec').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      document.getElementById('footer').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
});
