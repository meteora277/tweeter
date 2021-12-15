const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = function ({ user, content, created_at }) {
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
    </article>`);
  return $tweet;
};

const renderTweets = function(tweets) {

  let $tweets = $('#tweets') 

  $tweets.empty();

  for (const tweet of tweets) {
    $tweets.append(createTweetElement(tweet));
  }
  return $tweets
}


console.log(renderTweets(data))