$(document).ready(function () {
  
  function updateCharacterCount() {
    
    let charCount = $(this).val().length;
    
    let counter = $(this).parents().find(".counter");

    counter.val(140 - charCount);

    if (charCount > 140) {
      counter.toggleClass("red-text", true);
    } else {
      counter.toggleClass("red-text", false);
    }
  }

  $("#tweet-text").on("input change", updateCharacterCount);
  $(".new-tweet form").on('submit', updateCharacterCount)
});
