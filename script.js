var music = {
  // S key notes
  s: {
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
  d: {}
  // ...
};

var start;

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

  if (Math.abs(accuracy) <= 0.1) {
    console.log('Perfect');
  } else if (Math.abs(accuracy) <= 0.2) {
    console.log('Good');
  } else if (Math.abs(accuracy) <= 0.3) {
    console.log('Bad');
  } else {
    console.log('Miss');
  }

  music[key].next++;
};

window.onload = function () {
  start = Date.now();

  document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 83) {
      console.log('S pressed');
      // TODO: Pass in next note.
      judge('s');
    } else if (event.keyCode === 68) {
      console.log('D pressed');
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
