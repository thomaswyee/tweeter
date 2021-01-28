$(document).ready(function () {
  // we are checking each key press inside the textarea
  $('#tweet-text').on('input change keyup', function () {
    let output = $(this).val();
    // if this is no output yet, show 140
    output.length === 0
      ? $('.counter').text(`140`)
      : //if the output length is smaller than 140, show output length
      output.length <= 140
      ? $('.counter').text(`${140 - output.length}`)
      : //if the output length is larger than 140, show 140-length in red
        $('.counter')
          .text(`${140 - output.length}`)
          .css({ color: 'red' });
  });
});
