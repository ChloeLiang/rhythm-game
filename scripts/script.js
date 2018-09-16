var keyPressed = {
  s: false,
  d: false,
  f: false,
  space: false,
  j: false,
  k: false,
  l: false
};

var isPlaying = false;
var combo = 0;
var startTime;
var trackContainer;
var tracks;
var keypress;
var comboText;
var accuracyText;

var initializeNotes = function () {
  var noteElement;
  var trackElement;

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
      noteElement.style.animationDuration = note.duration + 's';
      noteElement.style.animationDelay = note.delay + 's';
      noteElement.style.animationPlayState = 'paused';
      trackElement.appendChild(noteElement);
    });

    trackContainer.appendChild(trackElement);
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
  var accuracy = timeInSecond - perfectTime;

  /**
   * As long as the note has travelled less than 3/4 of the height of the track,
   * any key press on this track will be ignored.
   */
  if (Math.abs(accuracy) > nextNote.duration / 4) {
    return;
  }

  if (Math.abs(accuracy) < 0.1) {
    displayAccuracy('perfect');
    comboText.innerHTML = ++combo;
  } else if (Math.abs(accuracy) < 0.2) {
    displayAccuracy('good');
    comboText.innerHTML = ++combo;
  } else if (Math.abs(accuracy) < 0.3) {
    displayAccuracy('bad');
    combo = 0;
    comboText.innerHTML = '';
  } else {
    displayAccuracy('miss');
    combo = 0;
    comboText.innerHTML = '';
  }

  tracks[index].removeChild(tracks[index].firstChild);
  song.sheet[index].next++;
};

var displayAccuracy = function (accuracy) {
  var color = accuracyText.classList.item(1);
  accuracyText.innerHTML = accuracy;
  accuracyText.classList.remove(color);
  accuracyText.classList.add('score__text--' + accuracy);
};

window.onload = function () {
  trackContainer = document.querySelector('.track-container');
  keypress = document.querySelectorAll('.keypress');
  comboText = document.querySelector('.score__combo');
  accuracyText = document.querySelector('.score__text');

  initializeNotes();

  tracks = document.querySelectorAll('.track');

  trackContainer.addEventListener('animationend', function (event) {
    var index;
    event.target.parentNode.removeChild(event.target);
    index = event.target.classList.item(1)[6];
    song.sheet[index].next++;
    displayAccuracy('miss');
    combo = 0;
    comboText.innerHTML = '';
  });

  setupKeys();

  document.addEventListener('click', function () {
    console.log('starting...');
    isPlaying = true;
    startTime = Date.now();

    document.querySelector('.song').play();
    document.querySelectorAll('.note').forEach(function (note) {
      note.style.animationPlayState = 'running';
    });

  });

}
