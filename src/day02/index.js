import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

function checkGameString(str){
	
  let re = /(Game \d+:)(.*)/gm;
  let matches = str.matchAll(re);
  let a, gameId,game;
  [a,gameId,game] = matches.next().value;
  let gameNumber = parseInt(gameId.match(/\d+/));
  
  return checkGame(game) ? gameNumber : 0;
}

function checkGame(game) {
	return !game.split(";").map(checkRound).includes(false);
}

function checkRound(round) {
	return !round.split(',').map(checkDice).includes(false)
}

function checkDice(dice) {
	let number = parseInt(dice.match(/\d+/gi))
	let colour = dice.match(/[a-z]+/gi)
  return checkNumberColour(number,colour);
}

function checkNumberColour(number,colour){
  const limits = {red:12,green:13,blue:14};
	return number <= limits[colour];
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.split('\n').map(checkGameString).reduce((a,b)=>a+b)
};

function getPower(game)
{
	return getMaxDice("red",game) * getMaxDice("green",game) * getMaxDice("blue",game);
}

function getMaxDice(colour,game)
{
  let re = new RegExp('\\d+\\s*'+colour,"gi")
  let t = [...game.matchAll(re)].join('')
  let u = [...t.matchAll('\\d+')]
  let v = u.map(d=>parseInt(d[0]))
  let w = Math.max(...v)
  return w;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.split('\n').map(getPower).reduce((a,b)=>a+b);
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
