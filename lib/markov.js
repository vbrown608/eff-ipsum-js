import { forEach, random, sample, isUndefined } from 'lodash';

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

  function generate(size = 25, w0, w1) {
    if (size == 0) {
      return w0 || '';
    } else if (isUndefined(w0) || isUndefined(w1)) {
      let r = random(wordList.length - 3);
      return generate(size, wordList[r], wordList[r+1]);
    } else {
      let w2 = sample(lookup[[w0, w1]]);
      return w0 + ' ' + generate(size-1, w1, w2);
    }
  }

  return {
    triples,
    lookup,
    generate
  };
}
