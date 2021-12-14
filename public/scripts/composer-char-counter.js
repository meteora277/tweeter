$(document).ready(function () {
  //updates character count

  $("#tweet-text").on("input", function() {
    let charCount = this.value.length;

    let counter = $(this).parents().find(".counter");

    counter.val(140 - charCount);

    if (charCount > 140) {
      counter.toggleClass("red-text", true);
    } else {
      counter.toggleClass("red-text", false);
    }
  });
});
