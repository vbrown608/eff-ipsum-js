import { forEach, random, sample } from 'lodash';

export function model(input) {

  const wordList = input.split(' ');

  // Generates triples from the given data string.
  // So if our string were "What a lovely day",
  // we'd generate (What, a, lovely) and then (a, lovely, day).
  let triples = [];
  for (let i = 0; i < wordList.length - 2; i++) {
    triples.push([wordList[i], wordList[i+1], wordList[i+2]]);
  }

  let lookup = {};
  forEach(triples, function(triple) {
    let key = [triple[0], triple[1]];
    if (typeof lookup[key] !== 'undefined') {
      lookup[key].push(triple[2]);
    } else {
      lookup[key] = [triple[2]];
    }
  });

  function generate(size = 25) {
    let result = [],
        r = random(wordList.length - 3),
        w0 = wordList[r],
        w1 = wordList[r+1];
    for (let i = 0; i <= size; i++) {
      result.push(w0);
      let choices = lookup[[w0, w1]];
      w0 = w1;
      w1 = sample(choices);
    }
    return result.join(' ');
  }

  return {
    triples,
    lookup,
    generate
  };
}
