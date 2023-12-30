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

function initBoxes() {
  let boxes = [];
  for (let boxIndex = 0; boxIndex < 256; boxIndex++) {
    boxes.push(new Map());
  }
  return boxes;
}

function parseRawCommand(rawCommand) {
  const re = /([a-z]+)([=-])(\d?)/gi;
  let [lens, op, power] = re.exec(rawCommand).slice(1);
  return { lens: lens, op: op, power: power };
}

function doCommand(rawCommand, boxes) {
  const command = parseRawCommand(rawCommand);
  const boxIndex = hash(command.lens);
  if (command.op == "-") {
    boxes[boxIndex].delete(command.lens);
  } else {
    boxes[boxIndex].set(command.lens, command.power);
  }
}

function calculateBoxLensPower(box, boxIndex) {
  let total = 0;
  let lensKeys = [...box.keys()];
  lensKeys.forEach((lensKey, lensIndex) => {
    total += (boxIndex + 1) * (lensIndex + 1) * box.get(lensKey);
  });
  return total;
}

const part2 = (rawInput) => {
  const commands = parseInput(rawInput);
  let boxes = initBoxes();
  commands.forEach((command) => {
    doCommand(command, boxes);
  });
  let lensPowers = boxes.map((box, boxIndex) =>
    calculateBoxLensPower(box, boxIndex),
  );
  return lensPowers.reduce((a, b) => a + b);
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
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
