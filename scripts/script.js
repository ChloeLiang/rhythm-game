var keyPressed = {
  s: false,
  d: false,
  f: false,
  space: false,
  j: false,
  k: false,
  l: false
};

var tracks = {};
var isPlaying = false;
var combo = 0;
var startTime;
var keypress;
var trackContainer;
var scoreContainer;
var comboText;
var accuracyText;

var initializeNotes = function () {
  var note;
  var key;
  var i;

  for (key in music) {
    for (i = 0; i < music[key].notes.length; i++) {
      note = document.createElement('div');
      note.classList.add('note');
      note.classList.add(key);
      note.style.backgroundColor = music[key].color;
      note.style.animationName = 'moveDown';
      note.style.animationTimingFunction = 'linear';
      note.style.animationDuration = music[key].notes[i].duration + 's';
      note.style.animationDelay = music[key].notes[i].delay + 's';
      note.style.animationPlayState = 'paused';
      tracks[key].appendChild(note);
    }
  }
};

var judge = function (key) {
  var timeInSecond = (Date.now() - startTime) / 1000;
  var nextNoteIndex = music[key].next;
  var nextNote = music[key].notes[nextNoteIndex];
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

  tracks[key].removeChild(tracks[key].firstChild);
  music[key].next++;
  accuracyText.classList
};

var displayAccuracy = function (accuracy) {
  var color = accuracyText.classList.item(1);
  accuracyText.innerHTML = accuracy;
  accuracyText.classList.remove(color);
  accuracyText.classList.add('score__text--' + accuracy);
};

window.onload = function () {
  tracks.s = document.querySelector('.track--s');
  tracks.d = document.querySelector('.track--d');
  tracks.f = document.querySelector('.track--f');
  tracks.space = document.querySelector('.track--space');
  tracks.j = document.querySelector('.track--j');
  tracks.k = document.querySelector('.track--k');
  tracks.l = document.querySelector('.track--l');

  trackContainer = document.querySelector('.track-container');
  scoreContainer = document.querySelector('.score');
  keypress = document.querySelectorAll('.keypress');
  comboText = document.querySelector('.score__combo');
  accuracyText = document.querySelector('.score__text');

  initializeNotes();

  trackContainer.addEventListener('animationend', function (event) {
    event.target.parentNode.removeChild(event.target);
    key = event.target.classList.item(1);
    music[key].next++;
    displayAccuracy('miss');
    combo = 0;
    comboText.innerHTML = '';
  });

  document.addEventListener('click', function () {
    console.log('starting...');
    isPlaying = true;
    startTime = Date.now();

    document.querySelector('.music').play();
    document.querySelectorAll('.note').forEach(function (note) {
      note.style.animationPlayState = 'running';
    });

  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 's' && !keyPressed.s) {
      keyPressed.s = true;
      keypress[0].style.display = 'block';

      if (isPlaying && tracks.s.firstChild) {
        judge('s');
      }
    }

    if (event.key === 'd' && !keyPressed.d) {
      keyPressed.d = true;
      keypress[1].style.display = 'block';

      if (isPlaying && tracks.d.firstChild) {
        judge('d');
      }
    }

    if (event.key === 'f' && !keyPressed.f) {
      keyPressed.f = true;
      keypress[2].style.display = 'block';

      if (isPlaying && tracks.f.firstChild) {
        judge('f');
      }
    }

    if (event.key === ' ' && !keyPressed.space) {
      keyPressed.space = true;
      keypress[3].style.display = 'block';

      if (isPlaying && tracks.space.firstChild) {
        judge('space');
      }
    }

    if (event.key === 'j' && !keyPressed.j) {
      keyPressed.j = true;
      keypress[4].style.display = 'block';

      if (isPlaying && tracks.j.firstChild) {
        judge('j');
      }
    }

    if (event.key === 'k' && !keyPressed.k) {
      keyPressed.k = true;
      keypress[5].style.display = 'block';

      if (isPlaying && tracks.k.firstChild) {
        judge('k');
      }
    }

    if (event.key === 'l' && !keyPressed.l) {
      keyPressed.l = true;
      keypress[6].style.display = 'block';

      if (isPlaying && tracks.l.firstChild) {
        judge('l');
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

}
