var keyPressed = {
  s: false,
  d: false,
  f: false,
  space: false,
  j: false,
  k: false,
  l: false
};

var hits = { perfect: 0, good: 0, bad: 0, miss: 0 };
var multiplier = {
  perfect: 1,
  good: 0.8,
  bad: 0.5,
  combo40: 1.05,
  combo80: 1.10
};
var isPlaying = false;
var speed = 0;
var combo = 0;
var maxCombo = 0;
var score = 0;
var startTime;
var trackContainer;
var tracks;
var keypress;
var comboText;

var initializeNotes = function () {
  var noteElement;
  var trackElement;

  while (trackContainer.hasChildNodes()) {
    trackContainer.removeChild(trackContainer.lastChild);
  }

  song.sheet.forEach(function (key, index) {
    trackElement = document.createElement('div');
    trackElement.classList.add('track');

    key.notes.forEach(function (note) {
      noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.classList.add('note--' + index);
      noteElement.style.backgroundColor = key.color;
      noteElement.style.animationName = 'moveDown';
      noteElement.style.animationTimingFunction = 'linear';
      noteElement.style.animationDuration = note.duration - speed + 's';
      noteElement.style.animationDelay = note.delay + speed + 's';
      noteElement.style.animationPlayState = 'paused';
      trackElement.appendChild(noteElement);
    });

    trackContainer.appendChild(trackElement);
    tracks = document.querySelectorAll('.track');
  });
};

var setupSpeed = function () {
  var buttons = document.querySelectorAll('.btn--small');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (this.innerHTML === '1x') {
        buttons[0].className = 'btn btn--small btn--selected';
        buttons[1].className = 'btn btn--small';
        buttons[2].className = 'btn btn--small';
        speed = parseInt(this.innerHTML) - 1;
      } else if (this.innerHTML === '2x') {
        buttons[0].className = 'btn btn--small';
        buttons[1].className = 'btn btn--small btn--selected';
        buttons[2].className = 'btn btn--small';
        speed = parseInt(this.innerHTML) - 1;
      } else if (this.innerHTML === '3x') {
        buttons[0].className = 'btn btn--small';
        buttons[1].className = 'btn btn--small';
        buttons[2].className = 'btn btn--small btn--selected';
        speed = parseInt(this.innerHTML) - 1;
      }

      initializeNotes();
    });
  });
};

var setupStartButton = function () {
  document.querySelector('.btn--start').addEventListener('click', function () {
    isPlaying = true;
    startTime = Date.now();

    startTimer(song.duration);
    document.querySelector('.menu').style.opacity = 0;
    document.querySelector('.song').play();
    document.querySelectorAll('.note').forEach(function (note) {
      note.style.animationPlayState = 'running';
    });
  });
};

var startTimer = function (duration) {
  var display = document.querySelector('.summary__timer');
  var timer = duration;
  var minutes;
  var seconds;

  display.style.display = 'block';
  display.style.opacity = 1;

  var songDurationInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    display.innerHTML = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(songDurationInterval);
      showResult();
    }
  }, 1000);
};

var showResult = function () {
  document.querySelector('.perfect__count').innerHTML = hits.perfect;
  document.querySelector('.good__count').innerHTML = hits.good;
  document.querySelector('.bad__count').innerHTML = hits.bad;
  document.querySelector('.miss__count').innerHTML = hits.miss;
  document.querySelector('.combo__count').innerHTML = maxCombo;
  document.querySelector('.score__count').innerHTML = score;
  document.querySelector('.summary__timer').style.opacity = 0;
  document.querySelector('.summary__result').style.opacity = 1;
};

var setupNoteMiss = function () {
  trackContainer.addEventListener('animationend', function (event) {
    var index;
    event.target.parentNode.removeChild(event.target);
    index = event.target.classList.item(1)[6];
    song.sheet[index].next++;
    displayAccuracy('miss');
    hits.miss++;
    maxCombo = maxCombo > combo ? maxCombo : combo;
    combo = 0;
    comboText.innerHTML = '';
  });
};

/**
 * Allows keys to be only pressed one time.
 * Prevents keydown event from being handled multiple times while held down.
 */
