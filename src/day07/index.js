import run from "aocrunner";

function parseLine(line) {
  let hand = line.match(/[AKQJT2-9]{5}/)[0].split("");
  let bid = line.match(/\s\d+/)[0];
  return { hand: hand, bid: parseInt(bid) };
}

const parseInput = (rawInput) => rawInput.split("\n").map(parseLine);

const count = (a, x) => a.filter((e) => e == x).length;

function compareHands(a, b) {
  if (type(a) > type(b)) {
    return 1;
  } else if (type(a) < type(b)) {
    return -1;
  } else {
    return tiebreakHands(a, b);
  }
}

function tiebreakHands(a, b) {
  let res = 0;
  a.every((e, i) => {
    if (value(e) > value(b[i])) {
      res = 1;
      return false;
    } else if (value(e) < value(b[i])) {
      res = -1;
      return false;
    }
    return true;
  });
  return res;
}

function value(char) {
  if (isNaN(parseInt(char))) {
    return values[char];
  } else {
    return parseInt(char);
  }
}

const values = { A: 14, K: 13, Q: 12, J: 11, T: 10 };

function type(hand) {
  const s = new Set(hand);
  const labels = [...s.keys()];

  if (s.size == 1) {
    return 7;
  }
  if (s.size == 2) {
    if (count(hand, labels[0]) == 4 || count(hand, labels[1]) == 4) {
      return 6;
    } else {
      return 5;
    }
  }
  if (s.size == 3) {
    if (
      count(hand, labels[0]) == 3 ||
      count(hand, labels[1]) == 3 ||
      count(hand, labels[2]) == 3
    ) {
      return 4;
    } else {
      return 3;
    }
  }
  if (s.size == 4) {
    return 2;
  }
  if (s.size == 5) {
    return 1;
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const sorted = input.sort((a, b) => compareHands(a.hand, b.hand));
  const points = sorted.map((x, i) => x.bid * (i + 1));
  const res = points.reduce((a, b) => a + b);
  return res;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return;
};

run({
  part1: {
    tests: [
      {
        input: `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
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
