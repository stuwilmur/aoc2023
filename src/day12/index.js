import run from "aocrunner";
import { count, group } from "console";

Array.prototype.sum = function sum() {
  return this.reduce((a, b) => a + b);
};

const unfoldStr = (str, char) => (str + char).repeat(4) + str;

const parseRecord = (line) => line.match(/[#\?\.]+/)[0];

const parseGroups = (line, unfold = false) => {
  let groupStr = line.match(/[\d,]+/)[0];
  if (unfold) {
    groupStr = unfoldStr(groupStr, ",");
  }
  return groupStr.split(",").map((d) => parseInt(d));
};

const parseInput = (rawInput, unfold = false) => {
  return rawInput.split("\n").map((line) => {
    return {
      record: unfold ? unfoldStr(parseRecord(line), "?") : parseRecord(line),
      groups: parseGroups(line, unfold),
    };
  });
};

function getLut(str, groupIndex, lut) {
  return lut.get(str + groupIndex.toFixed());
}
const setLut = (str, groupIndex, lut, value) => {
  lut.set(str + groupIndex.toFixed());
};

function solve(groups, record, groupIndex, lut) {
  //console.log("@@", groupIndex);

  let cached = getLut(record, groupIndex, lut);
  if (cached != undefined) {
    return cached;
  }

  let startIndex = 0;
  let sum = 0;

  while (startIndex + groups[groupIndex] <= record.length) {
    let valid = true;
    for (let i = 0; i < startIndex; i++) {
      //console.log(startIndex, i);
      if (record[i] == "#") {
        valid = false;
        break;
      }
    }
    for (let i = startIndex; i < startIndex + groups[groupIndex]; i++) {
      //console.log("a", startIndex, i);
      if (record[i] == ".") {
        valid = false;
        break;
      }
    }
    if (groupIndex == groups.length - 1) {
      if (record.slice(startIndex + groups[groupIndex]).includes("#")) {
        valid = false;
      }
    }
    if (record[startIndex + groups[groupIndex]] == "#") {
      //console.log("b", startIndex);
      valid = false;
    }

    if (valid) {
      //console.log(valid, startIndex, groupIndex);
      sum +=
        groupIndex == groups.length - 1
          ? 1
          : solve(
              groups,
              record.slice(startIndex + groups[groupIndex] + 1),
              groupIndex + 1,
              lut,
            );
    }
    startIndex += 1;
  }

  setLut(record, groupIndex, lut, sum);

  return sum;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  console.log(input.map((x) => solve(x.groups, x.record, 0, new Map())));
  return input.map((x) => solve(x.groups, x.record, 0, new Map())).sum();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput, true);
  return input
    .map((x, i) => {
      console.log(i);
      return solve(x.groups, x.record, 0, new Map());
    })
    .sum();
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
      {
        input: "?##?##??#? 7,1",
        expected: 1,
      },
      {
        input: "?#..##?##??###??#? 2,13",
        expected: 1,
      },
      {
        input: "??????#???. 1,7",
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`,
        expected: 525152,
      },
      {
        input: `???????.??? 1,3`,
        expected: null,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
