window.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx;
  var keyHeight = canvas.height / 7;
  var keyWidth = canvas.width / 8;

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
