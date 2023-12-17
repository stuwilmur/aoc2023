import run from "aocrunner";
import { count } from "console";

Array.prototype.sum = function sum() {
  return this.reduce((a, b) => a + b);
};

Array.prototype.countTrue = function countTrue() {
  return this.filter((x) => x == true).length;
};

const unfold = (str, char) => (str + char).repeat(4) + str;

const parseRecord = (line) => line.match(/[#\?\.]+/)[0];

const parseGroups = (line) => {
  let groupStr = line.match(/[\d,]+/)[0];
  return groupStr.split(",").map((d) => parseInt(d));
};

const parseInput = (rawInput) => {
  return rawInput.split("\n").map((line) => {
    return {
      record: parseRecord(line),
      groups: parseGroups(line),
    };
  });
};

function pigeonHole(pigeons, holes, first = false) {
  let minPigeons = first ? 0 : 1;
  let maxPigeons = pigeons - holes + 2;
  if (holes == 1) {
    return [[pigeons]];
  }
  let list = [];
  for (
    let pigeonsThisHole = minPigeons;
    pigeonsThisHole <= maxPigeons;
    pigeonsThisHole++
  ) {
    let arrangements = pigeonHole(pigeons - pigeonsThisHole, holes - 1);
    arrangements.forEach((arrangement) => {
      arrangement.unshift(pigeonsThisHole);
    });
    list = list.concat(arrangements);
  }
  return list;
}

const sum = (arr) => arr.reduce((a, b) => a + b);

const listGapArrangements = (recordString, groups) =>
  pigeonHole(recordString.length - sum(groups), groups.length + 1, true);

const validGaps = (str) => str.match(/#/) == null;
const validSprings = (str) => str.match(/\./) == null;

function validArrangement(record, springs, gaps) {
  let index = 0;
  let valid = true;
  gaps.every((gap, i) => {
    let substring = record.slice(index, index + gap);
    if (!validGaps(substring)) {
      valid = false;
      return false;
    }
    index += gap;
    if (i < springs.length) {
      let spring = springs[i];
      substring = record.slice(index, index + spring);
      if (!validSprings(substring)) {
        valid = false;
        return false;
      }
      index += spring;
    }
    return true;
  });
  return valid;
}

function countArrangements(l) {
  let numGaps = l.length - l.groups.sum();
  let gapArrangements = listGapArrangements(l.record, l.groups);
  let validationList = gapArrangements.map((arrangement) =>
    validArrangement(l.record, l.groups, arrangement),
  );
  return validationList.countTrue();
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.map((x) => countArrangements(x)).sum();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 21,
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
