var music = {
  // S key notes
  s: {
    color: 'yellow',
    next: 0,
    notes: [
      {
        duration: 3,
        delay: 2
      },
      {
        duration: 3,
        delay: 3
      }
    ]
  },

  // D key notes
  d: {
    color: 'red',
    next: 0,
    notes: [
      {
        duration: 3,
        delay: 4
      },
      {
        duration: 3,
        delay: 5
      }
    ]
  },

  // ...
};

var start;
var tracks = {};

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
  var timeInSecond = (Date.now() - start) / 1000;
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
    console.log('Perfect');
  } else if (Math.abs(accuracy) < 0.2) {
    console.log('Good');
  } else if (Math.abs(accuracy) < 0.3) {
    console.log('Bad');
  } else {
    console.log('judge(): Miss');
  }

  tracks[key].removeChild(tracks[key].firstChild);
  music[key].next++;
};

window.onload = function () {
  tracks.s = document.querySelector('.track--s');
  tracks.d = document.querySelector('.track--d');
  tracks.f = document.querySelector('.track--f');
  tracks.space = document.querySelector('.track--space');
  tracks.j = document.querySelector('.track--j');
  tracks.k = document.querySelector('.track--k');
  tracks.l = document.querySelector('.track--l');

  initializeNotes();

  document.addEventListener('animationend', function (event) {
    event.target.parentNode.removeChild(event.target);
    key = event.target.classList.item(1);
    music[key].next++;
    console.log(key + ' miss(): Miss');
  });

  document.addEventListener('click', function () {
    console.log('starting...');
    document.querySelectorAll('.note').forEach(function (note) {
      note.style.animationPlayState = 'running';
    });
    start = Date.now();
  });

  start = Date.now();

  document.onkeydown = function (event) {
    event = event || window.event;

    if (event.keyCode === 83) {
      console.log('S pressed');
      if (tracks.s.firstChild) {
        judge('s');
      }
    } else if (event.keyCode === 68) {
      console.log('D pressed');
      if (tracks.d.firstChild) {
        judge('d');
      }
    } else if (event.keyCode === 70) {
      console.log('F pressed');
    } else if (event.keyCode === 32) {
      console.log('Space pressed');
    } else if (event.keyCode === 74) {
      console.log('J pressed');
    } else if (event.keyCode === 75) {
      console.log('K pressed');
    } else if (event.keyCode === 76) {
      console.log('L pressed');
    }
  };

}
