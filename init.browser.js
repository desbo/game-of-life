(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var createWorld, getNeighbours, World;

createWorld = function (height, width) {
  var grid = [];

  for (var x = 0; x < width; x++) {
    grid[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = false;
    }
  }

  return new World(grid);
};

getNeighbours = function (grid, x, y) {
  var neighbours = [], coords = {
    NW: { x: x - 1, y: y - 1 },
    N: { x: x, y: y - 1},
    NE: { x: x + 1, y: y - 1 },
    W: { x: x - 1, y: y },
    E: { x: x + 1, y: y },
    SW: { x: x - 1, y: y + 1 },
    S: { x: x, y: y + 1},
    SE: { x: x + 1, y: y + 1 },
  };

  return Object.keys(coords).map(function (key) {
    var coord = coords[key];

    if (grid[coord.x] && grid[coord.x][coord.y]) {
      return grid[coord.x][coord.y];
    }
  });
};

World = function (grid) {
  this.grid = grid;
};

World.prototype.mapCells = function (f) {
  return this.grid.map(function (column, x, grid) {
    return column.map(function (cell, y) {
      return f(cell, x, y, grid);
    });
  });
};

World.prototype.activate = function (x, y) {
  this.grid[x][y] = true;
  return this;
};

World.prototype.seed = function (percentage) {
  this.grid = this.mapCells(function () {
    if (Math.floor(Math.random() * 100) <= percentage) {
      return true;
    }
    return false;
  });
  return this;
};

World.prototype.turn = function () {
  return new World(this.mapCells(function (cell, x, y, grid) {
    var liveNeighbours = getNeighbours(grid, x, y).filter(function (neighbour) {
      return neighbour === true;
    });

    if (grid[x][y] && liveNeighbours.length < 2) return false;
    if (grid[x][y] && liveNeighbours.length <= 3) return true;
    if (liveNeighbours.length === 3) return true;
    return false;
  }));
};

World.prototype.toString = function () {
  return this.grid.map(function (column) {
    return column.map(function (cell) {
      return cell ? '&#x25cf;' : ' ';
    }).join('');
  }).join('\n');
};

module.exports = {
  createWorld: createWorld,
  World: World
};
},{}],2:[function(require,module,exports){
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
},{"./game.js":1}]},{},[2]);
