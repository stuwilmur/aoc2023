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

function line2Gears(line) {
  let res = [];
  let re = /\*/g;
  let match;
  while ((match = re.exec(line)) != null) {
    res.push(match.index)
  }
  return res
}

function getAdjacentGears(lineNumber, startIndex, endIndex, gears) {
    if (lineNumber < 0 || lineNumber >= gears.length) {
      return [];
    }
    return gears[lineNumber].filter((x) => x >= startIndex && x <= endIndex)
  }

  function checkGearLine(line, lineNumber, gears, gearMap) {
    let res = 0
    let re = /\d+/g;
    let match;
    while ((match = re.exec(line)) != null) {
        let partNumber = parseInt(match[0]);
        addGearsToMap(partNumber, lineNumber - 1, getAdjacentGears(lineNumber - 1, match.index - 1, match.index + match[0].length, gears), gearMap)
        addGearsToMap(partNumber, lineNumber, getAdjacentGears(lineNumber, match.index - 1, match.index - 1, gears), gearMap)
        addGearsToMap(partNumber, lineNumber, getAdjacentGears(lineNumber, match.index + match[0].length, match.index + match[0].length, gears), gearMap)
        addGearsToMap(partNumber, lineNumber + 1, getAdjacentGears(lineNumber + 1, match.index - 1, match.index + match[0].length, gears), gearMap)
    }
  }

  function addGearsToMap(partNumber, lineNumber, gearPositions, gearMap)
  {
    //console.log(partNumber, lineNumber, gearPositions)
    if (!gearMap.has(lineNumber)) {
      gearMap.set(lineNumber,new Map())
    }
    gearPositions.forEach(pos => {
      if(gearMap.get(lineNumber).has(pos)){
        gearMap.get(lineNumber).get(pos).push(partNumber)
      }
      else {
        gearMap.get(lineNumber).set(pos, [partNumber])
      }
    });
  }

  function gearMap2ListOfPairs(gearMap){
    let list = [];
    gearMap.forEach((subMap,l)=>{
      subMap.forEach((ratios, pos)=>{
        if (ratios.length == 2) {
          list.push(ratios)
        }
      })
    })
    return list;
  }

  function listOfPairsToRatios(list){
    return list.map((d)=>d[0]*d[1])
  }

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let lines = input.split('\n');
  let gears = lines.map(line2Gears)
  let gearMap = new Map();
  lines.map((d,i)=>checkGearLine(d, i, gears, gearMap))
  return listOfPairsToRatios(gearMap2ListOfPairs(gearMap)).reduce((a,b)=>a+b)
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
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  //onlyTests: true,
});
