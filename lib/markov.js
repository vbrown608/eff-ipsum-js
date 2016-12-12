import { forEach } from 'lodash';

export function model(input) {

  const wordList = input.split(' ');

  // Generates triples from the given data string.
  // So if our string were "What a lovely day",
  // we'd generate (What, a, lovely) and then (a, lovely, day).
  let triples = [];
  for (let i = 0; i < wordList.length - 2; i++) {
    triples.push([wordList[i], wordList[i+1], wordList[i+2]])
  }

  let lookup = {};
  forEach(triples, function(triple) {
    let key = [triple[0], triple[1]];
    if (typeof lookup[key] !== 'undefined') {
      lookup[key].push(triple[2]);
    } else {
      lookup[key] = [triple[2]]
    }
  });

  function generate() {}

  return {
    triples,
    lookup,
    generate
  };
}
