import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const BeamPrototype = {
  toStr() {
    return `${this.x},${this.y},${this.dx},${this.dy}`;
  },
  posStr() {
    return `${this.x},${this.y}`;
  },
};

function Beam(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
}

Object.assign(Beam.prototype, BeamPrototype);

function trace(beam, map, visited, energized) {
  do {
    recordEnergized(beam, energized);
  } while (advance(beam, map, visited, energized));
}

function advance(beam, map, visited, energized) {
  const char = map[beam.y][beam.x];
  if (visited.has(beam.toStr())) {
    return false;
  }

  recordVisited(beam, visited);

  switch (char) {
    case ".":
      passBeam(beam);
      break;
    case "|":
      if (beam.dx == 0) {
        passBeam(beam);
      } else {
        let [up, down] = [
          new Beam(beam.x, beam.y - 1, 0, -1),
          new Beam(beam.x, beam.y + 1, 0, +1),
        ];
        if (checkPos(up, map)) {
          trace(up, map, visited, energized);
        }
        if (checkPos(down, map)) {
          trace(down, map, visited, energized);
        }
        return false;
      }
      break;
    case "-":
      if (beam.dy == 0) {
        passBeam(beam);
      } else {
        let [left, right] = [
          new Beam(beam.x - 1, beam.y, -1, 0),
          new Beam(beam.x + 1, beam.y, 1, 0),
        ];
        if (checkPos(left, map)) {
          trace(left, map, visited, energized);
        }
        if (checkPos(right, map)) {
          trace(right, map, visited, energized);
        }
        return false;
      }
      break;
    case "\\":
      turnBeam(beam, 1);
      passBeam(beam);
      break;
    case "/":
      turnBeam(beam, -1);
      passBeam(beam);
      break;
    default:
      throw "unexpected input";
  }

  return checkPos(beam, map);
}

function checkPos(beam, map) {
  if (
    beam.y >= 0 &&
    beam.y < map.length &&
    beam.x >= 0 &&
    beam.x < map[0].length
  ) {
    return true;
  }
  return false;
}

function passBeam(beam) {
  beam.x += beam.dx;
  beam.y += beam.dy;
}

function turnBeam(beam, dir) {
  if (beam.dy > 0) {
    beam.dx = dir;
    beam.dy = 0;
  } else if (beam.dy < 0) {
    beam.dx = -dir;
    beam.dy = 0;
  } else if (beam.dx > 0) {
    beam.dx = 0;
    beam.dy = dir;
  } else if (beam.dx < 0) {
    beam.dx = 0;
    beam.dy = -dir;
  }
}

function recordVisited(beam, visited) {
  visited.add(beam.toStr());
}

function recordEnergized(beam, energized) {
  energized.add(beam.posStr());
}

function calculateEnergy(map, x, y, dx, dy) {
  let energized = new Set();
  let visited = new Set();
  let beam = new Beam(x, y, dx, dy);
  trace(beam, map, visited, energized);
  return energized.size;
}

const part1 = (rawInput) => {
  const map = parseInput(rawInput);
  return calculateEnergy(map, 0, 0, 1, 0);
};

const part2 = (rawInput) => {
  const map = parseInput(rawInput);
  let max = 0;
  for (let x = 0; x < map[0].length; x++) {
    max = Math.max(max, calculateEnergy(map, x, 0, 0, 1));
    max = Math.max(max, calculateEnergy(map, x, map.length - 1, 0, -1));
  }
  for (let y = 0; y < map.length; y++) {
    max = Math.max(max, calculateEnergy(map, 0, y, 1, 0));
    max = Math.max(max, calculateEnergy(map, map[0].length - 1, y, -1, 0));
  }
  return max;
};

run({
  part1: {
    tests: [
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
