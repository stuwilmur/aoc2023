import run from "aocrunner";
import { count, table } from "console";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return countPoints(input.map(parseLine));
};

const reLine = (line) => [...line.matchAll(/(Card\s*\d+)(.*\|)(.*)/gi)];

const parseNumbers = (str) => str.match(/\d+/gi).map((d) => parseInt(d));

const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));

function parseLine(line) {
  const matches = reLine(line)[0];
  const cardNumber = parseInt(matches[1].match(/\d+/));
  const winning = new Set(parseNumbers(matches[2]));
  const have = new Set(parseNumbers(matches[3]));
  const winners = intersection(winning, have).size;
  const points = winners > 0 ? 2 ** (winners - 1) : 0;
  return {
    cardNumber: cardNumber,
    points: points,
    winners: winners,
    copies: 1,
  };
}

const countPoints = (results) =>
  results.map((x) => x.points).reduce((a, b) => a + b);

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let table = input.map(parseLine);
  const cardNumbers = table.map((x) => x.cardNumber);
  cardNumbers.forEach((cardNumber) => {
    table = processCard(cardNumber, table);
  });
  //console.log(table);
  //console.log(countCopies(table));
  return countCopies(table);
};

const countCopies = (list) => list.map((x) => x.copies).reduce((a, b) => a + b);

const getCard = (table, id) => table.find((x) => x.cardNumber == id);

function processCard(thisCardNumber, table) {
  let dup = table.slice();
  const thisCard = getCard(dup, thisCardNumber);
  for (
    let cardNumber = thisCardNumber + 1;
    cardNumber < thisCardNumber + thisCard.winners + 1;
    cardNumber++
  ) {
    const card = getCard(dup, cardNumber);
    if (card != undefined) {
      card.copies += thisCard.copies;
    }
  }
  return dup;
}

run({
  part1: {
    tests: [
      {
        input: `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
