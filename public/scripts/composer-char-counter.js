$(document).ready(function() {

  function updateLetterCount(count) {

    $('.counter').val(() => `${count}/140`) ;

  }

  $('#tweet-text').on('keyup', (event) => {
    
    let characterCount = event.target.value.length
    updateLetterCount(characterCount);

  })

});