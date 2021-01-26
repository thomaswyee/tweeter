function enter() {
  $('.hide').css({ display: 'inline-block', color: 'grey' });
}
function out() {
  $('.hide').css({ display: 'none' });
}

$(document).ready(function () {
  // when mouse over the tweet, trigger the display of hiddent context
  $('article').hover(enter, out);
});
