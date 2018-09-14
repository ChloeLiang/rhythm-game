window.onload = function () {
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

}
