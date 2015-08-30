import {List} from 'immutable';
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

  describe('Lists', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('are immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });

  });

});
