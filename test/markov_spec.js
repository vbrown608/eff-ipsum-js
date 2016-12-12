import { model } from '../lib/markov';
import assert from 'assert';


describe('generating triples', () => {
  let input = "Cold blooded jelly donut"

  it('generates triples from empty input', () => {
    assert.deepEqual(model('').triples, []);
  });

  it('from nonempty input', () => {
    assert.deepEqual(model(input).triples, [
      ['Cold', 'blooded', 'jelly'],
      ['blooded', 'jelly', 'donut'],
    ]);
  });

});


describe('building a lookup table', () => {
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

  it('from empty input', () => {
    assert.deepEqual(model('').lookup, {});
  });

  it('when repeated keys are present', () => {
    assert.deepEqual(
      model(input).lookup[['so', 'did']],
      ['he.\n', 'she.\n']
    );
  });

  it('when repeated triples are present', () => {
    assert.deepEqual(
      model(input).lookup[['And', 'so']],
      ['did', 'did']
    );
  });

});

describe('generating output', () => {
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

  it('generates a new string', () => {
    console.log(model(input).generate());
  });
});