var setupKeys = function () {
  document.addEventListener('keydown', function (event) {
    if (event.key === 's' && !keyPressed.s) {
      keyPressed.s = true;
      keypress[0].style.display = 'block';

      if (isPlaying && tracks[0].firstChild) {
        judge(0);
      }
    }

    if (event.key === 'd' && !keyPressed.d) {
      keyPressed.d = true;
      keypress[1].style.display = 'block';

      if (isPlaying && tracks[1].firstChild) {
        judge(1);
      }
    }

    if (event.key === 'f' && !keyPressed.f) {
      keyPressed.f = true;
      keypress[2].style.display = 'block';

      if (isPlaying && tracks[2].firstChild) {
        judge(2);
      }
    }

    if (event.key === ' ' && !keyPressed.space) {
      keyPressed.space = true;
      keypress[3].style.display = 'block';

      if (isPlaying && tracks[3].firstChild) {
        judge(3);
      }
    }

    if (event.key === 'j' && !keyPressed.j) {
      keyPressed.j = true;
      keypress[4].style.display = 'block';

      if (isPlaying && tracks[4].firstChild) {
        judge(4);
      }
    }

    if (event.key === 'k' && !keyPressed.k) {
      keyPressed.k = true;
      keypress[5].style.display = 'block';

      if (isPlaying && tracks[5].firstChild) {
        judge(5);
      }
    }

    if (event.key === 'l' && !keyPressed.l) {
      keyPressed.l = true;
      keypress[6].style.display = 'block';

      if (isPlaying && tracks[6].firstChild) {
        judge(6);
      }
    }
  });

  document.addEventListener('keyup', function (event) {
    if (event.key === 's') {
      keyPressed.s = false;
      keypress[0].style.display = 'none';
    }

    if (event.key === 'd') {
      keyPressed.d = false;
      keypress[1].style.display = 'none';
    }

    if (event.key === 'f') {
      keyPressed.f = false;
      keypress[2].style.display = 'none';
    }

    if (event.key === ' ') {
      keyPressed.space = false;
      keypress[3].style.display = 'none';
    }

    if (event.key === 'j') {
      keyPressed.j = false;
      keypress[4].style.display = 'none';
    }

    if (event.key === 'k') {
      keyPressed.k = false;
      keypress[5].style.display = 'none';
    }

    if (event.key === 'l') {
      keyPressed.l = false;
      keypress[6].style.display = 'none';
    }
  });
};

var judge = function (index) {
  var timeInSecond = (Date.now() - startTime) / 1000;
  var nextNoteIndex = song.sheet[index].next;
  var nextNote = song.sheet[index].notes[nextNoteIndex];
  var perfectTime = nextNote.duration + nextNote.delay;
  var accuracy = Math.abs(timeInSecond - perfectTime);

  /**
   * As long as the note has travelled less than 3/4 of the height of the track,
   * any key press on this track will be ignored.
   */

  if (Math.abs(accuracy) > (nextNote.duration - speed) / 4) {
    return;
  }

  if (Math.abs(accuracy) < 0.1) {
    displayAccuracy('perfect');
    hits.perfect++;
    comboText.innerHTML = ++combo;

    if (combo >= 80) {
      score += 1000 * multiplier.perfect * multiplier.combo80;
    } else if (combo >= 40) {
      score += 1000 * multiplier.perfect * multiplier.combo40;
    } else {
      score += 1000 * multiplier.perfect;
    }
  } else if (Math.abs(accuracy) < 0.2) {
    displayAccuracy('good');
    hits.good++;
    comboText.innerHTML = ++combo;

    if (combo >= 80) {
      score += 1000 * multiplier.good * multiplier.combo80;
    } else if (combo >= 40) {
      score += 1000 * multiplier.good * multiplier.combo40;
    } else {
      score += 1000 * multiplier.good;
    }
  } else if (Math.abs(accuracy) < 0.3) {
    displayAccuracy('bad');
    hits.bad++;
    combo = 0;
    comboText.innerHTML = '';

    if (combo >= 80) {
      score += 1000 * multiplier.bad * multiplier.combo40;
    } else if (combo >= 40) {
      score += 1000 * multiplier.bad * multiplier.combo80;
    } else {
      score += 1000 * multiplier.bad;
    }
  } else {
    displayAccuracy('miss');
    hits.miss++;
    combo = 0;
    comboText.innerHTML = '';
  }

  maxCombo = maxCombo > combo ? maxCombo : combo;
  tracks[index].removeChild(tracks[index].firstChild);
  song.sheet[index].next++;
};

var displayAccuracy = function (accuracy) {
  document.querySelector('.hit__accuracy').remove();
  var accuracyText = document.createElement('div');
  accuracyText.classList.add('hit__accuracy');
  accuracyText.classList.add('hit__accuracy--' + accuracy);
  accuracyText.innerHTML = accuracy;
  document.querySelector('.hit').appendChild(accuracyText);
};

window.onload = function () {
  trackContainer = document.querySelector('.track-container');
  keypress = document.querySelectorAll('.keypress');
  comboText = document.querySelector('.hit__combo');

  initializeNotes();
  setupSpeed();
  setupStartButton();
  setupKeys();
  setupNoteMiss();
}
