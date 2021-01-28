/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // post data from the form to the server
  const postTweet = function (data) {
    const url = '/tweets';
    $.ajax({
      url,
      method: 'POST',
      data,
    })
      .done((result) => {
        loadTweets();
      })
      .fail(() => {
        console.log('error');
      })
      .always(() => {
        console.log('completed');
      });
  };

  // fetch data from our server and render them into DOM elements
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
    const currTime = +new Date();
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
