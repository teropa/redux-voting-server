import {expect} from 'chai';

describe('immutability', () => {

  describe('numbers', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('are immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

});
