var to = 1000, timeout, counter = 0, lastKey, keyPressTimeout, keyPressTO = 1000;

$("#phone button").bind("mousedown", function() {
  var $this = $(this),
      $result = $('#result'),
      val = $result.val(),
      button_pressed = $this.attr("data-value");

  keyPressTimeout = setTimeout(function() {
    // if the click is long add the value of the button to the textxbox
    val += button_pressed;
    $result.val(val);
    keyPressTimeout = null;
  }, keyPressTO);
  
}).bind("mouseup", function(event) {
  clearTimeout(keyPressTimeout);
  
  if (!keyPressTimeout) {
    return false;
  }
  var $this = $(this),
      $result = $('#result'),
      val = $result.val(),
      button_pressed = $this.attr("data-value");

  // if the user clicks on a new key reset all
  if (lastKey !== button_pressed) {
    reset();  
  }

  // if the user click fast on the same key, remove the last charchter to replace it with the new
  if (counter !== 0 && lastKey === button_pressed) {
    val = val.substring(0, val.length - 1);
  }

  val += t9(button_pressed);
  $result.val(val);

  // restart the timeout
  clearTimeout(timeout);
  counter++;

  // save the last key pressed so we can compare it in the next click
  lastKey = button_pressed;

  // if the user not clicked on anything within the timeout delay (to variable) reset all.
  timeout = setTimeout(reset, to);
});

function t9(button_pressed) {
  return keys[button_pressed][counter % keys[button_pressed].length];
}

function reset() {
  counter = 0;
  lastKey = null;
}

var keys = {
  '1': ['.', ',', '!'],
  '2': ['a', 'b', 'c']
};