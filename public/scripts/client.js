/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const createTweetElement = function({ user, content, created_at }) {
    
    const escape = function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

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

  //renders data array to tweets container
  const renderTweets = function(tweets) {
    let $tweets = $("#tweets-container");
    $tweets.empty();
    for (const tweet of tweets) {
      $tweets.prepend(createTweetElement(tweet));
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
    let form = $(this).children('#tweet-text')
    let tweetLength = form.val().length
    let errorMessage = $(this).parents().find('.error')
    console.log(errorMessage)
    if (tweetLength && tweetLength <= 140) {
      $.post("/tweets", $(this).serialize(), function() {
        form.val('');
        loadTweets()
      });
    } else if (tweetLength > 140){
      errorMessage.slideToggle("hide-error", false)
    } else {
      errorMessage.slideToggle("hide-error", false)
    }
  });
});
