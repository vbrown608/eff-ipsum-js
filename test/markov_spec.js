import { model } from '../lib/markov';
import assert from 'assert';

const input = 'A cold blooded jelly donut'

describe('parses training data', () => {
  it('generates triples', () => {
    assert.deepEqual(model(input).triples, [
      ['A', 'cold', 'blooded'],
      ['cold', 'blooded', 'jelly'],
      ['blooded', 'jelly', 'donut'],
    ]);
  });

  it('handles empty input', () => {
    assert.deepEqual(model('').triples, []);
  });
});
