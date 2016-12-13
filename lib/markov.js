import { forEach, random, sample, isUndefined } from 'lodash';

export default function model(input) {
  const wordList = input.split(' ');

  /**
   * Generate triples from the given data string.
   * So if our string were "Cold blooded jelly donut",
   * we'd generate [Cold, blooded, jelly] and then [blooded, jelly, donut].
   */
  let triples = [];
  for (let i = 0; i < wordList.length - 2; i++) {
    triples.push([wordList[i], wordList[i+1], wordList[i+2]]);
  }

  /**
   * Build a lookup table.
   * key: a pair of words that appears in the input
   * value: an array of words that can immediately follow that pair
   */
  let lookup = {};
  forEach(triples, function(triple) {
    let key = [triple[0], triple[1]];
    if (typeof lookup[key] !== 'undefined') {
      lookup[key].push(triple[2]);
    } else {
      lookup[key] = [triple[2]];
    }
  });

  // Generate lorem ipsum based on the model.
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
