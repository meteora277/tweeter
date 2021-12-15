const tweetData = {
  user: {
    name: "Newton",
    avatars: "https://i.imgur.com/73hZDYK.png",
    handle: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
};

const createTweetElement = function ({ user, content, created_at }) {
  const markUp = `
    <article class="tweet">
      <header>
        <p><img src="${user.avatars} alt="user avatar""></img>${user.name}/p>
        <p class='handle'>@${user.handle}user.</p>
      </header>
      <section>
        ${content}
      </section>
      <footer>
        ${created_at}
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
    </article>`;
  return markUp;
};

const $tweet = createTweetElement(tweetData);

console.log($tweet);

module.exports = {
  createTweetElement
}