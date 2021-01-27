function enter(id) {
  $(`#${id}`).find('.hide').css({ display: 'inline-block', color: 'grey' });
}
function out(id) {
  $(`#${id}`).find('.hide').css({ display: 'none' });
}
$(document).ready(function () {
  // when mouse over the tweet, trigger the display of hiddent context
  $(`article`).mouseenter(function () {
    let id = $(this).attr('id');
    enter(id);
  });
  $(`article`).mouseleave(function () {
    let id = $(this).attr('id');
    out(id);
  });
});
