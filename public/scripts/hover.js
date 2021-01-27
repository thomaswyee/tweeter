function enter(id) {
  // when mouse enter, find hidden handle, and display
  $(`#${id}`).find('.hide').css({ display: 'inline-block', color: 'grey' });
  // unblur the whole tweet
  $(`#${id}`).css({
    filter: 'none',
    boxShadow: '12px 12px 2px 1px rgba(33, 33, 33, 0.2)',
  });
}
function out(id) {
  // when mouse leave, go back to original state
  $(`#${id}`).find('.hide').css({ display: 'none' });
  $(`#${id}`).css({ filter: 'blur(1px)', boxShadow: 'none' });
}
$(document).ready(function () {
  // event binding will not work for dynamically generated elements. so we use event delegation instead.
  $(document).on('mouseenter', '.tweet-box', function () {
    let id = $(this).attr('id');
    enter(id);
  });
  $(document).on('mouseleave', '.tweet-box', function () {
    let id = $(this).attr('id');
    out(id);
  });
});
