import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let f = parseInt;
  let t = input.split('\n').map((d) => d.match(/\d/g))
  let u = t.map((d) => [f(d[0]), f(d[d.length - 1])])
  let v = u.map(d => d.reduce((a, b) => 10 * a + b))
  let w = v.reduce((a, b) => a + b)
  return w;
};

function match(str) {
  let re = /\d|one|two|three|four|five|six|seven|eight|nine/gi
  let m, res = [];
  while (m = re.exec(str)) {
    res.push(m[0]);
    re.lastIndex = m.index + 1;
  }
  return res;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let n = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  }
  let f = (d) => isNaN(parseInt(d)) ? n[d] : parseInt(d);
  let t = input.split('\n').map(match)
  let u = t.map((d) => [f(d[0])*10, f(d[d.length - 1])])
  let sum = (a, b) => a + b
  let v = u.map(d => d.reduce(sum))
  let w = v.reduce(sum)
  return w;

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
