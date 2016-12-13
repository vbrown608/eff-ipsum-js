import mockery from 'mockery';
import assert from 'assert';
import * as _ from 'lodash';

let input = 'This is a test - a test is what this is. What is this? A test - it is.';

describe('markov model', () => {
  let markov;

  before(() => {
    mockery.enable({warnOnUnregistered: false});
    _.random = () => { return 1; }
    _.sample = (array) => { return _.last(array); }
    mockery.registerMock("lodash", _);
    markov = require('../lib/markov');
  });

  after(() => {
    mockery.disable();
  });

  it('generates triples', () => {
    assert.deepEqual(markov.model("Cold blooded jelly donut").triples, [
      ['Cold', 'blooded', 'jelly'],
      ['blooded', 'jelly', 'donut'],
    ]);
  });

  it('generates a lookup table', () => {
    assert.deepEqual(
      markov.model(input).lookup[['a', 'test']],
      ['-', 'is']
    );
  });

  it('survives empty input', () => {
    assert.deepEqual(markov.model('').lookup, {});
  });

  it('generates novel output', () => {
    assert.equal(markov.model(input).generate(),
      'is a test is what this is. What is this? ' +
      'A test - it is a test is what this is. What is this? A test'
    );
  });
});
