$(document).ready(function () {
  // create a toggle variable so we can track the state of the form
  let toggle = false;
  $('#downArrow').on('click', function () {
    // after each click, the toggle state changes
    toggle = !toggle;
    // if toggle is true, bring newtweet into view
    if (toggle) {
      document.getElementById('newTweetSec').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // if toggle is fales, scroll down the page
    } else {
      document.getElementById('footer').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
});
