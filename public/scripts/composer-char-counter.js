$(document).ready(function() {
    const textAreaSelector = $("main .new-tweet textarea");
    const counterSelector = $("main .new-tweet form .counter");
    textAreaSelector.on('input', function() {
         const counterVal = 140 - textAreaSelector.val().length;
        if (counterVal < 0) {
            counterSelector.text(counterVal).css('color','red');
        } else {
            counterSelector.text(counterVal).css('color','black');
        }
      });
  });