var game = require('./game.js');

describe('grid', function () {
  var world;

  beforeEach(function () {
    world = game.createWorld(100, 30);
  });

  it('should activate a cell', function () {
    world.activate(2, 5);
    expect(world.grid[2][5]).toBeTruthy();
  });

  it('should kill cells that don\'t have live neighbours', function () {
    world.activate(2, 5);
    var newWorld = world.turn();
    expect(newWorld.grid[2][5]).toBeFalsy();
  });

  it ('should keep cells alive with two live neighbours', function () {
    world.activate(1, 5);
    world.activate(2, 5);
    world.activate(3, 5);

    var newWorld = world.turn();
    expect(newWorld.grid[2][5]).toBeTruthy();
  });

  it ('should keep cells alive with two live neighbours', function () {
    world.activate(1, 5);
    world.activate(2, 5);
    world.activate(3, 5);

    var newWorld = world.turn();
    expect(newWorld.grid[2][5]).toBeTruthy();
  });

  it ('should keep cells alive with three live neighbours', function () {
    world.activate(1, 5);
    world.activate(2, 5);
    world.activate(2, 6);
    world.activate(3, 5);

    var newWorld = world.turn();
    expect(newWorld.grid[2][5]).toBeTruthy();
  });

  it ('should kill cells with more than three live neighbours', function () {
    world.activate(1, 5);
    world.activate(2, 5);
    world.activate(2, 6);
    world.activate(3, 5);
    world.activate(3, 6);

    var newWorld = world.turn();
    expect(newWorld.grid[2][5]).toBeFalsy();
  });

  it ('should resurrect dead cells with exactly three live neighbours', function () {
    world.activate(1, 5);
    world.activate(2, 5);
    world.activate(3, 5);

    var newWorld = world.turn();
    expect(newWorld.grid[2][6]).toBeTruthy();
  });
});