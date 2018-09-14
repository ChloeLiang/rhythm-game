var notes = [
  [5, 6],
  [],
  [],
  [],
  [],
  [],
  []
];

var counter = [0, 0, 0, 0, 0, 0, 0];
var start;

var judge = function (key) {
  var timeInSecond = (Date.now() - start) / 1000;
  var accuracy = timeInSecond - notes[key][counter[key]];

  if (Math.abs(accuracy) <= 0.1) {
    console.log('Perfect');

  } else if (Math.abs(accuracy) <= 0.2) {
    console.log('Good');
  } else if (Math.abs(accuracy) <= 0.3) {
    console.log('Bad');
  } else {
    console.log('Miss');
  }

  counter[key]++;
};

window.onload = function () {
  start = Date.now();

  document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 83) {
      console.log('S pressed');
      // TODO: Pass in next note.
      judge(0);
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
