/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  /* ----------------ajax post request to server-------------------------- */
  const postTweet = function (data) {
    const url = '/tweets';
    $.ajax({
      url,
      method: 'POST',
      data,
    })
      .done((result) => {
        // after successful post to the server, load the updated tweets
        loadTweets();
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        console.log('completed');
      });
  };

  /* --------------------------ajax get requet to server------------------- */

  const loadTweets = function () {
    const url = '/tweets';
    $.ajax({
      url,
      method: 'GET',
    })
      .done((result) => {
        // fetch data from our server and render them into DOM elements
        renderTweets(result);
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        console.log('completed');
      });
  };

  /* ---------------------Render array of tweets into DOM---------------- */
  const renderTweets = function (tweets) {
    // loops through tweets
    return tweets.map((userObj) => {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      return $('main').append(createTweetElement(userObj));
    });
  };

  /* ---------------------Create tweet---------------------------------- */
  const createTweetElement = function (userObj) {
    // get the timestamp of today
    const currTime = +new Date();
    // calculate the date difference between today and the date when the tweet was created.
    const dateDiff = Math.round(
      (currTime - userObj.created_at) / (1000 * 60 * 60 * 24)
    );
    const tweet = `
  <article class="tweet-box" id=${userObj.user.name}>
          <header class="tweet-header">
            <div class="header-right">
              <img src=${userObj.user.avatars} alt="" />
              <p class="name">${userObj.user.name}</p>
            </div>
            <div class="header-left">
              <p class="hide">${userObj.user.handle}</p>
            </div>
          </header>
          <div class="tweet-content">
            <p>${userObj.content.text}</p>
          </div>
          <footer>
            <div class="date"><p>${dateDiff} days ago</p></div>
            <div class="labels">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
  `;
    return tweet;
  };

  // get tweets from our server when we are loading the page
  loadTweets();

  // when we submit new tweet, there are few events happening
  $('#new-tweet-frm').on('submit', function (event) {
    // prevent the default form submission
    event.preventDefault();
    // read the data from the input text content
    const inputBox = $(this).children('#tweet-text');
    const content = inputBox.val();
    const data = inputBox.serialize();
    console.log(data);
    // data validation: if tweet is empty or too long, show the error message, otherwise, update our database and render new tweets
    if (content && inputBox.val().length <= 140) {
      // clear the previous effects and tweets section
      $('article').remove();
      postTweet(data);
      inputBox.val('');
      $('.counter').text(`140`).css({ color: '#020d0c' });
      $('.error2').css({ display: 'none' });
      $('.error1').css({ display: 'none' });
    } else if (!content) {
      $('.error2').css({ display: 'block' });
    } else if (inputBox.val().length > 140) {
      $('.error1').css({ display: 'block' });
    }
  });
});
