/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const createTweetElement = function({ user, content, created_at }) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <p><img src="${user.avatars} alt="user avatar""></img>${user.name}</p>
          <p class='handle'>${user.handle}</p>
        </header>
        <section>
          ${content.text}
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

  //renders data array to tweets container
  const renderTweets = function(tweets) {
    let $tweets = $("#tweets-container");
    $tweets.empty();
    for (const tweet of tweets) {
      $tweets.append(createTweetElement(tweet));
    }
    return $tweets;
  };

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" }).then(function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

  $(".new-tweet > form").submit(function(event) {

    event.preventDefault();

      let tweetLength = $(this).children('#tweet-text').val().length
      
      if (tweetLength && tweetLength <= 140) {
        $.post("/tweets", $(this).serialize(), response => {
          console.log(response, "uwu");
          loadTweets()
        });
      } else if (tweetLength > 140){
        alert('Tweet is too long')
      } else {
        alert('Your tweet has no content :(')
      }
  });
});
