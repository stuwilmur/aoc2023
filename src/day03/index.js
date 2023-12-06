import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

function line2SymObject(line) {
  let res = [];
  let re = /[^\d.]/g;
  let match;
  while ((match = re.exec(line)) != null) {
    res.push(match.index)
  }
  return res
}

function checkLine(line, lineNumber, symbols) {
  let res = 0
  let re = /\d+/g;
  let match;
  while ((match = re.exec(line)) != null) {
    //console.log("match " + match + " length " + match[0].length + " found at " + match.index);
    if (
      isSymbol(lineNumber - 1, match.index - 1, match.index + match[0].length, symbols) ||
      isSymbol(lineNumber, match.index - 1, match.index - 1, symbols) ||
      isSymbol(lineNumber, match.index + match[0].length, match.index + match[0].length, symbols) ||
      isSymbol(lineNumber + 1, match.index - 1, match.index + match[0].length, symbols)) {
      res += parseInt(match)
    }
  }
  return res
}

function isSymbol(lineNumber, startIndex, endIndex, symbols) {
//console.log(lineNumber,startIndex,endIndex)
  if (lineNumber < 0 || lineNumber >= symbols.length) {
    return false;
  }
  return symbols[lineNumber].find((x) => x >= startIndex && x <= endIndex) != undefined
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let lines = input.split('\n');
  let symbols = lines.map(line2SymObject)
  return lines.map((line,lineNumber)=>checkLine(line,lineNumber,symbols)).reduce((a,b)=>a+b)
};

const part2 = () => {
  //const input = parseInput(rawInput);

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
