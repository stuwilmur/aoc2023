import run from "aocrunner";

const parseInput = (rawInput) => {
  const lines = rawInput.split("\n");
  const directions = lines[0];
  let leftMap = new Map();
  let rightMap = new Map();
  lines.slice(2).forEach((line) => {
    const nodes = line.match(/[A-Z]{3}/g);
    leftMap.set(nodes[0], nodes[1]);
    rightMap.set(nodes[0], nodes[2]);
  });
  return { directions: directions, L: leftMap, R: rightMap };
};

function navigate(map, node, isEnd) {
  let directionIndex = 0;
  let steps = 0;
  while (!isEnd(node)) {
    node = next(node, map, directionIndex);
    directionIndex += 1;
    steps += 1;
    directionIndex %= map.directions.length;
  }
  return steps;
}

const endFn1 = (e) => e == "ZZZ";

const next = (node, map, directionIndex) => {
  return map[map.directions[directionIndex]].get(node);
};

const part1 = (rawInput) => {
  return navigate(parseInput(rawInput), "AAA", endFn1);
};

const endFn2 = (e) => e.slice(-1)[0] == "Z";

const part2 = (rawInput) => {
  const map = parseInput(rawInput);
  const startingNodes = [...map.L.keys()].filter(
    (node) => node.slice(-1)[0] == "A",
  );
  const steps = startingNodes.map((node) => navigate(map, node, endFn2));
  const gcd = (a, b) => (a ? gcd(b % a, a) : b);
  const lcm = (a, b) => (a * b) / gcd(a, b);
  return steps.reduce(lcm);
};

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],

    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

AAA = (AAB, XXX)
AAB = (XXX, AAZ)
AAZ = (AAB, XXX)
BBA = (BBB, XXX)
BBB = (BBC, BBC)
BBC = (BBZ, BBZ)
BBZ = (BBB, BBB)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
