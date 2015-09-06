import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      expect(
        next(Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 4,
              '28 Days Later': 2
            })
          }),
          entries: List.of('Sunshine', 'Millions', '127 Hours')
        }))
      ).to.equal(
        Map({
          vote: Map({
            pair: List.of('Sunshine', 'Millions')
          }),
          entries: List.of('127 Hours', 'Trainspotting')
        })
      );
    });

    it('puts both from tied vote back to entries', () => {
      expect(
        next(Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 3,
              '28 Days Later': 3
            })
          }),
          entries: List.of('Sunshine', 'Millions', '127 Hours')
        }))
      ).to.equal(
        Map({
          vote: Map({
            pair: List.of('Sunshine', 'Millions')
          }),
          entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
        })
      );
    });

    it('marks winner when just one entry left', () => {
      expect(
        next(Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 4,
              '28 Days Later': 2
            })
          }),
          entries: List()
        }))
      ).to.equal(
        Map({
          winner: 'Trainspotting'
        })
      );
    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      expect(
        vote(Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }), 'Trainspotting')
      ).to.equal(
        Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      );
    });

    it('adds to existing tally for the voted entry', () => {
      expect(
        vote(Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }), 'Trainspotting')
      ).to.equal(
        Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        })
      );
    });

    it('ignores the vote if for an invalid entry', () => {
      expect(
        vote(Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }), 'Sunshine')
      ).to.equal(
        Map({
          pair: List.of('Trainspotting', '28 Days Later')
        })
      );
    });

  });

});
