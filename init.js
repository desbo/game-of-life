var turns = 0,
    game = require('./game.js'),
    world = game.createWorld(200, 50).seed(10);


setInterval(function () {
  if (turns % 10 === 0) {
    document.getElementById('counter').innerHTML = String(turns);
  }

  document.getElementById('world').innerHTML = 
    '<pre>' + world.toString() + '</pre>';
  world = world.turn();
  turns++;
}, 35);