import mockery from 'mockery';
import assert from 'assert';
import * as _ from 'lodash';

let input = `
 She had blue skin.
 And so did he.
 He kept it hid
 And so did she.
 They searched for blue
 Their whole life through,
 Then passed right by—
 And never knew.
`;

describe('markov model', () => {
  let markov;

  before(() => {
    mockery.enable({warnOnUnregistered: false});
    _.random = () => { return 1; }
    _.sample = (array) => { return array[0]; }
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

  it('generates a lookup table with repeated keys', () => {
    assert.deepEqual(
      markov.model(input).lookup[['so', 'did']],
      ['he.\n', 'she.\n']
    );
  });

  it('generates a lookup table with repeated triples', () => {
    assert.deepEqual(
      markov.model(input).lookup[['And', 'so']],
      ['did', 'did']
    );
  });

  it('survives empty input', () => {
    assert.deepEqual(markov.model('').lookup, {});
  });

  it('generates novel output', () => {
    console.log(markov.model(input).generate());
  });
});
