import { filter, each } from 'lodash';

export function model(input) {

  const wordList = input.split(' ');

  // Generates triples from the given data string.
  // So if our string were "What a lovely day",
  // we'd generate (What, a, lovely) and then (a, lovely, day).
  let triples = [];
  for (let i = 0; i < wordList.length - 2; i++) {
    triples.push([wordList[i], wordList[i+1], wordList[i+2]])
  }

  function generate() {}

  return {
    triples,
    generate
  };
}
