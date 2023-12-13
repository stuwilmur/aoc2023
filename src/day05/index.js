import run from "aocrunner";

const parseInput = (rawInput) => {
  let raw = rawInput.split("\n\n");
  let rawSeeds = raw[0];
  let rawMaps = raw.slice(1);
  let seeds = rawSeeds.match(/\d+/g).map((d) => parseInt(d));
  let maps = rawMaps.map(parseRawMap);
  return [seeds, maps];
};

const splitAndTrimHeader = (lines) => lines.split("\n").slice(1);

const parseRawMap = (raw) => splitAndTrimHeader(raw).map(parseRawMapLine);

const parseRawMapLine = (line) => {
  return Line(...line.match(/\d+/g));
};

const Line = (dest, src, length) => {
  return { dest: parseInt(dest), src: parseInt(src), length: parseInt(length) };
};

function in2out(input, map) {
  let output = input;
  map.every((line) => {
    if (input >= line.src && input < line.src + line.length) {
      output = line.dest + (input - line.src);
      return false;
    } else {
      return true;
    }
  });
  return output;
}

function traceSeed(seed, maps) {
  let token = seed;
  maps.forEach((map) => {
    token = in2out(token, map);
  });
  return token;
}

const part1 = (rawInput) => {
  const [seeds, maps] = parseInput(rawInput);
  let locations = seeds.map((seed) => traceSeed(seed, maps));
  return locations.reduce((a, b) => Math.min(a, b));
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
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
