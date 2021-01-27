/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const send = function (data) {
    const url = '/tweets';
    $.ajax({
      url,
      method: 'POST',
      data,
    })
      .done((result) => {
        console.log(result);
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        console.log('completed');
      });
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    return tweets.map((userObj) => {
      return $('main').append(createTweetElement(userObj));
    });
  };
  const createTweetElement = function (userObj) {
    // take a user object, and create a tweet element
    const date = new Date(userObj.created_at).toLocaleDateString('en-US');
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
            <div class="date"><p>${date}</p></div>
            <div class="labels">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
  `;

    return tweet;
  };

  const loadTweets = function () {
    const url = '/tweets';
    $.ajax({
      url,
      method: 'GET',
    })
      .done((result) => {
        renderTweets(result);
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        console.log('completed');
      });
  };
  loadTweets();

  $('#new-tweet-frm').on('submit', function (event) {
    // prevent the default form submission
    event.preventDefault();
    // read the data from the input text content
    const inputBox = $(this).children('#tweet-text');
    const data = inputBox.serialize();
    console.log(data);
    // empty the old tweets section
    $('.tweets').empty();
    send(data);
    inputBox.val('');
  });
});
