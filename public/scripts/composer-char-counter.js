$(document).ready(function() {
    const textAreaSelector = $("main .new-tweet textarea");
    const counterSelector = $("main .new-tweet form .counter");
    
    textAreaSelector.on('input', function() {
        const counterVal = 140 - textAreaSelector.val().length;
        if (counterVal < 0) {
            counterSelector.text(counterVal).addClass('red-text');
        } else {
            counterSelector.text(counterVal).removeClass('red-text');
        }
      });
  });