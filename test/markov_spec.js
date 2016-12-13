import mockery from 'mockery';
import assert from 'assert';
import * as _ from 'lodash';

let input = 'This is a test - a test is what this is. What is this? A test - it is.';

describe('markov model', () => {
  let model;

  before(() => {
    mockery.enable({warnOnUnregistered: false});
    _.random = () => { return 1; }
    _.sample = (array) => { return _.last(array); }
    mockery.registerMock("lodash", _);
    model = require('../lib/markov').default;
  });

  after(() => {
    mockery.disable();
  });

  it('generates triples', () => {
    assert.deepEqual(model("Cold blooded jelly donut").triples, [
      ['Cold', 'blooded', 'jelly'],
      ['blooded', 'jelly', 'donut'],
    ]);
  });

  it('generates a lookup table', () => {
    assert.deepEqual(
      model(input).lookup[['a', 'test']],
      ['-', 'is']
    );
  });

  it('survives empty input', () => {
    assert.deepEqual(model('').lookup, {});
  });

  it('generates novel output', () => {
    assert.equal(model(input).generate(),
      'is a test is what this is. What is this? ' +
      'A test - it is a test is what this is. What is this? A test'
    );
  });
});
