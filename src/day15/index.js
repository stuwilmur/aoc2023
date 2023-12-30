import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",");

function hash(str) {
  let val = 0;
  for (let charIndex = 0; charIndex < str.length; charIndex++) {
    val += str.charCodeAt(charIndex);
    val *= 17;
    val %= 256;
  }
  return val;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const hashed = input.map((str) => hash(str));
  return hashed.reduce((a, b) => a + b);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
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
