/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const loadTweets = function () {
    $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data)
    })
  };
  loadTweets()

  $(".new-tweet > form").submit(function (event) {
    console.log(event);
    event.preventDefault();

    $.post("/tweets", $(this).serialize(), (response) => {
      console.log(response, "uwu");
    });
  });
});
