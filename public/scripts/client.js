/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const createTweetElement = function ({ user, content, created_at }) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`
      <article class="tweet">
        <header>
          <p><img src="${user.avatars} alt="user avatar""></img>${user.name}</p>
          <p class='handle'>${user.handle}</p>
        </header>
        <section>
          <p>${escape(content.text)}</p>
        </section>
        <footer>
          ${timeago.format(created_at)}
          <div>
            <a href="#">
              <i class="fas fa-flag"></i>
            </a>
            <a href="#">
              <i class="fas fa-retweet"></i>
            </a>
            <a href="#">
              <i class="fas fa-heart"></i>
            </a>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };
  //initially hide newTweet on pageload so we can animate it in later
  $(".new-tweet").hide();

  $(".nav-tweet").on("click", () => {
    $(".new-tweet").slideToggle();
    $('#tweet-text').focus()
  });

  //renders data array to tweets container
  const renderTweets = function (tweets) {
    let $tweets = $("#tweets-container");
    //empty so tweets do not repeat stack on bottom
    $tweets.empty();
    for (const tweet of tweets) {
      $tweets.prepend(createTweetElement(tweet));
    }
    return $tweets;
  };

  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $(".new-tweet > form").submit(function (event) {
    event.preventDefault();

    let newTweet = $(this).children("#tweet-text");
    let tweetLength = newTweet.val().length;
    let errorMessage = $(this).children(".error");

    if (tweetLength && tweetLength <= 140) {
      $.post("/tweets", $(this).serialize(), function () {
        newTweet.val("");
        loadTweets();
        errorMessage.fadeOut();
      });
    } else if (tweetLength > 140) {
      errorMessage.fadeIn();
      errorMessage.text("You have too many thoughts to contain in one tweet");
    } else {
      errorMessage.fadeIn();
      errorMessage.text("There's nothing here");
    }
    // refocus on form so tweet button animation resets to unhover
    newTweet.focus();
  });
});
