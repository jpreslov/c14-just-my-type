let upperKeyboard = $('#keyboard-upper-container');
let lowerKeyboard = $('#keyboard-lower-container');
let sentences = [
  'ten ate neite ate nee enet ite ate inet ent eate',
  'Too ato too nOt enot one totA not anot tOO aNot',
  'oat itain oat tain nate eate tea anne inant nean',
  'itant eate anot eat nato inate eat anot tain eat',
  'hey',
];
let letterIndex = 0;
let sentenceIndex = 0;
let sentenceDisplay = $('#sentence');
let feedBack = $('#feedback');
let targetLetter = $('#target-letter');
let highLighterPosition = 15;
let yellowBlock = $('#yellow-block');
let mistakeCtr = 0;
let ctr = 0;
let startTime;
upperKeyboard.hide();
sentenceDisplay.append(sentences[sentenceIndex]);

function gameStart(e) {
  startTime = e.timeStamp;
}

function gameOver(e) {
  $(document);
  let endTime = e.timeStamp;
  let msTime = endTime - startTime;
  let secTime = msTime / 1000;
  let minutes = secTime / 60;
  let wpm = 54 / minutes - 2 * mistakeCtr;
  let endStuff = $(`<h2>You typed at ${wpm} words per minute. Thanks! haha.</h2>`);

  sentenceDisplay.append(endStuff);
}

$(document).keydown(function (e) {
  if (e.shiftKey) {
    lowerKeyboard.hide();
    upperKeyboard.show();
  } else {
    ctr++;
    console.log(ctr);
  }

  //if correct key is pressed, change targetLetter and increment the letterIndex
  if (ctr === 1) {
    gameStart(e);
  }

  if (e.key === sentences[sentenceIndex][letterIndex]) {
    letterIndex++;
    highLighterPosition = highLighterPosition + 17.5;
    targetLetter.empty();
    targetLetter.append(sentences[sentenceIndex][letterIndex]);
    feedBack.empty();
    feedBack.append('<i class="glyphicon glyphicon-ok"></i>');
    yellowBlock.css('margin-left', `${highLighterPosition}px`);

    // show space as targetLetter if space in sentence
    if (sentences[sentenceIndex][letterIndex] === ' ') {
      targetLetter.empty();
      targetLetter.append('Space');
    }
  } else {
    feedBack.empty();
    feedBack.append('<i class="glyphicon glyphicon-remove"></i>');
    mistakeCtr++;
  }
});

$(document).keypress(function (e) {
  $(`#${e.which}`).css('background-color', 'yellow');
});

$(document).keyup(function (e) {
  //an alternative to the line below is to nest a keyup function in the keypress
  let asciiCode = e.key.charCodeAt(0);

  if (e.which == 16) {
    lowerKeyboard.show();
    upperKeyboard.hide();
  }

  if (sentenceIndex < sentences.length) {
    //end of sentence functionality
    if (letterIndex === sentences[sentenceIndex].length) {
      sentenceIndex++;
      letterIndex = 0;
      highLighterPosition = 15;
      targetLetter.empty();

      sentenceDisplay.empty();
      sentenceDisplay.append(sentences[sentenceIndex]);
    }
  } else if (sentenceIndex >= sentences.length) {
    gameOver(e);
  }

  $(`#${asciiCode}`).css('background-color', '#f5f5f5');
});
