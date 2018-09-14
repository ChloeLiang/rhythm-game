window.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx;
  var keyHeight = canvas.height / 7;
  var keyWidth = canvas.width / 8;

  document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 65) {
      console.log('A pressed');
    } else if (event.keyCode === 83) {
      console.log('S pressed');
    } else if (event.keyCode === 68) {
      console.log('D pressed');
    } else if (event.keyCode === 70) {
      console.log('F pressed');
    } else if (event.keyCode === 74) {
      console.log('J pressed');
    } else if (event.keyCode === 75) {
      console.log('K pressed');
    } else if (event.keyCode === 76) {
      console.log('L pressed');
    } else if (event.keyCode === 186) {
      console.log('; pressed');
    }
  };

  var start = function () {
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      drawKeyPads(ctx);

      console.log(canvas.width, canvas.height);
    } else {
      alert('Canvas is not supported!');
    }
  };

  var drawKeyPads = function (ctx) {
    var i;
    for (i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'blue';
      }
      ctx.fillRect(keyWidth * i, canvas.height - keyHeight, keyWidth, keyHeight);
    }
  };

  start();
}
